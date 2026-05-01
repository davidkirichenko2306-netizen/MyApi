const FuelingLog = require("../model/fuelingLog");
const User = require("../model/user");


// =========================
// ⛽ CREATE FUELING LOG
// =========================
module.exports.createFuelingLog = async (req, res) => {
    try {

        const firebaseUid = req.user.uid;

        const {
            placeName,
            pricePerLiter,
            lat,
            lng,
            date,
            fuelType,
            img
        } = req.body;

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
        return res.status(500).json({
            message: err.message
        });
    }
};


// =========================
// 📜 GET USER FUELING LOGS
// =========================
module.exports.getFuelingLogsByUser = async (req, res) => {
    try {

        const firebaseUid = req.user.uid;

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
        return res.status(500).json({
            message: err.message
        });
    }
};


// =========================
// 🗑 DELETE FUELING LOG (SAFE)
// =========================
module.exports.deleteFuelingLog = async (req, res) => {
    try {

        const firebaseUid = req.user.uid;
        const { logId } = req.body;

        if (!logId) {
            return res.status(400).json({
                message: "logId is required"
            });
        }

        const user = await User.findOne({ firebaseUid });

        const deletedLog = await FuelingLog.findOneAndDelete({
            _id: logId,
            user_ref: user._id
        });

        if (!deletedLog) {
            return res.status(404).json({
                message: "Fueling log not found or not owned by user"
            });
        }

        return res.status(200).json({
            message: "Fueling log deleted successfully"
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};
// =========================
// ✏️ UPDATE FUELING LOG
// =========================
module.exports.updateFuelingLog = async (req, res) => {
    try {

        const firebaseUid = req.user.uid;
        const { logId } = req.params;

        const {
            placeName,
            pricePerLiter,
            lat,
            lng,
            date,
            fuelType,
            img
        } = req.body;

        // מציאת המשתמש לפי Firebase UID
        const user = await User.findOne({ firebaseUid });

        if (!user) {
            return res.status(404).json({
                message: "User does not exist"
            });
        }

        // בדיקה שהלוג שייך למשתמש
        const existingLog = await FuelingLog.findOne({
            _id: logId,
            user_ref: user._id
        });

        if (!existingLog) {
            return res.status(404).json({
                message: "Fueling log not found or not owned by user"
            });
        }

        // עדכון שדות (רק מה שנשלח בפועל)
        existingLog.placeName = placeName ?? existingLog.placeName;
        existingLog.pricePerLiter = pricePerLiter ?? existingLog.pricePerLiter;
        existingLog.lat = lat ?? existingLog.lat;
        existingLog.lng = lng ?? existingLog.lng;
        existingLog.date = date ?? existingLog.date;
        existingLog.fuelType = fuelType ?? existingLog.fuelType;
        existingLog.img = img ?? existingLog.img;

        await existingLog.save();

        return res.status(200).json(existingLog);

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};