import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getEvent, removeEvent, getActivities, removeActivity } from '../store';
import { Link } from 'react-router-dom';
import { GuestList } from './index';
import '../styles/singleEvent.css';
import '../styles/create.css';

const SingleEvent = (props) => {
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

    return month + "/" + day + "/" + year;
  };

  const {
    eventName,
    eventType,
    owner,
    coordinator,
    description,
    location,
    startDateTime,
    endDateTime,
  } = props.singleEvent;

  return (
    <div id="singleEventContainer" className="flex column aItemsC">
      <div id="singleEventColumn" className="flex column">
        <h1
          style={{
            alignSelf: "center",
            textDecoration: "underline",
            textAlign: "center",
            margin: "19px 0px 25px 0px",
          }}
        >
          {eventName}
        </h1>
        <div className="eventConfLine">
          <p className="eventConfBold">Event Type: </p>
          <p className="eventConfValue">{eventType}</p>
        </div>
        <div className="eventConfLine">
          <p className="eventConfBold">Host: </p>
          <p className="eventConfValue">{owner}</p>
        </div>
        <div className="eventConfLine">
          <p className="eventConfBold">Coordinator: </p>
          <p className="eventConfValue">{coordinator}</p>
        </div>
        <div
          className="eventConfLine"
          style={{ maxWidth: "100%", alignItems: "flex-start" }}
        >
          <p className="eventConfBold">Description: </p>
          <div id="descriptionConfContainer">
            <p className="eventConfValue">{description}</p>
          </div>
        </div>
        <div className="eventConfLine">
          <p className="eventConfBold">Location: </p>
          <div id="eventLocationConf">
            <p className="eventConfValue">{location}</p>
          </div>
        </div>
        <div className="eventConfLine">
          <p className="eventConfBold">Start Date: </p>
          <p className="eventConfValue">
            {dateFormat(new Date(startDateTime))}
          </p>
        </div>
        <div className="eventConfLine">
          <p className="eventConfBold">End Date: </p>
          <p className="eventConfValue">{dateFormat(new Date(endDateTime))}</p>
        </div>
        <div className="eventConfLine">
          <p className="eventConfBold">Start Time: </p>
          <p className="eventConfValue">
            {new Date(startDateTime).toLocaleTimeString("en-US", {
              hour12: true,
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="eventConfLine">
          <span className="eventConfBold">End Time: </span>
          <p className="eventConfValue">
            {new Date(endDateTime).toLocaleTimeString("en-US", {
              hour12: true,
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="flex jContentSA" style={{ margin: "36px 0px" }}>
          <Link to={`/myEvents/${props.singleEvent.id}/guestList`}>
            <button
              className="button"
              style={{
                backgroundColor: "#38c1d38c",
                width: "130px",
                height: "60px",
              }}
            >
              Manage Guest List
            </button>
          </Link>

          <Link
            to={`/myEvents/${props.singleEvent.id}/createActivity`}
            style={{ margin: "0px 0px 0px 15px" }}
          >
            <button
              className="button"
              style={{
                backgroundColor: "#ffc4008c",
                width: "130px",
                height: "60px",
              }}
            >
              Create Activity
            </button>
          </Link>
        </div>
        <div className="flex column aItemsC">
          <h2
            style={{
              alignSelf: "center",
              textDecoration: "underline",
              textAlign: "center",
              margin: "19px 0px 0px 0px",
              padding: "0px 0px 25px 0px",
              borderBottom: "1px solid black",
            }}
          >
            {props.singleEvent.eventName}'s Activities
          </h2>
          <div id="activitiesContainer">
            {props.allActivities.length ? (
              props.allActivities.map((activity, idx) => {
                return (
                  <div className="singleActivityRow" key={idx}>
                    <h4 style={{ fontSize: "16px" }}>
                      <Link
                        to={`/myevents/${activity.EventId}/activities/${activity.id}`}
                        key={activity.id}
                      >
                        {activity.activityName}
                      </Link>
                    </h4>
                    <div className="flex column aItemsC">
                      <button
                        className="button"
                        style={{
                          margin: "0px 0px 15px 0px",
                          padding: "5px 15px",
                          backgroundColor: "#38c1d38c",
                        }}
                      >
                        <Link
                          to={`/myEvents/${activity.EventId}/activities/${activity.id}/update`}
                        >
                          Update
                        </Link>
                      </button>
                      <button
                        className="button"
                        style={{
                          padding: "5px 15px",
                          backgroundColor: "#e400678e",
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

          <button
            className="button deleteSE"
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
