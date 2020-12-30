const PostResolver = require("./resolvers/PostResolver");
const UserResolver = require("./resolvers/UserResolver");

const resolvers = [UserResolver, PostResolver];

module.exports = resolvers;
