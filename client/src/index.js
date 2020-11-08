import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import createBrowserHistory from './history';


import App from './Components/App';
import reducers from './reducers';
import './css/main.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk)),
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router history={createBrowserHistory}>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
