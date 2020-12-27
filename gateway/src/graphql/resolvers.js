const resolvers = {
  Query: {
    hello: (_, __, context) => {
      return "Hello";
    },
  },
};
module.exports = resolvers;
