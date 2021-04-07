import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import title from '../styles/reUnion_Title.png';

const Navbar = ({ handleLogout, isLoggedIn, firstName }) => (
  <div>
    <img style={{ width: '10%' }} src={title} alt="reUnion logo" />
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          {/* <Link to="/home">Home</Link> */}
          <Link to="/profile">My Profile</Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/home">Home</Link>
        </div>
      )}
      {isLoggedIn ? (
        <div>
          <Link to="/">
            <strong>{firstName}</strong>
          </Link>
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
        </div>
      ) : (
        <div>
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
