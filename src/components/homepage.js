import React from 'react';
import title from '../styles/reUnion_Title.png';
import logo from '../styles/reUnion_Logo.png';

export const Homepage = (props) => {
  return (
    <div>
      <div>
        <img src={title} alt="reUnion title" />
      </div>
      <div>
        <img src={logo} alt="reUnion logo" />
      </div>
    </div>
  );
};
