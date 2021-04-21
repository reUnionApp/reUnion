import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './authReducer';
import eventReducer from './eventReducer';
import allEventsReducer from './allEventsReducer';
import activityReducer from './activityReducer';
import allActivitiesReducer from './allActivitiesReducer';
import userReducer from './userReducer';

const reducer = combineReducers({
  authReducer,
  eventReducer,
  allEventsReducer,
  activityReducer,
  allActivitiesReducer,
  userReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

console.log('STORE------->', store.getState());

export default store;
export * from './authReducer';
export * from './eventReducer';
export * from './allEventsReducer';
export * from './activityReducer';
export * from './allActivitiesReducer';
export * from './userReducer';
