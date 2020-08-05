import React from 'react';
import Home from '../Home/Home';
import { Route, Switch } from "react-router-dom";

function HomeRouter() {

  return (
    <div>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

export default HomeRouter
