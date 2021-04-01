import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DropMenu = ({ open }) => {
  return (
    <DropMenuBar open={open}>
      <Link to="/">Events</Link>
      <Link to="/">Profile</Link>
      <Link to="/">Account Settings</Link>
      <Link to="/">Logout</Link>
    </DropMenuBar>
  );
};

export default DropMenu;

const DropMenuBar = styled.div`
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
  display: flex;
  flex-flow: column nowrap;
  position: fixed;
  height: 100vh;
  width: 100vw;
  align-items: center;
  background-color: #fff;
  transition: transform 0.3s ease-in-out;
`;
