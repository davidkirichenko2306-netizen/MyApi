const User = require("../model/user");

module.exports = {

    getOrCreateUser: async (req, res) => {

        try {
            const { firebaseUid } = req.params; // או req.body תלוי איך אתה שולח

            if (!firebaseUid) {
                return res.status(400).json({
                    message: "firebaseUid is required"
                });
            }

            // בדיקה אם המשתמש כבר קיים
            let user = await User.findOne({ firebaseUid });

            // אם לא קיים – יוצרים
            if (!user) {
                user = new User({ firebaseUid });
                await user.save();
            }

            return res.status(200).json(user);

        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error: error.message
            });
        }
    }

};
