const User = require("../model/user");


// =========================
// 🔐 SYNC USER (create / update)
// =========================
module.exports.syncUser = async (req, res) => {
    try {
        const { uid, email } = req.user;
        const { userName, phoneNumber, img } = req.body;

        let user = await User.findOne({ firebaseUid: uid });

        // יצירה אם לא קיים
        if (!user) {
            user = new User({
                firebaseUid: uid,
                email: email || "",
                userName: userName || "",
                phoneNumber: phoneNumber || "",
                img: img || "",
                isGuest: false
            });

            await user.save();
            return res.status(201).json(user);
        }

        // עדכון אם קיים
        user.userName = userName || user.userName;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.img = img || user.img;

        await user.save();

        return res.status(200).json(user);

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


// =========================
// 👤 GET CURRENT USER
// =========================
module.exports.getMe = async (req, res) => {
    try {
        const { uid } = req.user;

        const user = await User.findOne({ firebaseUid: uid });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json(user);

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};