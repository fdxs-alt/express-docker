const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID
    email: String
    nick: String
    updatedAt: String
    createdAt: String
  }

  input RegisterCridentials {
    email: String
    nick: String
    password: String
  }

  input LoginCridentials {
    email: String
    password: String
  }

  type Query {
    getUser: User!
  }

  type Mutation {
    register(args: RegisterCridentials!): User!
    login(args: LoginCridentials!): User!
  }
`;

module.exports = typeDefs;
