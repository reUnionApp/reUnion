import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getEvent } from '../store';
import { Link } from 'react-router-dom';

const SingleEvent = (props) => {
  console.log('props in myEvents', props);
  console.log('props.userEvent', props.userEvents);
  const id = props.user.id;
  useEffect(() => {
    props.getEvent(1);
  }, []);

  return (
    <div>
      <ul>{props.singleEvent.eventName}</ul>
      <ul>{props.singleEvent.eventType}</ul>
      <ul>{props.singleEvent.owner}</ul>
      <ul>{props.singleEvent.coordinator}</ul>
      <ul>{props.singleEvent.description}</ul>
      <ul>{props.singleEvent.location}</ul>
      <ul>{props.singleEvent.startDate}</ul>
      <ul>{props.singleEvent.endDate}</ul>
      <ul>{props.singleEvent.startTime}</ul>
      <ul>{props.singleEvent.endTime}</ul>
    </div>
  );
};

const mapState = (state) => ({
  user: state.authReducer,
  singleEvent: state.eventReducer,
});

const mapDispatch = (dispatch) => ({
  getEvent: (id) => dispatch(getEvent(id)),
});

export default connect(mapState, mapDispatch)(SingleEvent);
