const User = require("../model/user");

// יצירה או סנכרון משתמש (Firebase → MongoDB)
module.exports.getOrCreateUser = async (req, res) => {
    try {
        const { firebaseUid } = req.params;
        const { email, userName, phoneNumber, isGuest } = req.body;

        if (!firebaseUid) {
            return res.status(400).json({
                message: "firebaseUid is required"
            });
        }

        let user = await User.findOne({ firebaseUid });

        // אם לא קיים → יצירה
        if (!user) {
            user = new User({
                firebaseUid,
                email: email || "",
                userName: userName || "",
                phoneNumber: phoneNumber || "",
                isGuest: isGuest || false
            });

            await user.save();

            return res.status(201).json(user);
        }

        // אם קיים → עדכון (sync קל מהלקוח)
        user.email = email || user.email;
        user.userName = userName || user.userName;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.isGuest = isGuest ?? user.isGuest;

        await user.save();

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};
module.exports.getOrCreateUserFromBody = async (req, res) => {
    try {
        const { id, email, userName, phoneNumber } = req.body;

        if (!id) {
            return res.status(400).json({ message: "id is required" });
        }

        let user = await User.findOne({ firebaseUid: id });

        // אם לא קיים → יצירה
        if (!user) {
            user = new User({
                firebaseUid: id,
                email: email || "",
                userName: userName || "",
                phoneNumber: phoneNumber || ""
            });

            await user.save();
            return res.status(201).json(user);
        }

        // אם קיים → עדכון
        user.email = email || user.email;
        user.userName = userName || user.userName;
        user.phoneNumber = phoneNumber || user.phoneNumber;

        await user.save();

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};