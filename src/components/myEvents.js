import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserEvents, removeEvent } from '../store';
import { Link } from 'react-router-dom';
import { faWrench, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import history from '../history';
import '../styles/myEvents.css';

const colors = {
  1: 'tealFade',
  2: 'pinkFade',
  3: 'yellowFade',
};

const MyEvents = (props) => {
  const userId = props.auth.id;
  const adminCheck = props.auth.isAdmin;

  const deleteSelectedEvent = async (eventId) => {
    await props.removeEvent(eventId);
    await props.getUserEvents(userId);
  };

  useEffect(() => {
    props.getUserEvents(userId);
  }, []);

  let count = 0;

  return (
    <div className="flex aItemsC column background1Up" id="myEventsContainer">
      <h2>
        You have {props.userEvents.length}{' '}
        {props.userEvents.length === 1 ? 'event' : 'events'}
      </h2>
      {props.userEvents &&
        props.userEvents.map((event) => {
          let ownerCheck = event.UserEvent.isOwner;
          let coordCheck = event.UserEvent.isCoordinator;
          count === 3 ? (count = 1) : ++count;
          return (
            <div
              className={`flex column aItemsC jContentC eventBox ${colors[count]}`}
              key={event.id}
            >
              {props.auth.id === event.ownerId && (
                <div style={{ margin: '5px 0px 0px 0px' }}>Host</div>
              )}
              <Link to={`/myEvents/${event.id}`}>
                <h3 style={{ margin: '8px 0px 19px 0px' }}>
                  {event.eventName}
                </h3>
              </Link>
              <div className="flex jContentSB w80">
                <Link to={`/myEvents/${event.id}/update`}>
                  {adminCheck && ownerCheck && coordCheck && adminCheck || ownerCheck || coordCheck ? (
                    <button className="MyEventsIcon">
                      <FontAwesomeIcon
                        className="fontAwesomeLink MyEventsIconSVG"
                        icon={faWrench}
                        style={{ width: '32px', height: 'auto' }}
                      />
                    </button>
                  ) : false}
                </Link>
                {adminCheck && ownerCheck && adminCheck || ownerCheck ? (
                  <button
                    onClick={() => deleteSelectedEvent(event.id)}
                    className="MyEventsIcon"
                  >
                    <FontAwesomeIcon
                      className="fontAwesomeLink MyEventsIconSVG"
                      icon={faTrash}
                      style={{ width: '30px', height: 'auto' }}
                    />
                  </button>
                ) : false}
              </div>
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
  auth: state.authReducer,
  userEvents: state.allEventsReducer.userEvents,
});

const mapDispatch = (dispatch) => ({
  getUserEvents: (id) => dispatch(getUserEvents(id)),
  removeEvent: (eventId) => dispatch(removeEvent(eventId)),
});

export default connect(mapState, mapDispatch)(MyEvents);
