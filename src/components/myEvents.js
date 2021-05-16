import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserEvents, removeEvent } from '../store';
import { Link } from 'react-router-dom';
import history from '../history';
import '../styles/myEvents.css';

const colors = {
  1: 'tealFade',
  2: 'pinkFade',
  3: 'yellowFade',
};

const MyEvents = (props) => {
  const userId = props.user.id;

  const deleteSelectedEvent = async (eventId) => {
    await props.removeEvent(eventId);
    await props.getUserEvents(userId);
  };

  useEffect(() => {
    props.getUserEvents(userId);
  }, []);

  let count = 0;

  return (
    <div
      className="flex aItemsC column background1Up"
      style={{ padding: '75px 0px 60px 0px' }}
      id="myEventsContainer"
    >
      <h2>
        You have {props.userEvents.length}{' '}
        {props.userEvents.length === 1 ? 'event' : 'events'}
      </h2>
      {props.userEvents &&
        props.userEvents.map((event) => {
          count === 3 ? (count = 1) : ++count;
          return (
            <div
              className={`flex column aItemsC jContentC eventBox ${colors[count]}`}
              key={event.id}
            >
              {props.user.id === event.ownerId && (
                <div style={{ margin: '5px 0px 0px 0px' }}>Host</div>
              )}
              <Link to={`/myEvents/${event.id}`}>
                <h3 style={{ margin: '8px 0px 19px 0px' }}>
                  {event.eventName}
                </h3>
              </Link>
              <button className="eventButton">
                <Link to={`/myEvents/${event.id}/update`}>Update</Link>
              </button>
              <button
                onClick={() => deleteSelectedEvent(event.id)}
                className="eventButton"
              >
                Delete
              </button>
            </div>
          );
        })}
      <a href="/createEvent">
        <button id="createEventLink" type="button" className="button">
          Create Event
        </button>
      </a>
    </div>
  );
};

const mapState = (state) => ({
  user: state.authReducer,
  userEvents: state.allEventsReducer.userEvents,
});

const mapDispatch = (dispatch) => ({
  getUserEvents: (id) => dispatch(getUserEvents(id)),
  removeEvent: (eventId) => dispatch(removeEvent(eventId)),
});

export default connect(mapState, mapDispatch)(MyEvents);
