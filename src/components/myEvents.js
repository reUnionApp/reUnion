import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../store';
import history from '../history';


const MyEvents = (props) => {
  useEffect(() => {
    props.getEvents();
  }, []);

  return (
    <div>
      <ul>
        {props.events.map((event) => {
          return <li>{event.eventName}</li>
        })}
      </ul>
    </div>
  )
}

const mapState = (state) => ({
  events: state.eventsReducer,
  user: state.authReducer,
});

const mapDispatch = (dispatch) => ({
  getEvents: () => dispatch(getEvents()),
});

export default connect(mapState, mapDispatch)(MyEvents);
