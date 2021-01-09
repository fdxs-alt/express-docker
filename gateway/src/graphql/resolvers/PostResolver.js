const { AuthenticationError } = require("apollo-server-express");
const axios = require("axios");
const { NOTE_SERVICE, createError } = require("../../utils/.");

module.exports = {
  Mutation: {
    createNote: async (_, args, { req }) => {
      const userID = req.userID;
      if (!userID) {
        throw new AuthenticationError("User unauthorized");
      }

      const { args: createNoteData } = args;

      const noteData = { ...createNoteData, userID };

      try {
        const { data } = await axios.post(`${NOTE_SERVICE}/`, noteData);

        return data.newNote;
      } catch (error) {
        createError(error);
      }
    },
    deleteAllUsersNotes: async (_, __, { req }) => {
      const userID = req.userID;

      if (!userID) {
        throw new AuthenticationError("User unauthorized");
      }

      try {
        const { data } = await axios.delete(`${NOTE_SERVICE}/user/${userID}`);

        return data;
      } catch (error) {
        createError(error);
      }
    },
    deleteNote: async (_, { id }, { req }) => {
      const userID = req.userID;

      if (!userID) {
        throw new AuthenticationError("User unauthorized");
      }

      try {
        const { data } = await axios.delete(`${NOTE_SERVICE}/${id}`);

        return data;
      } catch (error) {
        createError(error);
      }
    },
    updateNote: async (__, args, { req }) => {
      const userID = req.userID;

      if (!userID) {
        throw new AuthenticationError("User unauthorized");
      }

      const { args: data } = args;

      const { id, updateNoteData } = data;

      try {
        const { data } = await axios.patch(
          `${NOTE_SERVICE}/${id}`,
          updateNoteData
        );

        return data.updatedNote;
      } catch (error) {
        createError(error);
      }
    },
  },
  Query: {
    getUserNotes: async (_, __, { req }) => {
      const userID = req.userID;

      if (!userID) {
        throw new AuthenticationError("User unauthorized");
      }

      try {
        const { data } = await axios.get(`${NOTE_SERVICE}/user/${userID}`);

        return data.userNotes;
      } catch (error) {
        createError(error);
      }
    },
    getSpecificNote: async (_, { id }, { req }) => {
      const userID = req.userID;

      if (!userID) {
        throw new AuthenticationError("User unauthorized");
      }

      try {
        const { data } = await axios.get(`${NOTE_SERVICE}/${id}`);

        return data.singleNote;
      } catch (error) {
        createError(error);
      }
    },
  },
};
