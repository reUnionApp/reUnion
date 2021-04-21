import React from "react";
import { logout } from "../store";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../styles/dropMenu.css";

const DropMenu = ({ open, setOpen, handleLogout }) => {
  return (
    <DropMenuBar
      open={open}
      onClick={() => {
        setOpen(!open);
      }}
    >
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
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  backdrop-filter: blur(5px);
  display: flex;
  flex-flow: column nowrap;
  position: fixed;
  height: 100vh;
  width: 100vw;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.75);
  transition: transform 0.3s ease-in-out;
`;
