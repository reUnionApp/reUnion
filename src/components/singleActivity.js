import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getActivity, getEvent, removeActivity } from '../store';
import { Link } from 'react-router-dom';

const SingleActivity = (props) => {
  console.log('PROPS IN SINGLE ACTIVITY', props);
  const id = props.user.id;
  const eventId = props.match.params.eventId;

  const deleteSelectedActivity = async (eventId, activityId) => {
    await props.removeActivity(eventId, activityId);
  }

  useEffect(() => {
    props.getEvent(props.match.params.eventId);
    props.getActivity(
      props.match.params.eventId,
      props.match.params.activityId
    );
  }, []);

  return (
    <div>
      <div style={{ margin: '0px 25px' }}>
        <h1>{props.singleEvent.eventName}</h1>
        <h5>{props.eventActivities.activityName}</h5>
      </div>
      <ul>{props.eventActivities.description}</ul>
      <ul>{props.eventActivities.location}</ul>
      <ul>{props.eventActivities.startDate}</ul>
      <ul>{props.eventActivities.endDate}</ul>
      <ul>{props.eventActivities.startTime}</ul>
      <ul>{props.eventActivities.endTime}</ul>
      <button onClick={() => deleteSelectedActivity(eventId, props.eventActivities.id)}>Delete</button>
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
  removeActivity: (eventId, activityId) => dispatch(removeActivity(eventId, activityId))
});

export default connect(mapState, mapDispatch)(SingleActivity);
