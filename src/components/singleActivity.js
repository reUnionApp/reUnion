import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getActivity, getEvent, removeActivity } from '../store';
import { Link } from 'react-router-dom';
import '../styles/create.css';
import '../styles/single.css';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SingleActivity = (props) => {
  const id = props.auth.id;
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
      let targetEvent = props.userEvents[i]
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

  return (
    <div id='SAMaster' className="singleContainer flex column aItemsC background3Down">
      <div className="singleColumn flex column activityEventTitle">
        <h1>
          <Link className="link" to={`/myEvents/${props.singleEvent.id}`}>
            <FontAwesomeIcon
              className="fontAwesomeLink linkIcon"
              icon={faLink}
            />
            {props.singleEvent.eventName}
          </Link>
        </h1>
        <div className="confLine">
          <p className="confBold">Activity: </p>
          <p className="confValue" style={{ textAlign: 'end' }}>
            {activityName}
          </p>
        </div>
        <div
          className="confLine"
          style={{ maxWidth: '100%', alignItems: 'flex-start' }}
        >
          <p className="confBold">Description: </p>
          {description && description.length ? (
            <div id="descriptionConfContainer">
              <p className="confValue">{description}</p>
            </div>
          ) : (
              false
            )}
          {/* <div id="descriptionConfContainer">
            <p className="confValue">{description}</p>
          </div> */}
        </div>
        <div className="confLine">
          <p className="confBold">Address: </p>
          <div id="locationConf">
            <p className="confValue">{location}</p>
          </div>
        </div>
        <div className="confLine">
          <p className="confBold">Start Date: </p>
          <p className="confValue">{dateFormat(new Date(startDateTime))}</p>
        </div>
        <div className="confLine">
          <p className="confBold">End Date: </p>
          <p className="confValue">{dateFormat(new Date(endDateTime))}</p>
        </div>
        <div className="confLine">
          <p className="confBold">Start Time: </p>
          <p className="confValue">
            {new Date(startDateTime).toLocaleTimeString('en-US', {
              hour12: true,
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <div className="confLine">
          <span className="confBold">End Time: </span>
          <p className="confValue">
            {new Date(endDateTime).toLocaleTimeString('en-US', {
              hour12: true,
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        {adminCheck || ownerCheck || coordCheck ? (<><div className="flex jContentSB" style={{ margin: '20px 0px' }}>
          <Link
            to={`/myEvents/${eventId}/activities/${props.eventActivities.id}/update`}
          >
            <button
              className="button"
              style={{
                width: '130px',
                height: '60px',
                backgroundColor: '#38c1d38c',
              }}
            >
              Update Activity
            </button>
          </Link>
          <Link
            to={`/myEvents/${props.singleEvent.id}/createActivity`}
            style={{ margin: '0px 0px 0px 15px' }}
          >
            <button
              className="button"
              style={{
                backgroundColor: '#ffc4008c',
                width: '130px',
                height: '60px',
              }}
            >
              Create New Activity
            </button>
          </Link>
        </div>
          <button
            className="button bottomSE"
            style={{ backgroundColor: '#e400678e' }}
            onClick={() =>
              deleteSelectedActivity(eventId, props.eventActivities.id)
            }
          >
            Delete Activity
        </button> </>) : false}
      </div>
    </div>
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
