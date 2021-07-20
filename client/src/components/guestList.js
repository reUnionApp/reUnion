import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  addPseudoUser,
  updatePseudoUser,
  getGuestList,
  removeGuest,
  updateUser,
  getEvent,
  getMailGuestList,
  sendMailGuestList,
  getUserEvents,
  updateRegUser
} from '../store';
import '../styles/guestList.css';
import '../styles/create.css';
import '../styles/single.css';
import UpdateGuest from './updateGuest';
import GuestBox from './guestBox';
import PulseButton from './pulseButton';

const colors = {
  1: 'tealFade',
  2: 'pinkFade',
  3: 'yellowFade',
};

const GuestList = (props) => {
  const [guestList, setGuestList] = useState([props.guests]);
  const [editPerson, setEditPerson] = useState(-1);
  const [updateErrors, setUpdateErrors] = useState('');
  const [guestToUpdate, setGuestToUpdate] = useState({});
  let { error } = props;

  useEffect(() => {
    props.getGuestList(props.match.params.eventId);
  }, [guestList]);

  useEffect(() => {
    props.getEvent(props.match.params.eventId);
  }, []);

  useEffect(() => {
    props.getUserEvents(props.auth.id);
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
  };

  const deleteSelectedGuest = async (guestId) => {
    openClose();
    const eventId = Number(props.match.params.eventId);
    await props.removeGuest(eventId, guestId);
    await props.getGuestList(eventId);
    // props.clearError();
  };

  const handleUpdate = async (event, updatedInfo) => {
    let updateGuestAttempt = {};

    if (updateGuest.userType === 'basic') {
      updateGuestAttempt = await props.updatePseudoUser(
        updatedInfo,
        props.auth,
        Number(props.match.params.eventId)
      );
    } else {
      updateGuestAttempt = await props.updateRegUser(
        updatedInfo,
        props.auth,
        Number(props.match.params.eventId)
      );
    }
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

  const [updateGuest, setUpdateGuest] = useState({});

  let adminCheck;
  let ownerCheck;
  let coordCheck;
  let target = 0;

  if (props.userEvents) {
    const eventNum = Number(props.match.params.eventId);
    target = 0;
    for (let i = 0; i < props.userEvents.length; i++) {
      let targetEvent = props.userEvents[i];
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

  const [coordStatus, setCoordStatus] = useState(null);
  const [UGFN, setUGFN] = useState('first name');
  const [UGLN, setUGLN] = useState('last name');
  const [UGE, setUGE] = useState('email');

  const resetUG = () => {
    setGuestToUpdate({ reset: true });
    setUGFN('first name');
    setUGLN('last name');
    setUGE('email');
  };

  const hanldeTransition = () => {
    if (UGC.current.classList.contains('UGCClosed')) {
      resetUG();
    }
  }

  return (
    <div
      className="singleContainer flex column aItemsC background2Down"
      id="GLMaster"
    >
      <div
        id="updateGuestContainer"
        className="UGCClosed flex column aItemsC"
        ref={UGC}
        onTransitionEnd={hanldeTransition}
      >
        <UpdateGuest
          openClose={openClose}
          guestInfo={guestToUpdate}
          handleUpdate={handleUpdate}
          deleteGuest={deleteSelectedGuest}
          updateErrors={updateErrors}
          eventId={Number(props.match.params.eventId)}
          authUser={props.auth}
          coordStatus={coordStatus}
          setCoordStatus={setCoordStatus}
          UGFN={UGFN}
          setUGFN={setUGFN}
          UGLN={UGLN}
          setUGLN={setUGLN}
          UGE={UGE}
          setUGE={setUGE}
        />
      </div>
      <Link to={`/myEvents/${props.singleEvent.id}`}>
        <h1 id="guestListTitle">{props.singleEvent.eventName}</h1>
      </Link>
      <div className="singleColumn flex column jContentC aItemsC">
        {adminCheck || ownerCheck || coordCheck ? (
          <form id="guest-list" className="flex column" onSubmit={addGuest}>
            <div className="flex jContentSB marginBottom">
              <label className="GLLabel" htmlFor="first-name">
                First Name:
              </label>
              <input type="text" id="firstName" required />
            </div>
            <div className="flex jContentSB marginBottom">
              <label className="GLLabel" htmlFor="last-name">
                Last Name:
              </label>
              <input type="text" id="lastName" required />
            </div>
            <div className="flex jContentSB marginBottom">
              <label className="GLLabel" htmlFor="email">
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
              <PulseButton
                type={'submit'}
                height={50}
                width={200}
                fontSize={16}
                color1={'ffc400a4'}
                color2={'ffc4006e'}
                message={'Add New Guest'}
              />
            </div>
          </form>
        ) : (
            false
          )}
        <div id="guestListContainer">
          {props.guests &&
            props.guests
              .filter(
                (guest) => guest.Events[0].UserEvent.rsvpStatus === 'pending'
              )
              .map((guest) => {
                return (
                  <GuestBox
                    key={guest.id}
                    guest={guest}
                    adminCheck={adminCheck}
                    coordCheck={coordCheck}
                    ownerCheck={ownerCheck}
                    authUser={props.authUser}
                    event={props.singleEvent}
                    statusColor={'yellowFade'}
                    openClose={openClose}
                    selectGuest={selectGuest}
                    editPerson={editPerson}
                    setGuestToUpdate={setGuestToUpdate}
                    setUpdateGuest={setUpdateGuest}
                  />
                );
              })}
          {props.guests &&
            props.guests
              .filter(
                (guest) => guest.Events[0].UserEvent.rsvpStatus === 'accepted'
              )
              .map((guest) => {
                return (
                  <GuestBox
                    key={guest.id}
                    guest={guest}
                    adminCheck={adminCheck}
                    coordCheck={coordCheck}
                    ownerCheck={ownerCheck}
                    authUser={props.authUser}
                    event={props.singleEvent}
                    statusColor={'tealFade'}
                    openClose={openClose}
                    selectGuest={selectGuest}
                    editPerson={editPerson}
                    setGuestToUpdate={setGuestToUpdate}
                    setUpdateGuest={setUpdateGuest}
                  />
                );
              })}
          {props.guests &&
            props.guests
              .filter(
                (guest) => guest.Events[0].UserEvent.rsvpStatus === 'declined'
              )
              .map((guest) => {
                return (
                  <GuestBox
                    key={guest.id}
                    guest={guest}
                    adminCheck={adminCheck}
                    coordCheck={coordCheck}
                    ownerCheck={ownerCheck}
                    authUser={props.authUser}
                    event={props.singleEvent}
                    statusColor={'pinkFade'}
                    openClose={openClose}
                    selectGuest={selectGuest}
                    editPerson={editPerson}
                    setGuestToUpdate={setGuestToUpdate}
                    setUpdateGuest={setUpdateGuest}
                  />
                );
              })}
        </div>
        {adminCheck || ownerCheck || coordCheck ? (
          <div id="GLSIWrapper">
            <button
              // type="submit"
              className="button GLSendInvites"
              onClick={() => {
                props.getMailGuestList();
                props.sendMailGuestList(props.guests, props.singleEvent);
              }}
            >
              Send Invites
            </button>
          </div>
        ) : (
            false
          )}
      </div>
    </div>
  );
};

const mapState = (state) => ({
  auth: state.authReducer,
  user: state.userReducer,
  guests: state.guestListReducer.guestList,
  error: state.userReducer.error,
  singleEvent: state.eventReducer,
  userEvents: state.allEventsReducer.userEvents,
});

const mapDispatch = (dispatch) => ({
  addPseudoUser: (user) => dispatch(addPseudoUser(user)),
  updatePseudoUser: (updatedUser, authUser, eventId) =>
    dispatch(updatePseudoUser(updatedUser, authUser, eventId)),
  getGuestList: (id) => dispatch(getGuestList(id)),
  removeGuest: (eventId, guestId) => dispatch(removeGuest(eventId, guestId)),
  clearError: () => dispatch({ type: 'CLEAR_ERROR' }),
  updateUser: (user) => dispatch(updateUser(user)),
  getEvent: (id) => dispatch(getEvent(id)),
  getMailGuestList: () => dispatch(getMailGuestList()),
  sendMailGuestList: (guests, event) =>
    dispatch(sendMailGuestList(guests, event)),
  getUserEvents: (id) => dispatch(getUserEvents(id)),
  updateRegUser: (updatedUser, authUser, eventId) =>
    dispatch(updateRegUser(updatedUser, authUser, eventId)),

});

export default connect(mapState, mapDispatch)(GuestList);
