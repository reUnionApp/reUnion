import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getUserEvents } from "../store";
import { Link } from "react-router-dom";
import history from "../history";
import "../styles/myEvents.css";

const MyEvents = (props) => {
  console.log("props in myEvents", props);
  console.log("props.userEvent", props.userEvents);
  const id = props.user.id;
  useEffect(() => {
    props.getUserEvents(id);
  }, []);

  return (
    <div className="flex aItemsC column" style={{ backgroundColor: "yellow" }}>
      <h2>
        You have {props.userEvents.length}{" "}
        {props.userEvents.length > 1 ? "events" : "event"}
      </h2>
      {props.userEvents &&
        props.userEvents.map((event) => {
          return (
            <div
              className="flex column aItemsC jContentC eventBox"
              key={event.id}
            >
              <Link to={`/myEvents/${event.id}`}>
                <h3>{event.eventName}</h3>
              </Link>
            </div>
          );
        })}
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
