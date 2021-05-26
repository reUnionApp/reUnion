import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getEvent, removeEvent, getActivities, removeActivity } from '../store';
import { Link } from 'react-router-dom';
import { GuestList } from './index';
import '../styles/single.css';
import '../styles/create.css';

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

  return (
    <div className=" singleContainer flex column aItemsC">
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
        <div className="flex column aItemsC">
          <h2
            style={{
              alignSelf: 'center',
              textAlign: 'center',
              margin: '19px 0px 0px 0px',
              padding: '0px 0px 25px 0px',
              borderBottom: '1px solid black',
            }}
          >
            {props.singleEvent.eventName}'s Activities
          </h2>
          <div id="activitiesContainer">
            {props.allActivities.length ? (
              props.allActivities.map((activity, idx) => {
                return (
                  <div className="singleActivityRow" key={idx}>
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
                    <div className="flex column aItemsC">
                      <button
                        className="button"
                        style={{
                          margin: '0px 0px 15px 0px',
                          padding: '5px 15px',
                          backgroundColor: '#38c1d38c',
                        }}
                      >
                        <Link
                          to={`/myEvents/${activity.EventId}/activities/${activity.id}/update`}
                        >
                          Update Activity
                        </Link>
                      </button>
                      <button
                        className="button"
                        style={{
                          padding: '5px 15px',
                          backgroundColor: '#e400678e',
                        }}
                        onClick={() =>
                          deleteSelectedActivity(eventId, activity.id)
                        }
                      >
                        Delete Activity
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
                <p style={{ textAlign: 'center' }}>No activities planned yet!</p>
              )}
          </div>
          <Link to={`/myEvents/${eventId}/update`}>
            <button
              className="button bottomSE"
              style={{
                backgroundColor: '#ffc4008c',
              }}
            >
              Update Event
            </button>
          </Link>
          <button
            className="button bottomSE"
            style={{ backgroundColor: '#e400678e' }}
            onClick={() => deleteSelectedEvent(props.singleEvent.id)}
          >
            Delete Event
          </button>
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
