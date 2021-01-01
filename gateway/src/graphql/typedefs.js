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

  input NoteData {
    title: String
    content: String
    userID: ID
  }

  input UpdateNoteData {
    title: String
    content: String
    id: ID
  }

  type Note {
    id: ID
    title: String
    content: String
    userID: ID
    updatedAt: String
    createdAt: String
  }

  type Success {
    success: Boolean
  }

  type Query {
    getUser: User!
    getUserNotes: [Note!]
    getSpecificNote(id: ID!): Note!
  }

  type Mutation {
    register(args: RegisterCridentials!): User!
    login(args: LoginCridentials!): User!
    logout: Boolean!
    createNote(args: NoteData!): Note!
    deleteAllUsersNotes: Success!
    deleteNote(id: ID!): Success!
    updateNote(args: UpdateNoteData!): Note!
  }
`;

module.exports = typeDefs;
