import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getActivity, getEvent, removeActivity } from '../store';
import { Link } from 'react-router-dom';

const SingleActivity = (props) => {
  const id = props.user.id;
  const eventId = props.match.params.eventId;

  const deleteSelectedActivity = async (eventId, activityId) => {
    await props.removeActivity(eventId, activityId);
  };

  useEffect(() => {
    props.getEvent(props.match.params.eventId);
    props.getActivity(
      props.match.params.eventId,
      props.match.params.activityId
    );
  }, []);

  console.log('propssssssss', props)

  const dateFormat = (date) => {
    let dateObj = date;
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    return month + '/' + day + '/' + year;
  };

  return (
    <div>
      <div style={{ margin: '0px 25px' }}>
        <h1>{props.singleEvent.eventName}</h1>
        <h5>{props.eventActivities.activityName}</h5>
      </div>
      <ul>{props.eventActivities.description}</ul>
      <ul>{props.eventActivities.location}</ul>
      <ul>{dateFormat(new Date(props.eventActivities.startDateTime))}</ul>
      <ul>{dateFormat(new Date(props.eventActivities.endDateTime))}</ul>
      <ul>
        {new Date(props.eventActivities.startDateTime).toLocaleTimeString(
          'en-US',
          {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
          }
        )}
      </ul>
      <ul>
        {new Date(props.eventActivities.endDateTime).toLocaleTimeString(
          'en-US',
          {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
          }
        )}
      </ul>
      <button>
        <Link
          to={`/myEvents/${eventId}/activities/${props.eventActivities.id}/update`}
        >
          Update
        </Link>
      </button>
      <button
        onClick={() =>
          deleteSelectedActivity(eventId, props.eventActivities.id)
        }
      >
        Delete
      </button>
    </div>
  );
};

const mapState = (state) => ({
  user: state.authReducer,
  eventActivities: state.activityReducer,
  singleEvent: state.eventReducer,
});

const mapDispatch = (dispatch) => ({
  getEvent: (id) => dispatch(getEvent(id)),
  getActivity: (eventId, activityId) =>
    dispatch(getActivity(eventId, activityId)),
  removeActivity: (eventId, activityId) =>
    dispatch(removeActivity(eventId, activityId)),
});

export default connect(mapState, mapDispatch)(SingleActivity);
