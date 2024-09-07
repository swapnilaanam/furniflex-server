const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

router.get('/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const result = await Cart.findOne({ userEmail: email });
        return res.status(200).send(result);
    } catch (error) {
        console.log(error?.message);
    }
});

router.get('/:email/count', async (req, res) => {
    const {email} = req.params;

    try {
        const result = await Cart.findOne({userEmail: email});
        return res.status(200).send(result);
    } catch (error) {
        console.log(error?.message);
    }
});

router.post('/:email', async (req, res) => {
    const { email } = req.params;
    const cartInfo = req.body;

    try {
        const result = await Cart.findOne({ userEmail: email });

        if (result === null) {
            const newCart = new Cart({ userEmail: email, cartItems: [{ ...cartInfo, quantity: 1 }] });

            const result1 = await newCart.save();
            return res.status(200).send(result1);
        }
        else {
            const isItemExist = result.cartItems.find((cartItem) => cartItem.productId === cartInfo.productId);

            if (isItemExist) {
                const updatedCartItems = result.cartItems.map((cartItem) => {
                    if (cartItem.productId === cartInfo.productId) {
                        return { ...cartItem, quantity: cartItem.quantity + 1 }
                    }

                    return cartItem;
                });

                const updateDoc = {
                    $set: {
                        cartItems: updatedCartItems
                    }
                };

                const result2 = await Cart.findByIdAndUpdate(result._id, updateDoc);
                return res.status(200).send(result2);
            }
            else {
                // if (result.cartItems.length !== 0) {
                //     if (result.cartItems[0].restaurantId !== cartInfo.restaurantId) {
                //         let updatedCartItems = [{ ...cartInfo, quantity: 1 }];

                //         const updateDoc = {
                //             $set: {
                //                 cartItems: updatedCartItems
                //             }
                //         };

                //         const result3 = await Cart.findByIdAndUpdate(result._id, updateDoc);
                //         return res.status(200).send(result3);
                //     }
                // }

                let updatedCartItems = [...result.cartItems, { ...cartInfo, quantity: 1 }];

                const updateDoc = {
                    $set: {
                        cartItems: updatedCartItems
                    }
                };

                const result3 = await Cart.findByIdAndUpdate(result._id, updateDoc);
                return res.status(200).send(result3);
            }
        }
    } catch (error) {
        console.log(error?.message);
    }
});

router.patch('/:userEmail', async (req, res) => {
    const { userEmail } = req.params;
    const { actionType, productId } = req.body;

    try {
        const cart = await Cart.findOne({ userEmail: userEmail });

        let updatedCartItems;

        if (actionType === 'All') {
            updatedCartItems = cart.cartItems.filter((cartItem) => cartItem.productId !== productId);
        }
        else {
            updatedCartItems = cart.cartItems.map((cartItem) => {
                if (cartItem.productId === productId) {
                    if (actionType === 'Plus') {
                        return { ...cartItem, quantity: cartItem.quantity + 1 }
                    }
                    else {
                        return { ...cartItem, quantity: cartItem.quantity - 1 }
                    }
                }
                return cartItem;
            });
        }

        const updateDoc = {
            $set: {
                cartItems: updatedCartItems
            }
        };

        const result = await Cart.findByIdAndUpdate(cart._id, updateDoc);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error?.message);
    }
})

module.exports = router;