import React, { useState } from 'react';
import DropMenu from './dropMenu';
import { Link } from 'react-router-dom';
import '../styles/navbarTop.css';

export const toggleBurger = () => {
  const burger = document.getElementById('circleBurger');
  const filler = document.getElementById('circleFiller');
  const navLogo = document.getElementById('navLogo');
  const plusButton = document.getElementById('plusButton');
  const darken = document.getElementById('darken');
  if (filler.className === 'cfClose') {
    filler.className = 'cfOpen';
    burger.className = 'cbOpen';
    navLogo.className = 'navLogoFade';
    plusButton.className = 'plusButtonOff';
    darken.className = 'darkenOn';
  } else {
    filler.className = 'cfClose';
    burger.className = 'cbClose';
    navLogo.className = 'navLogoFull';
    plusButton.className = 'plusButtonOn';
    darken.className = 'darkenOff';
  }
};

const plusFlash = () => {
  if (window.location.pathname !== '/createEvent') {
    const plusButton = document.getElementById('plusButton');
    plusButton.className = 'plusButtonOff';
    let count = 0;
    plusButton.addEventListener('transitionend', function (e) {
      if (e.target.className === 'plusButtonOff') {
        count++;
      }
      if (count === 2) {
        plusButton.className = 'plusButtonOn';
      }
    });
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
      <img
        src="reUnion_Title.png"
        alt="logo"
        id="navLogo"
        className="navLogoFull"
      />
      <Link to="/createEvent" id="plusLink" onClick={plusFlash}>
        <div id="plusButtonContainer">
          <div id="plusButton" className="plusButtonOn"></div>
        </div>
      </Link>

      <DropMenu open={open} setOpen={setOpen} />
    </div>
  );
};

export default NavbarTop;
