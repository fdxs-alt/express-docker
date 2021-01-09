import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { GATEWAY_URL } from "./utils/constants";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import App from "./App";
import SessionStore from "./store/SessionStore";
import NoteStoreProvider from "./store/NoteStore";

const client = new ApolloClient({
  link: new HttpLink({ credentials: "include", uri: GATEWAY_URL + "/graphql" }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getUserNotes: {
            merge: false,
          },
        },
      },
    },
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider>
        <NoteStoreProvider>
          <SessionStore>
            <App />
            <CSSReset />
          </SessionStore>
        </NoteStoreProvider>
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

if (import.meta.hot) {
  import.meta.hot.accept();
}
