// controllers/fuelingLogController.js
const FuelingLog = require("../model/fuelingLog");
const userController = require("./userController");

module.exports = {

    // Create fueling log for user
    createFuelingLog: async (req, res) => {
        try {
            const {
                firebase_uid,
                placeName,
                pricePerLiter,
                lat,
                lng,
                date,
                fuelType,
                img
            } = req.body;

            if (!firebase_uid) {
                return res.status(400).json({ message: "firebase_uid is required" });
            }

            // get or create user
            const user = await userController.getOrCreateUser(firebase_uid);

            const fuelingLog = new FuelingLog({
                user_ref: user._id,
                placeName,
                pricePerLiter,
                lat,
                lng,
                date,
                fuelType,
                img
            });

            await fuelingLog.save();

            res.status(201).json(fuelingLog);

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
        // Get fueling logs history for user
    getFuelingLogsByUser: async (req, res) => {
        try {
            const { firebase_uid } = req.params;

            if (!firebase_uid) {
                return res.status(400).json({ message: "firebase_uid is required" });
            }

            const user = await userController.getOrCreateUser(firebase_uid);

            const logs = await FuelingLog.find({ user_ref: user._id })
                .sort({ date: -1 }); // מהחדש לישן

            res.json(logs);

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

};

