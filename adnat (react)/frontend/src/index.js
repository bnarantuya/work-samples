import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer, { initialState } from './components/Reducer/rootReducer';
import throttle from 'lodash/throttle';
import * as serviceWorker from './serviceWorker';

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    //ignored here
  }
}

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return initialState
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return initialState
  }
}

const store = createStore(rootReducer, loadState());

store.subscribe(
  throttle(() => {
    saveState(store.getState())
  }, 1000)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> <BrowserRouter ><App /></BrowserRouter> </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
