const FuelingLog = require("../model/fuelingLog");
const User = require("../model/user");


// =========================
// ⛽ CREATE LOG
// =========================
module.exports.createFuelingLog = async (req, res) => {
    try {

        const firebaseUid = req.user.uid;

        const user = await User.findOne({ firebaseUid });

        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const log = new FuelingLog({
            user_ref: user._id,
            ...req.body
        });

        await log.save();

        return res.status(201).json(log);

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


// =========================
// 📜 GET USER LOGS
// =========================
module.exports.getFuelingLogsByUser = async (req, res) => {
    try {

        const firebaseUid = req.user.uid;

        const user = await User.findOne({ firebaseUid });

        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const logs = await FuelingLog.find({ user_ref: user._id })
            .sort({ date: -1 });

        return res.status(200).json(logs);

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


// =========================
// 🗑 DELETE LOG
// =========================
module.exports.deleteFuelingLog = async (req, res) => {
    try {

        const firebaseUid = req.user.uid;
        const { logId } = req.params;

        const user = await User.findOne({ firebaseUid });

        const deleted = await FuelingLog.findOneAndDelete({
            _id: logId,
            user_ref: user._id
        });

        if (!deleted) {
            return res.status(404).json({ message: "Not found or not owned" });
        }

        return res.status(200).json({ message: "Deleted successfully" });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


// =========================
// ✏️ UPDATE LOG
// =========================
module.exports.updateFuelingLog = async (req, res) => {
    try {

        const firebaseUid = req.user.uid;
        const { logId } = req.params;

        const user = await User.findOne({ firebaseUid });

        const log = await FuelingLog.findOne({
            _id: logId,
            user_ref: user._id
        });

        if (!log) {
            return res.status(404).json({ message: "Not found or not owned" });
        }

        Object.assign(log, req.body);

        await log.save();

        return res.status(200).json(log);

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


// =========================
// 🏆 CHEAPEST PER USER
// =========================
module.exports.getCheapestFuelingPerUser = async (req, res) => {
    try {

        const result = await FuelingLog.aggregate([
            { $sort: { pricePerLiter: 1 } },
            {
                $group: {
                    _id: "$user_ref",
                    cheapestLog: { $first: "$$ROOT" }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },
            {
                $project: {
                    _id: 0,
                    userName: "$user.userName",
                    cheapestFuelingLog: "$cheapestLog"
                }
            }
        ]);

        return res.status(200).json(result);

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


// =========================
// 🌍 PUBLIC: latest cheapest
// =========================
module.exports.getLatestCheapestFueling = async (req, res) => {
    try {

        const result = await FuelingLog.aggregate([
            { $sort: { date: -1 } },
            { $limit: 5 },
            { $sort: { pricePerLiter: 1 } },
            { $limit: 1 }
        ]);

        return res.status(200).json(result[0] || null);

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};