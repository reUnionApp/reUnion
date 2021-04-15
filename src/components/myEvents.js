import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getUserEvents } from "../store";
import { Link } from "react-router-dom";
import history from "../history";

const MyEvents = (props) => {
  console.log("props in myEvents", props);
  console.log("props.userEvent", props.userEvents);
  const id = props.user.id;
  useEffect(() => {
    props.getUserEvents(id);
  }, []);

  return (
    <div>
      <h2>
        You have {props.userEvents.length}{" "}
        {props.userEvents.length > 1 ? "events" : "event"}
      </h2>
      <ul>
        {props.userEvents &&
          props.userEvents.map((event) => {
            return (
              <div key={event.id}>
                <Link to={`/myEvents/${event.id}`}>
                  <li>{event.eventName}</li>
                </Link>
              </div>
            );
          })}
      </ul>
      <Link to="/createEvent">Create Event</Link>
    </div>
  );
};

const mapState = (state) => ({
  user: state.authReducer,
  userEvents: state.allEventsReducer.userEvents,
});

const mapDispatch = (dispatch) => ({
  getUserEvents: (id) => dispatch(getUserEvents(id)),
});

export default connect(mapState, mapDispatch)(MyEvents);
