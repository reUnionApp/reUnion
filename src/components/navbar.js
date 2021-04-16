import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleLogout, isLoggedIn, firstName }) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div>
          <strong>Hello, {firstName}!</strong>
          <Link to="/profile">My Profile</Link>
          <Link to="/myEvents">My Events</Link>
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          <Link to="/home">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    firstName: state.authReducer.firstName,
    isLoggedIn: !!state.authReducer.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleLogout() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
