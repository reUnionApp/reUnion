import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import store from './store';
import history from './history';

if (window.location.host === 'myreunionapp.herokuapp.com') {
  if (
    window.location.protocol === 'http' ||
    window.location.protocol === 'http:'
  ) {
    window.location.protocol = 'https';
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
