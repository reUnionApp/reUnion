import React from 'react';
import { logout } from '../store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { toggleBurger } from './navbarTop';
import '../styles/dropMenu.css';

const DropMenu = ({ open, setOpen, handleLogout }) => {
  return (
    <DropMenuBar
      open={open}
      onClick={() => {
        setOpen(!open);
        toggleBurger();
      }}
    >
      <div id="dropMenuLeft">
        <Link className="dropMenuLink linkSpacer" to="/myEvents">
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
      <div id="dropMenuRight"></div>
    </DropMenuBar>
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

const DropMenuBar = styled.div`
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  display: flex;
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 99;
  background-color: transparent;
  transition: transform 0.4s ease-in;
`;
