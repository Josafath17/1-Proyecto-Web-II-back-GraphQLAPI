const User = require("../models/userModel");

const user = {
  getUser: async ({ id }) => {
    try {
      const user = await User.findById(id);
      if (user.state !== "confirm") {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Internal server error");
    }
  },
  getUsers: async () => {
    try {
      const users = await User.find({ state: true });
      return users;
    } catch (error) {
      throw new Error("Internal server error");
    }
  },
};

module.exports = user;
