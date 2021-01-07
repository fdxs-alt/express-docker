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
