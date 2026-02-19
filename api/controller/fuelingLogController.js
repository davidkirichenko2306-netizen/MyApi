const FuelingLog = require("../model/fuelingLog");
const User = require("../model/user");

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

         
            const user = await User.findOne({ firebaseUid });

            if (!user) {
                return res.status(404).json({
                    message: "User does not exist"
                });
            }

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

            return res.status(201).json(fuelingLog);

        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },


    // היסטוריית תדלוקים
    getFuelingLogsByUser: async (req, res) => {
        try {

            const { firebaseUid } = req.params;

            if (!firebaseUid) {
                return res.status(400).json({ message: "firebaseUid is required" });
            }

            // ❌ לא יוצרים משתמש
            const user = await User.findOne({ firebaseUid });

            if (!user) {
                return res.status(404).json({
                    message: "User does not exist"
                });
            }

            const logs = await FuelingLog.find({ user_ref: user._id })
                .sort({ date: -1 });

            return res.status(200).json(logs);

        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

};
