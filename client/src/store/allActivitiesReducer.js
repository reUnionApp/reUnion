import axios from 'axios';

// Action Types
const GET_ACTIVITIES = 'GET_ACTIVITIES';

// Action Creators
const _getActivities = (activities) => ({
  type: GET_ACTIVITIES,
  activities,
});

// Thunk
export const getActivities = (eventId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/events/${eventId}/activities`);
    dispatch(_getActivities(data));
  } catch (error) {
    console.error(error);
  }
};

const defaultState = [];

// Reducer
export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_ACTIVITIES:
      return action.activities;
    default:
      return state;
  }
}
