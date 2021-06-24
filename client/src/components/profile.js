import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser, deleteUser, me } from '../store';
import { Link } from 'react-router-dom';
import history from '../history';
import '../styles/profile.css';

const Profile = (props) => {
  const goToUpdateProfile = () => {
    props.history.push('/updateprofile');
  };

  // const [profile, setProfile] = useState(props.auth);

  // props.getUser(props.auth.id);
  useEffect(() => {
    props.me();
  }, []);
  return (
    <div id="profileContainer" className="background2Up flex column aItemsC">
      <button
        type="button"
        className="button updateProfile yellowFade"
        id="updateProfileButton"
        onClick={goToUpdateProfile}
      >
        Update Profile
      </button>
      <h1 id="profileNameTitle">{`${props.auth.firstName}'s Profile`}</h1>
      <div id="profileInfoBalloonWrapper">
        <img src="largeBalloon.png" id="profileBalloon" />
        <div id="profileInfoHolder">
          <h4 className="profileDataType">
            Email:{' '}
            <span className="light profileDataValue">{props.auth.email}</span>
          </h4>
          <h4 className="profileDataType">
            Dietary Restrictions:{' '}
            {props.auth.dietaryRestrictions ? (
              <span className="light profileDataValue">
                {props.auth.dietaryRestrictions}
              </span>
            ) : (
              <span className="light profileDataValueNone">None</span>
            )}
          </h4>
          <h4 className="profileDataType">
            Special Requests:{' '}
            {props.auth.specialRequests ? (
              <span className="light profileDataValue">
                {props.auth.specialRequests}
              </span>
            ) : (
              <span className="light profileDataValueNone">None</span>
            )}
          </h4>
          <h4 className="profileDataType">
            Nickname:{' '}
            {props.auth.alias ? (
              <span className="light profileDataValue">{props.auth.alias}</span>
            ) : (
              <span className="light profileDataValueNone">None</span>
            )}
          </h4>
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => ({
  auth: state.authReducer,
});

const mapDispatch = (dispatch) => ({
  me: () => dispatch(me()),
  getUser: (userId) => dispatch(getUser(userId)),
  deleteUser: (userId) => dispatch(deleteUser(userId)),
});

export default connect(mapState, mapDispatch)(Profile);
