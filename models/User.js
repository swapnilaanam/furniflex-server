const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    loginType: {
        type: String,
        required: true
    }
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);