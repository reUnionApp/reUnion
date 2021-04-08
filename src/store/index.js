import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './authReducer';
import eventReducer from './eventReducer';
import eventsReducer from './eventsReducer';

const reducer = combineReducers({ authReducer, eventReducer, eventsReducer });

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './authReducer';
export * from './eventReducer';
export * from './eventsReducer';
