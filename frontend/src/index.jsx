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

const client = new ApolloClient({
  link: new HttpLink({ credentials: "include", uri: GATEWAY_URL + "/graphql" }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <SessionStore>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <App />
          <CSSReset />
        </ChakraProvider>
      </ApolloProvider>
    </SessionStore>
  </React.StrictMode>,
  document.getElementById("root")
);

if (import.meta.hot) {
  import.meta.hot.accept();
}
