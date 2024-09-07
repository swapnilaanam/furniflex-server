const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await Product.find({});
        return res.status(200).send(result);
    } catch (error) {
        res.send(error?.message);
    }
});

module.exports = router;