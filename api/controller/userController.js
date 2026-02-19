const User = require("../model/user");

module.exports = {

    getOrCreateUser: async (firebaseUid) => {

        if (!firebaseUid) {
            throw new Error("firebaseUid is required");
        }

        let user = await User.findOne({ firebaseUid });

        if (!user) {
            user = new User({ firebaseUid });
            await user.save();
        }

        return user;
    }

};
