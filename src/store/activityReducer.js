import axios from 'axios';

// Action Types
const GET_ACTIVITY = 'GET_ACTIVITY';
const CREATE_ACTIVITY = 'CREATE_ACTIVITY';
const REMOVE_ACTIVITY = 'REMOVE_ACTIVITY';
const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';

// Action Creators
const _getActivity = (activity) => ({
  type: GET_ACTIVITY,
  activity,
});

const _createActivity = (activity) => ({
  type: CREATE_ACTIVITY,
  activity,
});

const _updateActivity = (activity) => ({
  type: UPDATE_ACTIVITY,
  activity,
});

const _removeActivity = (activity) => ({
  type: REMOVE_ACTIVITY,
  activity,
});

// Thunk
export const getActivity = (eventId, activityId) => async (dispatch) => {
  try {
    // need to get activityId from activity
    const { data } = await axios.get(
      `/api/events/${eventId}/activities/${activityId}`
    );
    dispatch(_getActivity(data));
  } catch (error) {
    console.error(error);
  }
};

export const createActivity = (eventId, activity) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `/api/events/${eventId}/activities`,
      activity
    );
    dispatch(_createActivity(data));
    return data.id;
  } catch (error) {
    console.error(error);
  }
};

export const updateActivity = (eventId, activity) => async (dispatch) => {
  try {
    // need to get activityId from activity
    const { data } = await axios.put(
      `/api/events/${eventId}/activities/${activity.id}`,
      activity
    );
    dispatch(_updateActivity(data));
  } catch (error) {
    console.error(error);
  }
};

export const removeActivity = (eventId, activityId) => async (dispatch) => {
  try {
    // need to get activityId from activity
    const { data } = await axios.delete(
      `/api/events/${eventId}/activities/${activityId}`
    );
    dispatch(_removeActivity(data));
  } catch (error) {
    console.error(error);
  }
};

const defaultActivity = {};

// Reducer
export default function (state = defaultActivity, action) {
  switch (action.type) {
    case GET_ACTIVITY:
      return action.activity;
    case CREATE_ACTIVITY:
      return action.activity;
    case UPDATE_ACTIVITY:
      return action.activity;
    case REMOVE_ACTIVITY:
      return defaultActivity;
    default:
      return state;
  }
}
