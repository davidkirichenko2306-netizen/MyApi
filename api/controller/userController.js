// controllers/userController.js
const User = require("../model/user");

module.exports = {

    // get or create user by firebase uid
    getOrCreateUser: async (firebase_uid) => {
        if (!firebase_uid) {
            throw new Error("firebase_uid is required");
        }

        let user = await User.findOne({ firebase_uid });

        if (!user) {
            user = new User({ firebase_uid });
            await user.save();
        }

        return user;
    }

};
