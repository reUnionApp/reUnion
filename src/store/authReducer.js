import axios from 'axios';
import history from '../history';

// Action Types

const GET_AUTHUSER = 'GET_AUTHUSER';
const REMOVE_AUTHUSER = 'REMOVE_AUTHUSER';

// Initial State

const defaultUser = {};

// Action Creators

const _getAuthUser = (user) => ({ type: GET_AUTHUSER, user });
const _removeAuthUser = () => ({ type: REMOVE_AUTHUSER });

// Thunk Creators

export const me = () => async (dispatch) => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(_getAuthUser(res.data || defaultUser));
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
    return dispatch(_getAuthUser({ error: authError }));
  }
  try {
    dispatch(_getAuthUser(res.data));
    history.push('/myEvents');
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
    return dispatch(_getAuthUser({ error: authError }));
  }
  try {
    dispatch(_getAuthUser(res.data));
    history.push('/myEvents');
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post('/auth/logout');
    dispatch(_removeAuthUser());
    history.push('/login');
  } catch (error) {
    console.error(error);
  }
};

// Reducer

export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_AUTHUSER:
      return action.user;
    case REMOVE_AUTHUSER:
      return defaultUser;
    default:
      return state;
  }
}
