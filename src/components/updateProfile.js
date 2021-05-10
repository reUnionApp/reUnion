import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser, deleteUser, updateUser } from '../store';
import { Link } from 'react-router-dom';
import history from '../history';
import '../styles/updateProfile.css';

const UpdateProfile = (props) => {
  if (props.user.specialRequests === null) {
    props.user.specialRequests = '';
  }

  if (props.user.dietaryRestrictions === null) {
    props.user.dietaryRestrictions = '';
  }
  if (Array.isArray(props.user.dietaryRestrictions)) {
    props.user.dietaryRestrictions = props.user.dietaryRestrictions[0];
  }

  if (props.user.alias === null) {
    props.user.alias = '';
  }

  const [user, updateUser] = useState({ ...props.user });

  // const [diet, updateDiet] = useState(props.user.dietaryRestrictions);

  const handleChange = (e) => {
    updateUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    props.updateUser(user);
    props.history.push('/profile');
  };

  return (
    <div style={{ margin: '75px 0px 0px 0px' }}>
      <div className="w100 flex jContentSB aItemsC">
        <h1
          style={{ marginLeft: '15px' }}
        >{`Update ${props.user.firstName}'s Profile`}</h1>
        <button
          style={{ marginRight: '15px' }}
          type="button"
          className="button updateProfile pink"
        >
          Delete Profile
        </button>
      </div>
      <form
        className="flex column aItemsFS"
        style={{ margin: '36px 0px 36px 36px' }}
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
            className="formInput"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="formLabInp">
          <label className="inputLabel" htmlFor="dietaryRestrictions">
            Dietary Restrictions:
          </label>
          <select
            id="dietaryRestrictions"
            className="formInput"
            value={user.dietaryRestrictions}
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
            className="formInput"
            value={user.specialRequests}
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
            className="formInput"
            value={user.alias}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="button teal"
          style={{ margin: '36px 0px 0px 0px' }}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

const mapState = (state) => ({
  user: state.userReducer,
  userEvents: state.allEventsReducer.userEvents,
});

const mapDispatch = (dispatch) => ({
  deleteUser: (userId) => dispatch(deleteUser(userId)),
  updateUser: (user) => dispatch(updateUser(user)),
});

export default connect(mapState, mapDispatch)(UpdateProfile);
