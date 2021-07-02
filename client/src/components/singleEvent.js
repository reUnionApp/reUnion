import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
  getEvent,
  removeEvent,
  getActivities,
  removeActivity,
  getUserEvents,
} from '../store';
import { Link } from 'react-router-dom';
import { GuestList } from './index';
import { faWrench, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteEvent from './deleteEvent';
import '../styles/single.css';
import '../styles/create.css';
import DeleteActivity from './deleteActivity';

const colors = {
  1: 'tealFade',
  2: 'pinkFade',
  3: 'yellowFade',
};

let count = 0;

const SingleEvent = (props) => {
  const id = props.auth.id;
  const eventId = props.match.params.eventId;
  const [activityToDelete, setActivityToDelete] = useState({});
  const updateEventButton = useRef(null);

  const deleteSelectedEvent = async (eventId) => {
    openClose();
    await props.removeEvent(eventId);
    props.history.push(`/myEvents`);
  };

  const deleteSelectedActivity = async (eventId, activityId) => {
    openCloseActivity();
    await props.removeActivity(eventId, activityId);
    await props.getActivities(eventId);
  };

  useEffect(() => {
    props.getEvent(eventId);
    props.getActivities(props.match.params.eventId);
    props.getUserEvents(id);
  }, []);

  const dateFormat = (date) => {
    let dateObj = date;
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    return month + '/' + day + '/' + year;
  };

  const {
    eventName,
    eventType,
    owner,
    // coordinator,
    description,
    location,
    startDateTime,
    endDateTime,
  } = props.singleEvent;

  let adminCheck;
  let ownerCheck;
  let coordCheck;

  if (props.userEvents) {
    const eventNum = Number(eventId);
    let target = 0;
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

  const DSE = useRef(null);
  const DSA = useRef(null);

  const openCloseActivity = () => {
    if (DSA.current.classList.contains('DSAClosed')) {
      DSA.current.classList.remove('DSAClosed');
      DSA.current.classList.add('DSAOpen');
    } else {
      DSA.current.classList.remove('DSAOpen');
      DSA.current.classList.add('DSAClosed');
    }
  };

  const openClose = () => {
    if (DSE.current.classList.contains('DSEClosed')) {
      DSE.current.classList.remove('DSEClosed');
      DSE.current.classList.add('DSEOpen');
    } else {
      DSE.current.classList.remove('DSEOpen');
      DSE.current.classList.add('DSEClosed');
    }
  };

  const updateEventStyle = () => {
    if (coordCheck) {
      updateEventButton.current.classList.add('test');
    } else {
      updateEventButton.current.classList.add('test');
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
          singleEvent={props.singleEvent}
        />
      </div>
      <div
        className="deleteSingleActivity DSAClosed flex jContentC aItemsC"
        ref={DSA}
      >
        <DeleteActivity
          openCloseActivity={openCloseActivity}
          deleteActivity={deleteSelectedActivity}
          singleEvent={props.singleEvent}
          activityToDelete={activityToDelete}
        />
      </div>
      <div className="singleMaster singleContainer flex column aItemsC background1Up">
        <div className="singleTopRow flex jContentC w95">
          <Link to={`/myEvents/${eventId}/update`}>
            <button
              ref={updateEventButton}
              className="button updateEventS"
              onLoad={updateEventStyle}
              disabled={!(adminCheck || ownerCheck || coordCheck)}
            >
              Update Event
            </button>
          </Link>
          <h1 className="singleTitle">{eventName}</h1>
          <button
            className="button deleteEventS"
            disabled={!(adminCheck || ownerCheck)}
            onClick={() => {
              openClose();
            }}
          >
            Delete Event
          </button>
        </div>
        <div className="singleWrapper singleColumn flex column">
          <div className="confLineS">
            <p className="confBoldS">Event Type: </p>
            <p className="confValueS">{eventType}</p>
          </div>
          <div className="confLineS">
            <p className="confBoldS">Host: </p>
            <p className="confValueS">{owner}</p>
          </div>
          <div
            className="confLineS"
            style={{ maxWidth: '100%', alignItems: 'flex-start' }}
          >
            <p className="confBoldS">Description: </p>
            <div className="descriptionConfContainerS">
              <p className="confValueDescS">{description}</p>
            </div>
          </div>
          <div className="confLineS">
            <p className="confBoldS">Address: </p>
            <div className="locationConf">
              <p className="confValueS">{location}</p>
            </div>
          </div>
          <div className="confLineS">
            <p className="confBoldS">Start Date: </p>
            <p className="confValueS">{dateFormat(new Date(startDateTime))}</p>
          </div>
          <div className="confLineS">
            <p className="confBoldS">End Date: </p>
            <p className="confValueS">{dateFormat(new Date(endDateTime))}</p>
          </div>
          <div className="confLineS">
            <p className="confBoldS">Start Time: </p>
            <p className="confValueS">
              {new Date(startDateTime).toLocaleTimeString('en-US', {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          <div className="confLineS">
            <span className="confBoldS">End Time: </span>
            <p className="confValueS">
              {new Date(endDateTime).toLocaleTimeString('en-US', {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          {adminCheck || ownerCheck || coordCheck ? (
            <div className="flex jContentSA singleButtonRow">
              <Link to={`/myEvents/${props.singleEvent.id}/guestList`}>
                <button className="button MGLButton">Manage Guest List</button>
              </Link>
              <Link to={`/myEvents/${props.singleEvent.id}/createActivity`}>
                <button className="button CAButtonS">Create Activity</button>
              </Link>
            </div>
          ) : (
            <div className="flex jContentC singleButtonRow">
              <Link to={`/myEvents/${props.singleEvent.id}/guestList`}>
                <button className="button MGLButton">Guest List</button>
              </Link>
            </div>
          )}

          <div className="flex column aItemsC FSInherit">
            <h2 className="singleALTitle">
              {props.singleEvent.eventName}'s Activities
            </h2>
            <div
              id="activitiesContainer"
              className="flex column aItemsC FSInherit"
            >
              {props.allActivities.length ? (
                props.allActivities.map((activity, idx) => {
                  count === 3 ? (count = 1) : ++count;
                  return (
                    <div
                      className={`singleActivityRow ${colors[count]} flex column aItemsC FSInherit`}
                      key={idx}
                    >
                      <Link
                        to={`/myevents/${activity.EventId}/activities/${activity.id}`}
                        key={activity.id}
                      >
                        <h4 className="SEActivityTitle">
                          {activity.activityName}
                        </h4>
                      </Link>
                      {adminCheck || ownerCheck || coordCheck ? (
                        <div className="flex jContentSB w100 FSInherit">
                          <Link
                            to={`/myEvents/${activity.EventId}/activities/${activity.id}/update`}
                          >
                            <button className="button ALButton FSInherit">
                              <FontAwesomeIcon
                                className="fontAwesomeLink AListIcon"
                                icon={faWrench}
                                style={{ width: '5em', height: 'auto' }}
                              />
                            </button>
                          </Link>
                          <button
                            className="button ALButton"
                            onClick={() => {
                              setActivityToDelete(activity);
                              openCloseActivity();
                            }}
                          >
                            <FontAwesomeIcon
                              className="fontAwesomeLink AListIcon"
                              icon={faTrash}
                              color="lime"
                              style={{
                                width: '4em',
                                height: 'auto',
                              }}
                            />
                          </button>
                        </div>
                      ) : (
                        false
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="NoActivities">No activities planned yet!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapState = (state) => ({
  auth: state.authReducer,
  userEvents: state.allEventsReducer.userEvents,
  singleEvent: state.eventReducer,
  allActivities: state.allActivitiesReducer,
});

const mapDispatch = (dispatch) => ({
  getEvent: (eventId) => dispatch(getEvent(eventId)),
  removeEvent: (eventId) => dispatch(removeEvent(eventId)),
  getActivities: (eventId) => dispatch(getActivities(eventId)),
  removeActivity: (eventId, activityId) =>
    dispatch(removeActivity(eventId, activityId)),
  getUserEvents: (id) => dispatch(getUserEvents(id)),
});

export default connect(mapState, mapDispatch)(SingleEvent);
