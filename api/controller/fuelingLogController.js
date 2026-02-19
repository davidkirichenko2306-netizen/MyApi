const FuelingLog = require("../model/fuelingLog");
const userController = require("./userController");

module.exports = {

    // יצירת תדלוק
    createFuelingLog: async (req, res) => {
        try {

            const {
                firebaseUid,
                placeName,
                pricePerLiter,
                lat,
                lng,
                date,
                fuelType,
                img
            } = req.body;

            if (!firebaseUid) {
                return res.status(400).json({ message: "firebaseUid is required" });
            }

            const user = await userController.getOrCreateUser(firebaseUid);

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


    // היסטוריית תדלוקים
    getFuelingLogsByUser: async (req, res) => {
        try {

            const { firebaseUid } = req.params;

            if (!firebaseUid) {
                return res.status(400).json({ message: "firebaseUid is required" });
            }

            const user = await userController.getOrCreateUser(firebaseUid);

            const logs = await FuelingLog.find({ user_ref: user._id })
                .sort({ date: -1 });

            res.json(logs);

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

};
