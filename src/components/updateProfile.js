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

  props.user.dietaryRestrictions = props.user.dietaryRestrictions[0];

  if (props.user.alias === null) {
    props.user.alias = '';
  }
  console.log('props.user --->', props.user);

  const [user, updateUser] = useState({ ...props.user });

  const [diet, updateDiet] = useState(props.user.dietaryRestrictions);

  const handleChange = (e) => {
    updateUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('email--->', e.target.email.value);
    console.log('diet --->', e.target.dietaryRestrictions.value);
    console.log('special R --->', e.target.specialRequests.value);
    console.log('nickname--->', e.target.alias.value);

    props.updateUser(user);
  };

  console.log('user state', user);

  console.log(
    'user.dietaryRestrictions--->',
    user.dietaryRestrictions === 'gluten free'
  );

  let test = 'gluten free';
  let stateDiet = user.dietaryRestrictions;

  console.log('test--->', test);
  console.log('stateDiet--->', stateDiet);
  console.log(test === stateDiet);

  console.log('new diet state --->', diet);

  return (
    <>
      <hr />
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
            value="Svetlana"
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
    </>
  );
};

const mapState = (state) => ({
  user: state.authReducer,
  userEvents: state.allEventsReducer.userEvents,
});

const mapDispatch = (dispatch) => ({
  deleteUser: (userId) => dispatch(deleteUser(userId)),
  updateUser: (user) => dispatch(updateUser(user)),
});

export default connect(mapState, mapDispatch)(UpdateProfile);
