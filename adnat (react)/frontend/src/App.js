import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import Home from './components/Home/Home';
import Editorg from './components/Organization/Editorg';
import Shifts from './components/Organization/Shifts';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <PrivateRoute path="/edit" component={Editorg}></PrivateRoute>
          <PrivateRoute path="/shifts" component={Shifts}></PrivateRoute>
          <PrivateRoute path="/" component={Home}></PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
