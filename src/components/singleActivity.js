import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getActivity, getEvent, removeActivity } from '../store';
import { Link } from 'react-router-dom';
import '../styles/create.css';
import '../styles/single.css';

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

  console.log('propssssssss', props)

  const dateFormat = (date) => {
    let dateObj = date;
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    return month + '/' + day + '/' + year;
  };

  const {
    activityName,
    description,
    location,
    startDateTime,
    endDateTime
  } = props.eventActivities;

  return (
    <div className="singleContainer flex column aItemsC">
      <div className="singleColumn flex column">
        <h1 style={{
          alignSelf: 'center',
          textDecoration: 'underline',
          textAlign: 'center',
          margin: '19px 0px 25px 0px',
        }}
        >
          {props.singleEvent.eventName}
        </h1>
        <div className="confLine">
          <p className="confBold">Activity: </p>
          <p className="confValue" style={{ textAlign: 'end' }}>{activityName}</p>
        </div>
        <div
          className="confLine"
          style={{ maxWidth: '100%', alignItems: 'flex-start' }}
        >
          <p className="confBold">Description: </p>
          {console.log(description)}
          {description && description.length ? (
            <div id="descriptionConfContainer">
              <p className="confValue">{description}</p>
            </div>
          ) : false}
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
        <div className='flex jContentSB' style={{ margin: '20px 0px', }}>
          <button className="button"
            style={{
              width: '130px',
              height: '60px',
              backgroundColor: '#38c1d38c',
            }}>
            <Link
              to={`/myEvents/${eventId}/activities/${props.eventActivities.id}/update`}
            >
              Update Activity
        </Link>
          </button>
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
      </button>
      </div>
    </div>
  );
};

const mapState = (state) => ({
  auth: state.authReducer,
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
