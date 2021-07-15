import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { getUser, deleteUser, updateUser, me } from '../store';
import { Link } from 'react-router-dom';
import history from '../history';
import DeleteProfile from './deleteProfile';
import '../styles/updateProfile.css';

const UpdateProfile = (props) => {
  const authUser = props.auth;
  const history = useHistory();

  if (props.auth.specialRequests === null) {
    props.auth.specialRequests = '';
  }

  if (props.auth.dietaryRestrictions === null) {
    props.auth.dietaryRestrictions = '';
  }

  if (props.auth.alias === null) {
    props.auth.alias = '';
  }

  const [userState, updateUserState] = useState({ ...props.auth });
  const [updateUserError, setUpdateUserError] = useState('');

  const handleChange = (e) => {
    updateUserState({ ...userState, [e.target.id]: e.target.value });
  };

  const deleteSingleUser = async (userId) => {
    console.log('in deleteSingleUser!!!!');
    await props.deleteUser(userId);
    history.go(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dbResponse = await props.updateUser(userState);
    if (dbResponse === 200) {
      setUpdateUserError('');
      props.me();
      props.history.push('/profile');
    } else {
      setUpdateUserError(dbResponse);
    }
  };

  const DP = useRef(null);

  const openClose = () => {
    if (DP.current.classList.contains('DPClosed')) {
      DP.current.classList.remove('DPClosed');
      DP.current.classList.add('DPOpen');
    } else {
      DP.current.classList.remove('DPOpen');
      DP.current.classList.add('DPClosed');
    }
  };

  return (
    <>
      <div
        className="deleteProfile DPClosed flex jContentC aItemsC"
        ref={DP}
        onClick={(e) => {
          if (e.target.type === undefined) {
            openClose();
          }
        }}
      >
        <DeleteProfile
          openClose={openClose}
          deleteSingleUser={deleteSingleUser}
          user={authUser}
        />
      </div>
      <div id="UPMaster" className="background3Down flex column aItemsC">
        <div className="w90 flex jContentSB" id="UPButtonRow">
          <Link to="/profile" id="UPBackButtonLink">
            <button
              type="button"
              id="UPBackButton"
              className="button updateProfile yellowFade"
            >
              Back to Profile
            </button>
          </Link>
          <button
            type="button"
            className="button updateProfile pinkFade"
            id="UPDeleteButton"
            onClick={() => {
              openClose();
            }}
          >
            Delete Profile
          </button>
        </div>
        <h1 id="UPTitle">{`Update ${props.auth.firstName}'s Profile`}</h1>
        <div id="UPErrorDiv">
          <p id="UPError">{updateUserError}</p>
        </div>
        <form
          className="flex column aItemsFS"
          id="UPForm"
          onSubmit={handleSubmit}
        >
          <div className="formLabInp">
            <label className="updateLabel" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="enter email..."
              className="UPFormInput"
              value={userState.email}
              onChange={handleChange}
            />
          </div>
          <div className="formLabInp">
            <label className="inputLabel" htmlFor="dietaryRestrictions">
              Dietary Restrictions:
            </label>
            <select
              id="dietaryRestrictions"
              className="UPFormInput"
              value={userState.dietaryRestrictions}
              onChange={handleChange}
            >
              <option value="none">none</option>
              <option value="gluten free">gluten free</option>
              <option value="vegan">vegan</option>
              <option value="vegetarian">vegetarian</option>
              <option value="no seafood">no seafood</option>
              <option value="peanut allergy">peanut allergy</option>
              <option value="kosher">kosher</option>
              <option value="halal">halal</option>
            </select>
          </div>
          <div className="formLabInp">
            <label className="inputLabel" htmlFor="specialRequests">
              Special Requests:
            </label>
            <input
              id="specialRequests"
              type="text"
              placeholder="Enter Special Requests"
              className="UPFormInput"
              value={userState.specialRequests}
              onChange={handleChange}
            />
          </div>
          <div className="formLabInp">
            <label className="inputLabel" htmlFor="alias">
              Nickname:
            </label>
            <input
              id="alias"
              type="text"
              placeholder="Enter a Nickname"
              className="UPFormInput"
              value={userState.alias}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="button tealFade" id="UPSubmitButton">
            Update Profile
          </button>
        </form>
      </div>
    </>
  );
};

const mapState = (state) => ({
  auth: state.authReducer,
});

const mapDispatch = (dispatch) => ({
  deleteUser: (userId) => dispatch(deleteUser(userId)),
  updateUser: (user) => dispatch(updateUser(user)),
  me: () => dispatch(me()),
});

export default connect(mapState, mapDispatch)(UpdateProfile);
