import axios from 'axios';

// Action Types
const GET_EVENT = 'GET_EVENT';
const CREATE_EVENT = 'CREATE_EVENT';
const REMOVE_EVENT = 'REMOVE_EVENT';
const UPDATE_EVENT = 'UPDATE_EVENT';
const GET_GUEST_LIST = 'GET_GUEST_LIST';

// Action Creators
const _getEvent = (event) => ({
  type: GET_EVENT,
  event,
});

const _createEvent = (event) => ({
  type: CREATE_EVENT,
  event,
});

const _updateEvent = (event) => ({
  type: UPDATE_EVENT,
  event,
});

const _removeEvent = (event) => ({
  type: REMOVE_EVENT,
  event,
});

// Thunk
export const getEvent = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/events/${id}`);
    data.eventName = data.eventName.split('~')[0];
    dispatch(_getEvent(data));
  } catch (error) {
    console.error(error);
  }
};

export const createEvent = (event) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/events', event);
    data.eventName = data.eventName.split('~')[0];
    dispatch(_createEvent(data));
    return data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
};

export const updateEvent = (eventId, event) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/events/${eventId}`, event);
    dispatch(_updateEvent(data));
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const removeEvent = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/events/${id}`);
    dispatch(_removeEvent(data));
  } catch (error) {
    console.error(error);
  }
};

const defaultState = {}

// Reducer
export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_EVENT:
      return action.event;
    case CREATE_EVENT:
      return action.event;
    case UPDATE_EVENT:
      return action.event;
    case REMOVE_EVENT:
      return defaultState;
    default:
      return state;
  }
}
