import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getActivities } from '../store';
import { Link } from 'react-router-dom';
import history from '../history';

function AllActivities(props) {
  useEffect(() => {
    props.getAllActivities(props.match.params.eventId);
  }, []);
  return (
    <div>
      <h2>
        You have {props.activities.length}{' '}
        {props.activities.length > 1 ? 'activities' : 'activity'}
      </h2>
      <ul>
        {props.activities &&
          props.activities.map((activity) => {
            return (
              <div key={activity.id}>
                <Link
                  to={`/myEvents/${props.match.params.eventId}/activities/${activity.id}`}
                >
                  <li>{activity.activityName}</li>
                </Link>
              </div>
            );
          })}
      </ul>
    </div>
  );
}

const mapState = (state) => ({
  auth: state.authReducer,
  userEvents: state.allEventsReducer.userEvents,
  activities: state.allActivitiesReducer,
});

const mapDispatch = (dispatch) => ({
  getAllActivities: (id) => dispatch(getActivities(id)),
});

export default connect(mapState, mapDispatch)(AllActivities);
