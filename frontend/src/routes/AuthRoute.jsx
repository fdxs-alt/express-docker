import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { IS_AUTH_QUERY } from "../graphql/query";
const AuthRoute = ({ path, exact, component, ...rest }) => {
  const { data } = useQuery(IS_AUTH_QUERY);

  return data.isAuth ? (
    <Route path={path} exact={exact} component={component} {...rest} />
  ) : (
    <Redirect to="/login" />
  );
};

export default AuthRoute;
