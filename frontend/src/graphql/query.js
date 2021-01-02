import { gql } from "@apollo/client";

export const GET_USER_QUERY = gql`
  query getUser {
    getUser {
      id
      email
      nick
    }
  }
`;

export const IS_AUTH_QUERY = gql`
  query IsAuth {
    isAuth @client
  }
`;
