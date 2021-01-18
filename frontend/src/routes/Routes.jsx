import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Notes from "../pages/Notes";
import AuthRoute from "./AuthRoute";
import PublicRoute from "./PublicRoute";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Main} exact />
        <PublicRoute path="/login" component={Login} exact />
        <PublicRoute path="/register" component={Register} exact />
        <AuthRoute path="/notes" component={Notes} exact />
      </Switch>
    </Router>
  );
};

export default Routes;
