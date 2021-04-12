import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserEvents } from '../store';
import history from '../history';


const MyEvents = (props) => {
  console.log('props in myEvents', props)
  console.log('props.userEvent', props.userEvents)
  const id = props.user.id;
  useEffect(() => {
    props.getUserEvents(id);
  }, []);


  return (
    <div>
      <h2>You have {props.userEvents.length} events</h2>
      <ul>
        {props.userEvents && props.userEvents.map((event) => {
          return <li key={event.id}>{event.eventName}</li>
        })}
      </ul>
    </div>
  )
}

const mapState = (state) => ({
  user: state.authReducer,
  userEvents: state.eventsReducer.userEvents
});

const mapDispatch = (dispatch) => ({
  getUserEvents: (id) => dispatch(getUserEvents(id))
});

export default connect(mapState, mapDispatch)(MyEvents);
