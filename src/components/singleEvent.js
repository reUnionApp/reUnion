import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getEvent, removeEvent, getActivities, removeActivity } from '../store';
import { Link } from 'react-router-dom';
import { GuestList } from './index';
import { faWrench, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/single.css';
import '../styles/create.css';

const colors = {
  1: 'tealFade',
  2: 'pinkFade',
  3: 'yellowFade',
};

let count = 0;

const SingleEvent = (props) => {
  const id = props.auth.id;
  const eventId = props.match.params.eventId;

  const deleteSelectedEvent = async (eventId) => {
    await props.removeEvent(eventId);
    props.history.push(`/myEvents`);
  };

  const deleteSelectedActivity = async (eventId, activityId) => {
    await props.removeActivity(eventId, activityId);
    await props.getActivities(eventId);
  };

  useEffect(() => {
    props.getEvent(eventId);
    props.getActivities(props.match.params.eventId);
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

  return (
    <div className=" singleContainer flex column aItemsC background1Up">
      <div className=" singleColumn flex column">
        <h1
          style={{
            alignSelf: 'center',
            textAlign: 'center',
            margin: '19px 0px 25px 0px',
          }}
        >
          {eventName}
        </h1>
        <div className="confLine">
          <p className="confBold">Event Type: </p>
          <p className="confValue">{eventType}</p>
        </div>
        <div className="confLine">
          <p className="confBold">Host: </p>
          <p className="confValue">{owner}</p>
        </div>
        {/* <div className="confLine">
          <p className="confBold">Coordinator: </p>
          <p className="confValue">{coordinator}</p>
        </div> */}
        <div
          className="confLine"
          style={{ maxWidth: '100%', alignItems: 'flex-start' }}
        >
          <p className="confBold">Description: </p>
          <div id="descriptionConfContainer">
            <p className="confValue">{description}</p>
          </div>
        </div>
        <div className="confLine">
          <p className="confBold">Address: </p>
          <div id="locationConf">
            <p className="confValue">{location}</p>
          </div>
        </div>
        <div className="confLine">
          <p className="confBold">Start Date: </p>
          <p className="confValue">{dateFormat(new Date(startDateTime))}</p>
        </div>
        <div className="confLine">
          <p className="confBold">End Date: </p>
          <p className="confValue">{dateFormat(new Date(endDateTime))}</p>
        </div>
        <div className="confLine">
          <p className="confBold">Start Time: </p>
          <p className="confValue">
            {new Date(startDateTime).toLocaleTimeString('en-US', {
              hour12: true,
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <div className="confLine">
          <span className="confBold">End Time: </span>
          <p className="confValue">
            {new Date(endDateTime).toLocaleTimeString('en-US', {
              hour12: true,
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        {adminCheck && ownerCheck && coordCheck && adminCheck || ownerCheck || coordCheck ? (
          <div className="flex jContentSA" style={{ margin: '36px 0px' }}>
            <Link to={`/myEvents/${props.singleEvent.id}/guestList`}>
              <button
                className="button"
                style={{
                  backgroundColor: '#38c1d38c',
                  width: '130px',
                  height: '60px',
                }}
              >
                Manage Guest List
            </button>
            </Link>
            <Link
              to={`/myEvents/${props.singleEvent.id}/createActivity`}
              style={{ margin: '0px 0px 0px 15px' }}
            >
              <button
                className="button"
                style={{
                  backgroundColor: '#ffc4008c',
                  width: '130px',
                  height: '60px',
                }}
              >
                Create Activity
            </button>
            </Link>
          </div>
        ) : (
            <div className="flex jContentC" style={{ margin: '36px 0px' }}>
              <Link to={`/myEvents/${props.singleEvent.id}/guestList`}>
                <button
                  className="button"
                  style={{
                    backgroundColor: '#38c1d38c',
                    width: '130px',
                    height: '60px',
                  }}
                >
                  Guest List
                </button>
              </Link>
            </div>
          )}

        <div className="flex column aItemsC">
          <h2
            style={{
              alignSelf: 'center',
              textAlign: 'center',
              margin: '19px 0px 0px 0px',
              padding: '0px 0px 25px 0px',
            }}
          >
            {props.singleEvent.eventName}'s Activities
          </h2>
          <div id="activitiesContainer" className="flex column aItemsC">
            {props.allActivities.length ? (
              props.allActivities.map((activity, idx) => {
                count === 3 ? (count = 1) : ++count;
                return (
                  <div
                    className={`singleActivityRow ${colors[count]} flex column aItemsC`}
                    key={idx}
                  >
                    <div className="SEActivityWrapper">
                      <h4 style={{ fontSize: '16px', textAlign: 'center' }}>
                        <Link
                          to={`/myevents/${activity.EventId}/activities/${activity.id}`}
                          key={activity.id}
                        >
                          {activity.activityName}
                        </Link>
                      </h4>
                    </div>
                    {adminCheck && ownerCheck && coordCheck && adminCheck || ownerCheck || coordCheck ? (
                      <div className="flex jContentSB w100">
                        <Link
                          to={`/myEvents/${activity.EventId}/activities/${activity.id}/update`}
                        >
                          <button className="button ALButton">
                            <FontAwesomeIcon
                              className="fontAwesomeLink AListIcon"
                              icon={faWrench}
                              style={{ width: '32px', height: 'auto' }}
                            />
                          </button>
                        </Link>
                        <button
                          className="button ALButton"
                          onClick={() =>
                            deleteSelectedActivity(eventId, activity.id)
                          }
                        >
                          <FontAwesomeIcon
                            className="fontAwesomeLink AListIcon"
                            icon={faTrash}
                            color="lime"
                            style={{
                              width: '30px',
                              height: 'auto',
                            }}
                          />
                        </button>
                      </div>
                    ) : false}
                  </div>
                );
              })
            ) : (
                <p style={{ textAlign: 'center' }}>No activities planned yet!</p>
              )}
          </div>
          <Link to={`/myEvents/${eventId}/update`}>
            {adminCheck && ownerCheck && coordCheck && adminCheck || ownerCheck || coordCheck ? (
              <button
                className="button bottomSE"
                style={{
                  backgroundColor: '#ffc4008c',
                }}
              >
                Update Event
              </button>
            ) : false}
          </Link>
          {adminCheck && ownerCheck && adminCheck || ownerCheck ? (
            <button
              className="button bottomSE"
              style={{ backgroundColor: '#e400678e' }}
              onClick={() => deleteSelectedEvent(props.singleEvent.id)}
            >
              Delete Event
            </button>
          ) : false}
        </div>
      </div>
    </div>
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
});

export default connect(mapState, mapDispatch)(SingleEvent);
