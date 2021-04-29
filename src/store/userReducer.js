import axios from 'axios';

const ADD_PSEUDO_USER = 'ADD_PSEUDO_USER';
const GET_USER = 'GET_USER';
const UPDATE_USER = 'UPDATE_USER';
const DELETE_USER = 'DELETE_USER';

const _addPseudoUser = (user) => {
  return {
    type: ADD_PSEUDO_USER,
    user,
  };
};

const _getUser = (user) => {
  return {
    type: GET_USER,
    user,
  };
};

const _updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

const _deleteUser = (user) => {
  return {
    type: DELETE_USER,
    user,
  };
};

export const addPseudoUser = (user) => async (dispatch) => {
  try {
    console.log('POST', user);
    const { data } = await axios.post('/api/users/', user);
    dispatch(_addPseudoUser(data));
  } catch (error) {
    console.error(error);
  }
};

export const getUser = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${userId}`);
    dispatch(_getUser(data));
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = (user) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/users/${user.id}`, user);
    dispatch(_updateUser(data));
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    const { data } = axios.delete(`/api/users/${userId}`);
    dispatch(_deleteUser(data));
  } catch (error) {
    console.error(error);
  }
};

const defaultState = {};

export default function (state = defaultState, action) {
  switch (action.type) {
    case ADD_PSEUDO_USER:
      return action.user;
    case GET_USER:
      return action.user;
    case UPDATE_USER:
      return action.user;
    case DELETE_USER:
      return action.user;
    default:
      return state;
  }
}
