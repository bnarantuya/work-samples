import React from 'react';
import './App.css';
import LoginRouter from "./components/Routers/LoginRouter";
import HomeRouter from "./components/Routers/HomeRouter";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={LoginRouter}></Route>
          {/* <Route path="/profile" component={ProfileRouter}></Route> */}
          <Route path="/register" component={LoginRouter}></Route>
          {/* <Route path="/product/:id" component={DetailsRouter}></Route>
          <Route path="/search" component={SearchRouter}></Route> */}
          <Route path="/" component={HomeRouter}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
