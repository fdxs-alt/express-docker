import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($args: LoginCridentials!) {
    login(args: $args) {
      id
      nick
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation register($args: RegisterCridentials!) {
    register(args: $args) {
      id
      nick
    }
  }
`;

export const CREATE_NOTE_MUTATION = gql`
  mutation CreateNote($args: NoteData!) {
    createNote(args: $args) {
      id
      title
      content
      updatedAt
      createdAt
    }
  }
`;

export const UPDATE_NOTE_MUTATION = gql`
  mutation UpdateNote($args: UpdateNoteData!) {
    updateNote(args: $args) {
      id
      title
      content
      updatedAt
      createdAt
    }
  }
`;

export const DELETE_NOTE_MUTATION = gql`
  mutation DeleteNote($id: ID!) {
    deleteNote(id: $id) {
      success
    }
  }
`;
