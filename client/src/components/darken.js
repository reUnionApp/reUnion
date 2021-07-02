import zIndex from '@material-ui/core/styles/zIndex';
import React from 'react';

const Darken = () => {
  return (
    <div
      id="darken"
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.70)',
        zIndex: '65',
        position: 'fixed',
        transitionDuration: '0.25s',
        transitionTimingFunction: 'ease-out',
      }}
      className="darkenOff"
    ></div>
  );
};

export default Darken;
