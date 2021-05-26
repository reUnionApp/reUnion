import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
  addPseudoUser,
  getGuestList,
  removeGuest,
  updateUser,
  getEvent,
} from '../store';
import '../styles/guestList.css';
import '../styles/create.css';
import '../styles/single.css';
import UpdateGuest from './updateGuest';
import { use } from 'passport';
import { CenterFocusStrong } from '@material-ui/icons';

const colors = {
  1: 'tealFade',
  2: 'pinkFade',
  3: 'yellowFade',
};

const GuestList = (props) => {
  const [guestList, setGuestList] = useState([props.guests]);
  const [editPerson, setEditPerson] = useState(-1);
  let { error } = props;
  const [emailError, setEmailError] = useState('');
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    props.getGuestList(props.match.params.eventId);
  }, [guestList]);

  useEffect(() => {
    props.getEvent(props.match.params.eventId);
  }, []);

  let count = 0;

  const addGuest = async (e) => {
    // e.preventDefault()
    const incorrectEmail = e.nativeEvent.target.form[2].validity.typeMismatch
    if (incorrectEmail) {
      setEmailError('I\'m expecting a valid email address');
      setInputError("")
      return;
    } else {
      setEmailError('');
    }

    let guest = {
      firstName: e.target.parentNode.firstName.value,
      lastName: e.target.parentNode.lastName.value,
      email: e.target.parentNode.email.value,
      eventId: props.match.params.eventId,
    };

    const errorArray = [guest.firstName, guest.lastName, guest.email];

    if (errorArray.includes('')) {
      setInputError('Enter a first name, last name and email');
      setEmailError("");
      return;
    } else {
      setInputError("")
    }

    setGuestList([...guestList, guest]);

    await props.addPseudoUser(guest);
    await props.getGuestList(props.match.params.eventId);

    e.target.parentNode.reset();

    // console.log(e.target.parentNode.firstName.value)
  };
  // console.log(props.match.params);

  const deleteSelectedGuest = async (guestId) => {
    openClose();
    const eventId = Number(props.match.params.eventId);
    console.log('guestId-->', guestId);
    console.log('eventId-->', eventId);
    await props.removeGuest(eventId, guestId);
    await props.getGuestList(eventId);
    // props.clearError();
  };

  const handleUpdate = async (event, updatedInfo) => {
    openClose();
    await props.updateUser(updatedInfo);
    await props.getGuestList(props.match.params.eventId);
  };

  const selectText = (event) => {
    const input = event.target;
    input.focus();
    input.select();
  };

  const selectGuest = (e, guestId) => {
    if (e.target.className !== 'button') {
      if (editPerson === guestId) {
        setEditPerson(-1);
      } else {
        setEditPerson(guestId);
      }
    }
  };

  const UGC = useRef(null);

  const openClose = () => {
    if (UGC.current.classList.contains('UGCClosed')) {
      UGC.current.classList.remove('UGCClosed');
      UGC.current.classList.add('UGCOpen');
    } else {
      UGC.current.classList.remove('UGCOpen');
      UGC.current.classList.add('UGCClosed');
    }
  };

  const [guestToUpdate, setGuestToUpdate] = useState({});

  return (
    <div className="singleContainer flex column aItemsC" id="GLMaster">
      <div
        id="updateGuestContainer"
        className="UGCClosed flex column aItemsC"
        ref={UGC}
      >
        <UpdateGuest
          openClose={openClose}
          guestInfo={guestToUpdate}
          handleUpdate={handleUpdate}
          deleteGuest={deleteSelectedGuest}
        />
      </div>
      <h1
        style={{
          alignSelf: 'center',
          textDecoration: 'underline',
          textAlign: 'center',
          margin: '19px 0px 25px 0px',
        }}
      >
        Guest List for
        <br></br>
        {props.singleEvent.eventName}
      </h1>
      <div className="singleColumn flex column jContentC aItemsC">
        <form id="guest-list" className="flex column" style={{ width: '100%' }}>
          <div className="flex jContentSB marginBottom">
            <label style={{ fontWeight: 'bold' }} htmlFor="first-name">
              First Name:
            </label>
            <input type="text" id="firstName" required />
          </div>
          <div className="flex jContentSB marginBottom">
            <label style={{ fontWeight: 'bold' }} htmlFor="last-name">
              Last Name:
            </label>
            <input type="text" id="lastName" required />
          </div>
          <div>
            {emailError && <p style={{ textAlign: 'center', color: 'red' }}>{emailError}</p>}
          </div>
          <div className="flex jContentSB marginBottom">
            <label style={{ fontWeight: 'bold' }} htmlFor="email">
              Email:
            </label>
            <input type="email" id="email" required />
          </div>
          <div>
            {inputError && <p style={{ textAlign: 'center', color: 'red', margin: '30px 0px 0px 0px' }}>{inputError}</p>}
          </div>
          <button
            type="button"
            className="button createButton"
            onClick={(e) => addGuest(e)}
          >
            Add New Guest
          </button>
        </form>
        {error && error.response ? <div> {error.response.data} </div> : <br />}
        <div id="guestListContainer">
          {props.guests &&
            props.guests.map((guest) => {
              count === 3 ? (count = 1) : ++count;
              return (
                <div key={guest.id}>
                  <div
                    onClick={(e) => selectGuest(e, guest.id)}
                    className={`flex column aItemsC jContentC guestBox ${colors[count]}`}
                  >
                    <h3 style={{ margin: '0px' }}>
                      {guest.firstName} {guest.lastName}
                    </h3>
                    {guest.id === editPerson && (
                      <div className="flex column expandedCard">
                        <div className="expandedCardRow">
                          <p className="expandedCardRowL">Email:</p>
                          {guest.email.length >= 20 ? (
                            <div className="longEmail flex column aItemsFS">
                              <p className="expandedCardRowAlt">
                                {guest.email}
                              </p>
                            </div>
                          ) : (
                              <p className="expandedCardRowR">{guest.email}</p>
                            )}
                        </div>
                        {guest.alias && (
                          <div className="expandedCardRow">
                            <p className="expandedCardRowL">Nickname:</p>
                            <p className="expandedCardRowR">{guest.alias}</p>
                          </div>
                        )}
                        {guest.dietaryRestrictions && (
                          <div className="expandedCardRow">
                            <p className="expandedCardRowL">
                              Dietary Restrictions:
                            </p>
                            <p className="expandedCardRowR">
                              {guest.dietaryRestrictions}
                            </p>
                          </div>
                        )}
                        {guest.specialRequests && (
                          <>
                            {guest.specialRequests.length >= 20 ? (
                              <div
                                className="flex column"
                                style={{ margin: '10px 0 0 0' }}
                              >
                                <p
                                  className="expandedCardRowL"
                                  style={{ alignSelf: 'flex-start' }}
                                >
                                  Special Requests:
                                </p>
                                <div className="longText flex column aItemsFS">
                                  <p className="expandedCardRowAlt">
                                    {guest.specialRequests}
                                  </p>
                                </div>
                              </div>
                            ) : (
                                <div className="expandedCardRow">
                                  <p className="expandedCardRowL">
                                    Special Requests:
                                </p>
                                  <p className="expandedCardRowR">
                                    {guest.specialRequests}
                                  </p>
                                </div>
                              )}
                          </>
                        )}
                        <div
                          className="flex jContentSA"
                          style={{
                            margin: '25px 0px 0px 0px',
                            alignItems: 'baseline',
                          }}
                        >
                          {guest.userType === 'registered' ? (
                            'Registered User'
                          ) : (
                              <button
                                className="button"
                                id="GLUpdateButton"
                                onClick={() => {
                                  setGuestToUpdate({
                                    firstName: guest.firstName,
                                    lastName: guest.lastName,
                                    email: guest.email,
                                    id: guest.id,
                                  });
                                  openClose();
                                }}
                              >
                                Update
                              </button>
                            )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
        <button
          type="submit"
          className="button createButton"
          style={{ backgroundColor: '#e400678e' }}
        >
          Send Invites
        </button>
      </div>
    </div>
  );
};

const mapState = (state) => ({
  user: state.userReducer,
  guests: state.guestListReducer,
  error: state.userReducer.error,
  singleEvent: state.eventReducer,
});

const mapDispatch = (dispatch) => ({
  addPseudoUser: (user) => dispatch(addPseudoUser(user)),
  getGuestList: (id) => dispatch(getGuestList(id)),
  removeGuest: (eventId, guestId) => dispatch(removeGuest(eventId, guestId)),
  clearError: () => dispatch({ type: 'CLEAR_ERROR' }),
  updateUser: (user) => dispatch(updateUser(user)),
  getEvent: (id) => dispatch(getEvent(id)),
});

export default connect(mapState, mapDispatch)(GuestList);
