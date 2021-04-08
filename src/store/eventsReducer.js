import axios from 'axios';

// Action Types
const GET_EVENTS = 'GET_EVENTS';

// Action Creators
const _getEvents = (events) => ({
  type: GET_EVENTS,
  events
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

const defaultEvents = [];

// Reducer
export default function (state = defaultEvents, action) {
  switch (action.type) {
    case GET_EVENTS:
      return action.events;
    default:
      return state;
  }
}

