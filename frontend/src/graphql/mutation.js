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
  mutation Login($args: RegisterCridentials!) {
    login(args: $args) {
      id
      nick
    }
  }
`;
