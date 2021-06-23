import React from 'react';
import { logout } from '../store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { toggleBurger } from './navbarTop';
import '../styles/dropMenu.css';

const DropMenu = ({ open, setOpen, handleLogout }) => {
  return (
    <div
      id="DMMaster"
      onClick={() => {
        setOpen(!open);
        toggleBurger();
      }}
      className={`flex ${open ? 'DMOpen' : 'DMClosed'}`}
    >
      <div id="dropMenuLeft" className="flex column aItemsC jContentC">
        <div id="DMLinkWrapper" className="flex column">
          <Link className="dropMenuLink" to="/myEvents">
            Events
          </Link>
          <Link className="dropMenuLink" to="/profile">
            Profile
          </Link>
          <Link className="dropMenuLink" to="/updateProfile">
            Account Settings
          </Link>
          <a className="dropMenuLink" href="#" onClick={handleLogout}>
            Logout
          </a>
        </div>
      </div>
      <div id="dropMenuRight" />
    </div>
  );
};

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

export default connect(mapState, mapDispatch)(DropMenu);
