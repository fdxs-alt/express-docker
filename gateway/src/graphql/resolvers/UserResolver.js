const { AuthenticationError } = require("apollo-server-express");
const axios = require("axios");
const {
  validateSchema,
  createValidationError,
  createError,
  setJWT,
  USER_SERVICE,
} = require("../../utils/.");

module.exports = {
  Mutation: {
    register: async (_, args, ctx) => {
      const { args: registerCridentials } = args;
      try {
        await validateSchema(registerCridentials, "REGISTER");
      } catch (error) {
        createValidationError(error);
      }

      try {
        const { data } = await axios.post(
          USER_SERVICE + "/register",
          registerCridentials
        );

        setJWT(ctx.req, data.newUser.id);

        return data.newUser;
      } catch (error) {
        createError(error);
      }
    },
    logout: (_, __, ctx) => {
      if (ctx.req.userID) {
        ctx.req.session.destroy(() => console.log("Logged out"));
      }
      return true;
    },
    login: async (_, args, ctx) => {
      const { args: loginCridentials } = args;

      try {
        await validateSchema(loginCridentials, "LOGIN");
      } catch (error) {
        createValidationError(error);
      }

      try {
        const { data } = await axios.post(
          USER_SERVICE + "/login",
          loginCridentials
        );

        setJWT(ctx.req, data.user.id);

        return data.user;
      } catch (error) {
        createError(error);
      }
    },
  },
  Query: {
    getUser: async (_, __, ctx) => {
      const session = ctx.req.userID;

      if (!session) {
        throw new AuthenticationError("User unauthorized");
      }
      try {
        const { data } = await axios.get(USER_SERVICE + `/${session}`);

        return data.user;
      } catch (error) {
        createError(error);
      }
    },
  },
};
