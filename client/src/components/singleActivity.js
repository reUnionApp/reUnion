import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { getActivity, getEvent, removeActivity } from '../store';
import { Link } from 'react-router-dom';
import '../styles/create.css';
import '../styles/single.css';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteActivity from './deleteActivity';

const SingleActivity = (props) => {
  const id = props.auth.id;
  const eventId = props.match.params.eventId;

  const deleteSelectedActivity = async (eventId, activityId) => {
    openCloseActivity();
    await props.removeActivity(eventId, activityId);
  };

  useEffect(() => {
    props.getEvent(props.match.params.eventId);
    props.getActivity(
      props.match.params.eventId,
      props.match.params.activityId
    );
  }, []);

  const dateFormat = (date) => {
    let dateObj = date;
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    return month + '/' + day + '/' + year;
  };

  const { activityName, description, location, startDateTime, endDateTime } =
    props.eventActivities;

  let adminCheck;
  let ownerCheck;
  let coordCheck;

  if (props.userEvents) {
    const eventNum = Number(eventId);
    let target = 0;
    for (let i = 0; i < props.userEvents.length; i++) {
      let targetEvent = props.userEvents[i];
      if (targetEvent.id === eventNum) {
        target = i;
      }
    }

    if (props.userEvents[target]) {
      adminCheck = props.auth.isAdmin;
      ownerCheck = props.userEvents[target].UserEvent.isOwner;
      coordCheck = props.userEvents[target].UserEvent.isCoordinator;
    }
  }

  const DSA = useRef(null);

  const openCloseActivity = () => {
    if (DSA.current.classList.contains('DSAClosed')) {
      DSA.current.classList.remove('DSAClosed');
      DSA.current.classList.add('DSAOpen');
    } else {
      DSA.current.classList.remove('DSAOpen');
      DSA.current.classList.add('DSAClosed');
    }
  };

  return (
    <>
      <div
        className="deleteSingleActivity DSAClosed flex jContentC aItemsC"
        ref={DSA}
      >
        <DeleteActivity
          openCloseActivity={openCloseActivity}
          deleteActivity={deleteSelectedActivity}
          singleEvent={props.singleEvent}
          activityToDelete={props.eventActivities}
          history={props.history}
        />
      </div>
      <div className="singleMaster singleContainer flex column aItemsC background3Down">
        <div className="singleTopRow flex jContentC w95">
          {adminCheck || ownerCheck || coordCheck ? (
            <Link
              to={`/myEvents/${eventId}/activities/${props.eventActivities.id}/update`}
            >
              <button className="button updateEventS">Update Activity</button>
            </Link>
          ) : (
            <button className="button updateEventSBlank">
              (Update Activity)
            </button>
          )}
          <Link
            to={`/myEvents/${props.singleEvent.id}`}
            className="singleActivityLinkWrapper"
          >
            <button className="singleActivityTitle button">
              {props.singleEvent.eventName}
            </button>
          </Link>
          {adminCheck || ownerCheck || coordCheck ? (
            <button
              className="button deleteEventS"
              onClick={() => openCloseActivity()}
            >
              Delete Activity
            </button>
          ) : (
            <button className="button deleteEventSBlank">
              (Delete Activity)
            </button>
          )}
        </div>
        <div className="singleWrapper singleColumn flex column SADetailsSpacer">
          <div className="confLineS">
            <p className="confBoldS">Activity: </p>
            <p className="confValueS" style={{ textAlign: 'end' }}>
              {activityName}
            </p>
          </div>
          <div
            className="confLineS"
            style={{ maxWidth: '100%', alignItems: 'flex-start' }}
          >
            <p className="confBoldS">Description: </p>
            {description && description.length ? (
              <div className="descriptionConfContainerS">
                <p className="confValueS">{description}</p>
              </div>
            ) : (
              false
            )}
          </div>
          <div className="confLineS">
            <p className="confBoldS">Address: </p>
            <div className="locationConf">
              <p className="confValueS">{location}</p>
            </div>
          </div>
          <div className="confLineS">
            <p className="confBoldS">Start Date: </p>
            <p className="confValueS">{dateFormat(new Date(startDateTime))}</p>
          </div>
          <div className="confLineS">
            <p className="confBoldS">End Date: </p>
            <p className="confValueS">{dateFormat(new Date(endDateTime))}</p>
          </div>
          <div className="confLineS">
            <p className="confBoldS">Start Time: </p>
            <p className="confValueS">
              {new Date(startDateTime).toLocaleTimeString('en-US', {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          <div className="confLineS">
            <span className="confBoldS">End Time: </span>
            <p className="confValueS">
              {new Date(endDateTime).toLocaleTimeString('en-US', {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          {(adminCheck || ownerCheck || coordCheck) && (
            <div className="flex jContentC w100 singleButtonRow">
              <Link to={`/myEvents/${props.singleEvent.id}/createActivity`}>
                <button className="button CNAButton">
                  Create New Activity
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const mapState = (state) => ({
  auth: state.authReducer,
  userEvents: state.allEventsReducer.userEvents,
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
