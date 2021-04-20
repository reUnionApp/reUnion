import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../styles/dropMenu.css";

const DropMenu = ({ open, setOpen }) => {
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
      <Link className="dropMenuLink" to="/">
        Profile
      </Link>
      <Link className="dropMenuLink" to="/">
        Account Settings
      </Link>
      <Link className="dropMenuLink" to="/">
        Logout
      </Link>
    </DropMenuBar>
  );
};

export default DropMenu;

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
