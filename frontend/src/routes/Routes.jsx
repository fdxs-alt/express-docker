import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Notes from "../pages/Notes";
import AuthRoute from "./AuthRoute";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <AuthRoute path="/notes" component={Notes} exact />
      </Switch>
    </Router>
  );
};

export default Routes;
