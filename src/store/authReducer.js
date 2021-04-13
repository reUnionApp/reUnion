import axios from 'axios';
import history from '../history';

// Action Types

const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

// Initial State

const defaultUser = {};

// Action Creators

const _getUser = (user) => ({ type: GET_USER, user });
const _removeUser = () => ({ type: REMOVE_USER });

// Thunk Creators

export const me = () => async (dispatch) => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(_getUser(res.data || defaultUser));
  } catch (error) {
    console.error(error);
  }
};

export const signup = (email, password, firstName, lastName) => async (
  dispatch
) => {
  let res;
  try {
    res = await axios.post(`/auth/signup`, {
      email,
      password,
      firstName,
      lastName,
    });
  } catch (authError) {
    return dispatch(_getUser({ error: authError }));
  }
  try {
    dispatch(_getUser(res.data));
    history.push('/home');
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const login = (email, password) => async (dispatch) => {
  let res;
  try {
    res = await axios.post(`/auth/login`, {
      email,
      password,
    });
  } catch (authError) {
    return dispatch(_getUser({ error: authError }));
  }
  try {
    dispatch(_getUser(res.data));
    history.push('/home');
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post('/auth/logout');
    dispatch(_removeUser());
    history.push('/login');
  } catch (error) {
    console.error(error);
  }
};

// Reducer

export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
