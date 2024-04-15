const Account = require("../models/accountModel");
// const User = require("../models/userModel");

const account = {
  getAccount: async ({ id }) => {
    try {
      const account = await Account.findById(id);
      return account;
    } catch (error) {
      throw new Error("Internal server error");
    }
  },
  getAccounts: async () => {
    try {
      const accounts = await Account.find({ state: true });
      return accounts;
    } catch (error) {
      throw new Error("Internal server error");
    }
  },
};

modulo.export = account;
