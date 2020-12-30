const { ApolloError } = require("apollo-server-express");

module.exports = {
  createError: ({ response }) => {
    throw new ApolloError(response.data.error, response.status);
  },
};
