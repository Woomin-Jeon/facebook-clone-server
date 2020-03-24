const User = require('../models/user');

const UserRepo = {
  async getAllUsers() {
    return await User.find();
  },

  async signUp(id, pw, userName, birth, location, email, profile) {
    await User.create({
      id, pw, userName, birth, location, email, friends: [], profile,
    });
  },

  async uploadProfileImage(req) {
    const {userId, filePath} = req.body;

    await User.updateOne(
      {id: userId},
      {$set: {profile: filePath}},
    );
  },

  async findBySession(req) {
    return await User.findById(req.session.userID);
  },

  async getUserById(userID) {
    return await User.findOne({id: userID});
  },

  async onlineStatus(userID, bool) {
    await User.updateOne(
      { id: userID },
      { $set: { online: bool } }
    );
  },

  async addFriend(userID, friendID) {
    await User.updateOne(
      { id: userID },
      { $addToSet: { friends: friendID } }
    );
  },

  async removeFrined(userID, friendID) {
    await User.updateOne(
      { id: userID },
      { $pull : { friends: friendID } }
    );
  }
};

module.exports = UserRepo;

