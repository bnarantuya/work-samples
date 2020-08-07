import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './Auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) =>
    isAuthenticated() === true ?
      <Component {...props} /> :
      <Redirect to='/login' />
  } />
}

export default PrivateRoute;