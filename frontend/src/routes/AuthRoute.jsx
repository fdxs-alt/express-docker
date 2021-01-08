import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSessionContext } from "../store/SessionStore";

const AuthRoute = ({ component, path, ...props }) => {
  const { isAuth } = useSessionContext();

  return isAuth ? (
    <Route path={path} component={component} {...props} />
  ) : (
    <Redirect to="/login" />
  );
};

export default AuthRoute;
