import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import '../styles/navbar.css';

const Navbar = (props) => (
  <div>
    <nav>
      <div className="flex w100 jContentSA navbar">
        <p id="navBarGreet">Hello {props.firstName}!</p>
        <Link
          to="/profile"
          id="navMyProfile"
          className={`navBottomLink ${
            props.location.pathname === '/profile' && 'navBottomLinkSelected'
          }`}
        >
          My Profile
        </Link>
        <Link
          to="/myEvents"
          id="navMyEvents"
          className={`navBottomLink ${
            props.location.pathname === '/myEvents' && 'navBottomLinkSelected'
          }`}
        >
          My Events
        </Link>
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
