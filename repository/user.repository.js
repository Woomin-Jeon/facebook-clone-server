require('express-async-errors');
const { User } = require('../models/user');

const userRepo = {
  async getAllUsers() {
    return await User.find();
  },

  async signUp(userInformation) {
    const { id, pw, userName, birth, location, email, profile } = userInformation;

    return await User.create({
      id, pw, userName, birth, location, email, friends: [], profile,
    });
  },

  async uploadProfileImage(userId, filePath) {
    return await User.updateOne(
      { id: userId },
      { $set: { profile: filePath }},
    );
  },

  async findBySession(req) {
    return await User.findById(req.session.userID);
  },

  async getUserById(userID) {
    return await User.findOne({ id: userID });
  },

  async onlineStatus(userID, bool) {
    return await User.updateOne(
      { id: userID },
      { $set: { online: bool } }
    );
  },

  async addFriend(userID, friendID) {
    return await User.updateOne(
      { id: userID },
      { $addToSet: { friends: friendID } }
    );
  },

  async removeFriend(userID, friendID) {
    return await User.updateOne(
      { id: userID },
      { $pull : { friends: friendID } }
    );
  }
};

module.exports = userRepo;


