import axios from "axios";

const GET_USER = "GET_USER";
const UPDATE_USER = "UPDATE_USER";
const DELETE_USER = "DELETE_USER";

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

export const getUser = (userId) => async (dispatch) => {
  try {
    console.log("GET USER HAS FIREEEEED");
    const { data } = await axios.get(`/api/users/${userId}`);
    dispatch(_getUser(data));
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = (user) => async (dispatch) => {
  try {
    console.log("from user reducer, USER--->", user);
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
