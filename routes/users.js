const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await User.find({});
        return res.status(200).send(result);
    } catch (error) {
        res.send(error?.message);
    }
});

router.get('/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const result = await User.findOne({ email: email });
        return res.status(200).send(result);
    } catch (error) {
        res.send(error?.message);
    }
});

router.post('/', async (req, res) => {
    const userInfo = req.body;

    try {
        const newUser = new User(userInfo);

        const result = await newUser.save();
        return res.status(201).send(result);
    } catch (error) {
        if(error.code === 11000) {
            return res.status(409).send({ message: 'Email already exists' });
        }

        return res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;