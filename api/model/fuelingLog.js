const mongoose = require("mongoose");

const fuelingLogSchema = new mongoose.Schema({

    user_ref: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    placeName: {
        type: String,
        required: true,
        trim: true
    },

    pricePerLiter: {
        type: Number,
        required: true
    },

    lat: {
        type: Number,
        required: true
    },

    lng: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    fuelType: {
        type: String,
        required: true,
        enum: ["95", "98", "סולר", "חשמלי"]
    },

    img: {
        type: String
    }

}, { timestamps: true });

module.exports = mongoose.model("FuelingLog", fuelingLogSchema);
