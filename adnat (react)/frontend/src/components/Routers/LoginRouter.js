import React from "react";
import Login from "../Login/Login";
import Register from "../Login/Register";
import { Route, Switch } from "react-router-dom";

const LoginRouter = () => {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </Switch>
  );
};

export default LoginRouter;