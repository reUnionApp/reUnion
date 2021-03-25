import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../store/index';

/**
 * COMPONENT
 */
const LoginForm = (props) => {
  const { login, error } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
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
            {'Log In'}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">Log In with Google</a>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.authReducer.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    login: (email, password) => {
      dispatch(login(email, password));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(LoginForm);

/**
 * PROP TYPES
 */
LoginForm.propTypes = {
  error: PropTypes.object,
};

export default LoginForm;
