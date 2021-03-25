import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signup } from '../store/index';

/**
 * COMPONENT
 */
const SignUpForm = (props) => {
  const { signup, error } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    signup(email, password, firstName, lastName);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">
            <small>First Name</small>
          </label>
          <input
            name="firstName"
            type="text"
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
            value={firstName}
            placeholder="Your First Name"
          />
          <label htmlFor="lastName">
            <small>Last Name</small>
          </label>
          <input
            name="lastName"
            type="text"
            onChange={(event) => {
              setLastName(event.target.value);
            }}
            value={lastName}
            placeholder="Your Last Name"
          />
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input
            name="email"
            type="text"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
            placeholder="Your Email"
          />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input
            name="password"
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
            placeholder="Your Password"
          />
        </div>
        <div>
          <button type="submit" disabled={!email || !password}>
            {'Sign Up'}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">Sign Up with Google</a>
    </div>
  );
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.authReducer.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    signup: (email, password, firstName, lastName) => {
      dispatch(signup(email, password, firstName, lastName));
    },
  };
};

export const Signup = connect(mapSignup, mapDispatch)(SignUpForm);

/**
 * PROP TYPES
 */
SignUpForm.propTypes = {
  error: PropTypes.object,
};

export default SignUpForm;
