import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import '../styles/navbar.css';

const Navbar = ({ handleLogout, isLoggedIn, firstName }) => (
  <div>
    <nav>
      <div className="flex w100 jContentSA navbar">
        <strong>Hello, {firstName}!</strong>
        <Link to="/profile">My Profile</Link>
        <Link to="/myEvents">My Events</Link>
        <a href="#" onClick={handleLogout}>
          Logout
        </a>
      </div>
    </nav>
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
