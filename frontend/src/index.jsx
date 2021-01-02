import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { GATEWAY_URL } from "./utils/constants";
import isAuth from "./graphql/isAuth";
import App from "./App";

const client = new ApolloClient({
  link: new HttpLink({ credentials: "include", uri: GATEWAY_URL + "/graphql" }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isAuth: {
            read() {
              return isAuth();
            },
          },
        },
      },
    },
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

if (import.meta.hot) {
  import.meta.hot.accept();
}
