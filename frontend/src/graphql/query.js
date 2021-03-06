import { gql } from "@apollo/client";

export const GET_USER_QUERY = gql`
  query getUser {
    getUser {
      nick
    }
  }
`;

export const GET_ALL_NOTES_QUERY = gql`
  query GetUserNotes {
    getUserNotes {
      id
      title
      content
      userID
      updatedAt
      createdAt
    }
  }
`;

export const GET_SPECIFIC_NOTE_QUERY = gql`
  query getSpecificNote($id: ID!) {
    getSpecificNote(id: $id) {
      id
      title
      content
    }
  }
`;
