import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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
import PulseButton from './pulseButton';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { use } from 'passport';

const colors = {
  1: 'tealFade',
  2: 'pinkFade',
  3: 'yellowFade',
};

const GuestList = (props) => {
  const [guestList, setGuestList] = useState([props.guests]);
  const [editPerson, setEditPerson] = useState(-1);
  const [updateErrors, setUpdateErrors] = useState('');
  let { error } = props;

  useEffect(() => {
    props.getGuestList(props.match.params.eventId);
  }, [guestList]);

  useEffect(() => {
    props.getEvent(props.match.params.eventId);
  }, []);

  let count = 0;

  const addGuest = async (e) => {
    e.preventDefault();
    let guest = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      eventId: props.match.params.eventId,
    };
    setGuestList([...guestList, guest]);

    await props.addPseudoUser(guest);
    await props.getGuestList(props.match.params.eventId);

    e.target.reset();

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
    const updateGuestAttempt = await props.updateUser(updatedInfo);
    if (updateGuestAttempt === 200) {
      setUpdateErrors('');
      openClose();
      await props.getGuestList(props.match.params.eventId);
    } else {
      setUpdateErrors(updateGuestAttempt);
    }
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

  let adminCheck;
  let ownerCheck;
  let coordCheck;
  let target = 0;

  if (props.userEvents) {
    const eventNum = Number(props.match.params.eventId);
    target = 0;
    for (let i = 0; i < props.userEvents.length; i++) {
      let targetEvent = props.userEvents[i]
      if (targetEvent.id === eventNum) {
        target = i;
      }
    }

    if (props.userEvents[target]) {
      adminCheck = props.auth.isAdmin;
      ownerCheck = props.userEvents[target].UserEvent.isOwner;
      coordCheck = props.userEvents[target].UserEvent.isCoordinator;
    }
  }

  console.log(111111, props.guests)

  return (
    <div
      className="singleContainer flex column aItemsC background2Down"
      id="GLMaster"
    >
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
          updateErrors={updateErrors}
          eventId={Number(props.match.params.eventId)}
        />
      </div>
      <h1
        style={{
          alignSelf: 'center',
          textAlign: 'center',
          margin: '19px 0px 25px 0px',
        }}
        className="link"
      >
        Guest List for
        <br></br>
        <Link className="link" to={`/myEvents/${props.singleEvent.id}`}>
          <FontAwesomeIcon
            className="fontAwesomeLink linkIcon"
            icon={faLink}
          />
          {props.singleEvent.eventName}
        </Link>
      </h1>
      <div className="singleColumn flex column jContentC aItemsC">
        {adminCheck || ownerCheck || coordCheck ? (<form
          id="guest-list"
          className="flex column"
          style={{ width: '100%' }}
          onSubmit={addGuest}
        >
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
          <div className="flex jContentSB marginBottom">
            <label style={{ fontWeight: 'bold' }} htmlFor="email">
              Email:
            </label>
            <input type="email" id="email" required />
          </div>
          <div id="guestListErrorDiv">
            {error && error.response ? (
              <p id="guestListAddError"> {error.response.data} </p>
            ) : (
                false
              )}
          </div>
          <div id="addNewGuestButton">
            <PulseButton type={'submit'} height={50} width={200} fontSize={16} color1={'ffc400a4'} color2={'ffc4006e'} message={'Add New Guest'} />
          </div>
        </form>) : false}
        <div id="guestListContainer">
          {props.guests &&
            props.guests.map((guest) => {
              count === 3 ? (count = 1) : ++count;
              return (
                <div key={guest.id}>
                  <div
                    onClick={(e) => adminCheck || ownerCheck || coordCheck ? selectGuest(e, guest.id) : false}
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
                          <button
                            className="button"
                            id="GLUpdateButton"
                            onClick={() => {
                              setGuestToUpdate({
                                firstName: guest.firstName,
                                lastName: guest.lastName,
                                email: guest.email,
                                id: guest.id,
                                userType: guest.userType,
                                events: guest.Events
                              });
                              openClose();
                            }}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
        {adminCheck || ownerCheck || coordCheck ? (
          <button
            type="submit"
            className="button createButton"
            style={{ backgroundColor: '#e400678e' }}
          >
            Send Invites
          </button>
        ) : false}
      </div>
    </div>
  );
};

const mapState = (state) => ({
  auth: state.authReducer,
  user: state.userReducer,
  guests: state.guestListReducer,
  error: state.userReducer.error,
  singleEvent: state.eventReducer,
  userEvents: state.allEventsReducer.userEvents
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
