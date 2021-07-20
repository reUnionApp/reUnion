import axios from 'axios';

// Action Types
const GET_GUEST_LIST = 'GET_GUEST_LIST';
const REMOVE_GUEST = 'REMOVE_GUEST';
const GET_MAIL = 'GET_MAIL';
const SEND_MAIL = 'SEND_MAIL';

// Action Creators
const _getGuestList = (guestList) => ({
  type: GET_GUEST_LIST,
  guestList,
});

const _removeGuest = (guestList) => ({
  type: REMOVE_GUEST,
  guestList,
});

const _getMailGuestList = (email) => ({
  type: GET_MAIL,
  email
})

const _sendMailGuestList = (email) => ({
  type: SEND_MAIL,
  email
})

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

export const getMailGuestList = () => async (dispatch) => {
  try {
    const data = await axios.get(`/api/email`);
    dispatch(_getMailGuestList(data));
  } catch (error) {
    console.error(error);
  }
};

export const sendMailGuestList = (guests, event) => async (dispatch) => {
  try {
    const payload = { guests, event }
    console.log('in sendMailGuestList thunk')
    const data = await axios.post(`/api/email/invitation`, payload);
    dispatch(_sendMailGuestList(data));
  } catch (error) {
    console.error(error);
  }
};



const defaultState = {
  guestList: [],
  email: {}
};

// Reducer
export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_GUEST_LIST:
      // return action.guestList;
      return { ...state, guestList: action.guestList }
    case REMOVE_GUEST:
      // return state;
      return { ...state, guestList: action.guestList }
    case GET_MAIL:
      // return state;
      return { ...state, email: action.email };
    case SEND_MAIL:
      // return state;
      return { ...state, email: action.email };
    default:
      return state;
  }
}
