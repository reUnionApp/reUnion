import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { getUserEvents, removeEvent } from '../store';
import { Link } from 'react-router-dom';
import { faWrench, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteEvent from './deleteEvent';
import EventBox from './eventBox';
import history from '../history';
import '../styles/myEvents.css';

const MyEvents = (props) => {
  const userId = props.auth.id;
  const adminCheck = props.auth.isAdmin;
  const [deleteEvent, setDeleteEvent] = useState(0);

  const deleteSelectedEvent = async (eventId) => {
    openClose();
    await props.removeEvent(eventId);
    await props.getUserEvents(userId);
  };

  useEffect(() => {
    props.getUserEvents(userId);
  }, []);

  const DSE = useRef(null);

  const openClose = () => {
    if (DSE.current.classList.contains('DSEClosed')) {
      DSE.current.classList.remove('DSEClosed');
      DSE.current.classList.add('DSEOpen');
    } else {
      DSE.current.classList.remove('DSEOpen');
      DSE.current.classList.add('DSEClosed');
    }
  };

  const eventStatusCount = (eventList, status) => {
    let statusCount = 0;
    for (let i = 0; i < eventList.length; i++) {
      if (eventList[i].UserEvent.rsvpStatus === status) {
        statusCount++;
      }
    }
    return statusCount;
  }

  return (
    <>
      <div
        className="deleteSingleEvent DSEClosed flex jContentC aItemsC"
        ref={DSE}
      >
        <DeleteEvent
          openClose={openClose}
          deleteEvent={deleteSelectedEvent}
          singleEvent={deleteEvent}
        />
      </div>
      <div className="flex aItemsC column background1Up" id="myEventsContainer">
        <h2 className="MEEventCount">You Have:</h2>
        <div>
          {eventStatusCount(props.userEvents, 'pending') > 0 ? <h2 className='MEEventType'>
            {eventStatusCount(props.userEvents, 'pending')}{' '}
            {eventStatusCount(props.userEvents, 'pending') === 1 ? 'Pending Event' : 'Pending Events'}
          </h2> : false}
          {props.userEvents &&
            props.userEvents.filter((event) => event.UserEvent.rsvpStatus === 'pending').map((event) => {
              return <EventBox event={event} openClose={openClose} setDeleteEvent={setDeleteEvent} adminCheck={adminCheck} key={event.id} userId={userId} statusColor={"yellowFade"} />
            })}
        </div>
        <div>
          <h2 className='MEEventType'>
            {eventStatusCount(props.userEvents, 'accepted')}{' '}
            {eventStatusCount(props.userEvents, 'accepted') === 1 ? 'Accepted Event' : 'Accepted Events'}
          </h2>
          {props.userEvents &&
            props.userEvents.filter((event) => event.UserEvent.rsvpStatus === 'accepted').map((event) => {
              return <EventBox event={event} openClose={openClose} setDeleteEvent={setDeleteEvent} adminCheck={adminCheck} key={event.id} userId={userId} statusColor={"tealFade"} />
            })}
        </div>
        <div>
          {eventStatusCount(props.userEvents, 'declined') > 0 ? <h2 className='MEEventType'>
            {eventStatusCount(props.userEvents, 'declined')}{' '}
            {eventStatusCount(props.userEvents, 'declined') === 1 ? 'Declined Event' : 'Declined Events'}
          </h2> : false}
          {props.userEvents &&
            props.userEvents.filter((event) => event.UserEvent.rsvpStatus === 'declined').map((event) => {
              return <EventBox event={event} openClose={openClose} setDeleteEvent={setDeleteEvent} adminCheck={adminCheck} key={event.id} userId={userId} statusColor={"pinkFade"} declined={true} />
            })}
        </div>
        <div id="createEventButtonWrapper">
          <img src="orange-balloon.png" id="CEBalloon" />
          <Link to={'/createEvent'} id="createEventBLink">
            <button id="createEventBButton" type="button">
              Create Event
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

const mapState = (state) => ({
  auth: state.authReducer,
  userEvents: state.allEventsReducer.userEvents,
});

const mapDispatch = (dispatch) => ({
  getUserEvents: (id) => dispatch(getUserEvents(id)),
  removeEvent: (eventId) => dispatch(removeEvent(eventId)),
});

export default connect(mapState, mapDispatch)(MyEvents);
