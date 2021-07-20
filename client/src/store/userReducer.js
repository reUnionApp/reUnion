import axios from 'axios';

const ADD_PSEUDO_USER = 'ADD_PSEUDO_USER';
const UPDATE_PSEUDO_USER = 'UPDATE_PSEUDO_USER';
const UPDATE_REG_USER = 'UPDATE_REG_USER';
const GET_USER = 'GET_USER';
const UPDATE_USER = 'UPDATE_USER';
const DELETE_USER = 'DELETE_USER';
const CLEAR_ERROR = 'CLEAR_ERROR';

const _addPseudoUser = (user) => {
  return {
    type: ADD_PSEUDO_USER,
    user,
  };
};

const _updatePseudoUser = (user) => {
  return {
    type: UPDATE_PSEUDO_USER,
    user,
  };
};

const _updateRegUser = (user) => {
  return {
    type: UPDATE_REG_USER,
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
  let res;
  try {
    res = await axios.post('/api/users/', user);
  } catch (userError) {
    return dispatch(_addPseudoUser({ error: userError }));
  }
  try {
    dispatch(_addPseudoUser(res.data));
  } catch (error) {
    console.error(error);
  }
};

export const updatePseudoUser = (updatedInfo, authUser, eventId) => async (dispatch) => {
  try {
    const payLoad = { id: authUser.id, updatedInfo }
    const { data } = await axios.put(`/api/users/pseudo/${eventId}`, payLoad);
    dispatch(_updatePseudoUser(data));
    return 200;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
};

export const updateRegUser = (updatedInfo, authUser, eventId) => async (dispatch) => {
  try {
    const payLoad = { id: authUser.id, updatedInfo }
    const { data } = await axios.put(`/api/users/registered/${eventId}`, payLoad);
    dispatch(_updateRegUser(data));
    return 200;
  } catch (error) {
    console.error(error);
    return error.response.data;
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
    return 200;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/users/${userId}`);
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
    case UPDATE_PSEUDO_USER:
      return action.user
    case UPDATE_REG_USER:
      return action.user
    case GET_USER:
      return action.user;
    case UPDATE_USER:
      return action.user;
    case DELETE_USER:
      return action.user;
    case CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
}
