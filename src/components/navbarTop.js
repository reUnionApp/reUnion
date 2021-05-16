import React, { useState } from 'react';
import { Icon, InlineIcon } from '@iconify/react';
import DropMenu from './dropMenu';
import plusIcon from '@iconify-icons/mdi/plus';
import { Link } from 'react-router-dom';
import '../styles/navbarTop.css';

export const toggleBurger = () => {
  const burger = document.getElementById('circleBurger');
  const filler = document.getElementById('circleFiller');
  const plusButton = document.getElementById('plusButton');
  const darken = document.getElementById('darken');
  if (filler.className === 'cfClose') {
    filler.className = 'cfOpen';
    burger.className = 'cbOpen';
    plusButton.className = 'plusButtonOff';
    darken.className = 'darkenOn';
  } else {
    filler.className = 'cfClose';
    burger.className = 'cbClose';
    plusButton.className = 'plusButtonOn';
    darken.className = 'darkenOff';
  }
};

const NavbarTop = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      id="burgerBar"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <div
        open={open}
        onClick={() => {
          setOpen(!open);
          toggleBurger();
        }}
        style={{
          zIndex: '100',
        }}
      >
        <div id="circleBurger" className="cbClose">
          <div id="circleFiller" className="cfClose"></div>
        </div>
      </div>
      <Link to="/createEvent">
        <div id="plusButtonContainer">
          <div id="plusButton" className="plusButtonOn"></div>
        </div>
      </Link>

      <DropMenu open={open} setOpen={setOpen} />
    </div>
  );
};

export default NavbarTop;
