import axios from 'axios';

// Action Types
const GET_GUEST_LIST = 'GET_GUEST_LIST';
const REMOVE_GUEST = 'REMOVE_GUEST';

// Action Creators
const _getGuestList = (guestList) => ({
  type: GET_GUEST_LIST,
  guestList,
});

const _removeGuest = (guestList) => ({
  type: REMOVE_GUEST,
  guestList,
});

// Thunk
export const getGuestList = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/events/${id}/guestList`);
    dispatch(_getGuestList(data));
  } catch (error) {
    console.error(error);
  }
};

export const removeGuest = (eventId, guestId) => async (dispatch) => {
  try {
    console.log('from thunk-->', eventId, guestId);
    const { data } = await axios.put(`/api/events/${eventId}/guestList`, {
      guestId,
    });
    dispatch(_removeGuest(data));
  } catch (error) {
    console.error(error);
  }
};

const defaultState = [];

// Reducer
export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_GUEST_LIST:
      return action.guestList;
    case REMOVE_GUEST:
      return state;
    default:
      return state;
  }
}
