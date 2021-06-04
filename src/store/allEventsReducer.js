import axios from 'axios';

// Action Types
const GET_EVENTS = 'GET_EVENTS';
const GET_USER_EVENTS = 'GET_USER_EVENTS';

// Action Creators
const _getEvents = (events) => ({
  type: GET_EVENTS,
  events,
});

const _getUserEvents = (userEvents) => ({
  type: GET_USER_EVENTS,
  userEvents,
});

// Thunk
export const getEvents = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/events`);
    dispatch(_getEvents(data));
  } catch (error) {
    console.error(error);
  }
};

export const getUserEvents = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${id}/events`);
    for (let i = 0; i < data.length; i++) {
      data[i].eventName = data[i].eventName.split('~')[0];
    }
    dispatch(_getUserEvents(data));
  } catch (error) {
    console.error(error);
  }
};

const defaultState = {
  events: [],
  userEvents: [],
};

// Reducer
export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_EVENTS:
      return { ...state, events: action.events };
    case GET_USER_EVENTS:
      return { ...state, userEvents: action.userEvents };
    default:
      return state;
  }
}
