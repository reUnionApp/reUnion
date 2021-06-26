import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser, deleteUser, me } from '../store';
import { Link } from 'react-router-dom';
import '../styles/profile.css';

const Profile = (props) => {
  useEffect(() => {
    props.me();
  }, []);

  return (
    <div id="profileContainer" className="background2Up flex column aItemsC">
      <Link to="/updateprofile" id="updateProfileButton">
        <button type="button" className="button updateProfile yellowFade">
          Update Profile
        </button>
      </Link>
      <h1 id="profileNameTitle">{`${props.auth.firstName}'s Profile`}</h1>
      <div id="profileInfoBalloonWrapper">
        <img src="largeBalloon.png" id="profileBalloon" />
        <svg id="profileInfoHolder" viewBox="0 0 430 400">
          <path id="PBalloonCurve1" d="M60,75 A 9 3 1 1 1 380 75" fill="none" />
          <path
            id="PBalloonCurve2"
            d="M15,173 A 20 4 1 1 1 420 173"
            fill="none"
          />
          <path
            id="PBalloonCurve3"
            d="M15,237 A 20 4 1 1 0 420 237"
            fill="none"
          />
          <path
            id="PBalloonCurve4"
            d="M40,335 A 9 3 1 1 0 390 335"
            fill="none"
          />
          <text>
            <textPath
              alignmentBaseline="top"
              href="#PBalloonCurve1"
              className="profileDataType"
              startOffset="50%"
              textAnchor="middle"
            >
              Email:{' '}
              <tspan className="light profileDataValue">
                {props.auth.email}
              </tspan>
            </textPath>
            <textPath
              alignmentBaseline="top"
              href="#PBalloonCurve2"
              className="profileDataType"
              startOffset="50%"
              textAnchor="middle"
            >
              Dietary Restrictions:{' '}
              {props.auth.dietaryRestrictions ? (
                <tspan className="light profileDataValue">
                  {props.auth.dietaryRestrictions}
                </tspan>
              ) : (
                <tspan className="light profileDataValueNone">None</tspan>
              )}
            </textPath>
            <textPath
              alignmentBaseline="top"
              href="#PBalloonCurve3"
              className="profileDataType"
              startOffset="50%"
              textAnchor="middle"
            >
              Special Requests:{' '}
              {props.auth.specialRequests ? (
                <tspan className="light profileDataValue">
                  {props.auth.specialRequests}
                </tspan>
              ) : (
                <tspan className="light profileDataValueNone">None</tspan>
              )}
            </textPath>
            <textPath
              alignmentBaseline="top"
              href="#PBalloonCurve4"
              className="profileDataType"
              startOffset="50%"
              textAnchor="middle"
            >
              Nickname:{' '}
              {props.auth.alias ? (
                <tspan className="light profileDataValue">
                  {props.auth.alias}
                </tspan>
              ) : (
                <tspan className="light profileDataValueNone">None</tspan>
              )}
            </textPath>
          </text>
        </svg>
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
