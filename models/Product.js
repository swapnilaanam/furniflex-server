const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productDesc: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    discountPrice: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: String,
        required: true
    }
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);