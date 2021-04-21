import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser, deleteUser } from '../store';
import { Link } from 'react-router-dom';
import history from '../history';
import '../styles/profile.css';

const profile = (props) => {
  const goToUpdateProfile = () => {
    props.history.push('/updateprofile');
  };
  return (
    <>
      <hr />
      <div className="w100 flex jContentSB aItemsC">
        <h1
          style={{ marginLeft: '15px' }}
        >{`${props.user.firstName}'s Profile`}</h1>
        <button
          style={{ marginRight: '15px' }}
          type="button"
          className="button updateProfile yellow"
          onClick={goToUpdateProfile}
        >
          Update Profile
        </button>
      </div>
      <div style={{ margin: '36px 0px 36px 36px' }}>
        <h4>
          Email: <span className="light">{props.user.email}</span>
        </h4>
        <h4>
          Dietary Restrictions:{' '}
          {props.user.dietaryRestrictions ? (
            <span className="light">{props.user.dietaryRestrictions}</span>
          ) : (
            <span className="light">None</span>
          )}
        </h4>
        <h4>
          Special Requests:{' '}
          {props.user.specialRequests ? (
            <span className="light">{props.user.specialRequests}</span>
          ) : (
            <span className="light">None</span>
          )}
        </h4>
      </div>
    </>
  );
};

const mapState = (state) => ({
  user: state.authReducer,
  userEvents: state.allEventsReducer.userEvents,
});

const mapDispatch = (dispatch) => ({
  deleteUser: (userId) => dispatch(deleteUser(userId)),
});

export default connect(mapState, mapDispatch)(profile);
