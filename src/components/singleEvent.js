import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getEvent, removeEvent, getActivities, removeActivity } from '../store';
import { Link } from 'react-router-dom';

const SingleEvent = (props) => {
  console.log('PROPS IN SINGLE EVENT', props);
  const id = props.user.id;
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

  return (
    <div>
      <ul>{props.singleEvent.eventName}</ul>
      <ul>{props.singleEvent.eventType}</ul>
      <ul>{props.singleEvent.owner}</ul>
      <ul>{props.singleEvent.coordinator}</ul>
      <ul>{props.singleEvent.description}</ul>
      <ul>{props.singleEvent.location}</ul>
      <ul>{dateFormat(new Date(props.singleEvent.startDateTime))}</ul>
      <ul>{dateFormat(new Date(props.singleEvent.endDateTime))}</ul>
      <ul>
        {new Date(props.singleEvent.startDateTime).toLocaleTimeString('en-US', {
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
        })}
      </ul>
      <ul>
        {new Date(props.singleEvent.endDateTime).toLocaleTimeString('en-US', {
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
        })}
      </ul>
      <button onClick={() => deleteSelectedEvent(props.singleEvent.id)}>
        Delete
      </button>
      <div>
        <h2>{props.singleEvent.eventName}'s Activities</h2>
        {props.allActivities.map((activity) => {
          return (
            <div>
              <h4>
                <Link
                  to={`/myevents/${activity.EventId}/activities/${activity.id}`}
                  key={activity.id}
                >
                  {activity.activityName}
                </Link>
              </h4>
              <button>
                <Link
                  to={`/myEvents/${activity.EventId}/activities/${activity.id}/update`}
                >
                  Update
                </Link>
              </button>
              <button
                onClick={() => deleteSelectedActivity(eventId, activity.id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      <Link to={`/myEvents/${props.singleEvent.id}/createActivity`}>
        Create Activity
      </Link>
    </div>
  );
};

const mapState = (state) => ({
  user: state.authReducer,
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
