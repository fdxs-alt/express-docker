const { AuthenticationError } = require("apollo-server-express");
const axios = require("axios");
const { USER_SERVICE } = require("../../utils/constants");

module.exports = {
  Mutation: {
    register: async (_, args, ctx) => {
      const { args: registerCridentials } = args;

      const { data } = await axios.post(
        USER_SERVICE + "/register",
        registerCridentials
      );
      ctx.req.session.userID = data.newUser.id;
      return data.newUser;
    },
    login: async (_, args, ctx) => {
      const { args: LoginCridentials } = args;
      const { data } = await axios.post(
        USER_SERVICE + "/login",
        LoginCridentials
      );
      ctx.req.session.userID = data.user.id;

      return data.user;
    },
  },
  Query: {
    getUser: async (_, __, ctx) => {
      const session = ctx.req.session.userID;
      if (!session) {
        throw new AuthenticationError("User unauthorized");
      }

      const { data } = await axios.get(USER_SERVICE + `/${session}`);

      return data.user;
    },
  },
};
