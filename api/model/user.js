const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    firebaseUid: {
        type: String,
        required: true,
        unique: true
    },

    userName: {
        type: String,
        default: ""
    },

    email: {
        type: String,
        default: ""
    },

    phoneNumber: {
        type: String,
        default: ""
    },

    img: {
        type: String,
        default: ""
    },

    isGuest: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", userSchema);