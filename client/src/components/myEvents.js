import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { getUserEvents, removeEvent } from '../store';
import { Link } from 'react-router-dom';
import { faWrench, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteEvent from './deleteEvent';
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
  const [deleteEvent, setDeleteEvent] = useState(0);

  const deleteSelectedEvent = async (eventId) => {
    openClose();
    await props.removeEvent(eventId);
    await props.getUserEvents(userId);
  };

  useEffect(() => {
    props.getUserEvents(userId);
  }, []);

  let count = 0;

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
        <h2 id="MEEventCount">
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
                  <div id="eventBoxHost">Host</div>
                )}
                <Link to={`/myEvents/${event.id}`}>
                  <h3 id="eventBoxTitle">{event.eventName}</h3>
                </Link>
                <div className="MEButtonRow flex jContentC w100">
                  {adminCheck || ownerCheck || coordCheck ? (
                    <div className="MEButtonWrapper">
                      <Link
                        to={`/myEvents/${event.id}/update`}
                        id="MEWrenchLink"
                      >
                        <button className="MyEventsIcon">
                          <FontAwesomeIcon
                            className="fontAwesomeLink MyEventsIconSVG"
                            icon={faWrench}
                            id="MEWrench"
                          />
                        </button>
                      </Link>
                    </div>
                  ) : (
                    false
                  )}
                  {adminCheck || ownerCheck ? (
                    <div className="MEButtonWrapper">
                      <button
                        className="MyEventsIcon"
                        onClick={() => {
                          setDeleteEvent(event);
                          openClose();
                        }}
                      >
                        <FontAwesomeIcon
                          className="fontAwesomeLink MyEventsIconSVG"
                          icon={faTrash}
                          id="METrash"
                        />
                      </button>
                    </div>
                  ) : (
                    false
                  )}
                </div>
              </div>
            );
          })}
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
