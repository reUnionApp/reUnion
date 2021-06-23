import React, { useRef } from 'react';
import '../styles/animation.css';

const Animation = (props) => {
  const container = useRef(null);

  const animationEnd = (e) => {
    if (e.target.id === 'animationContainer') {
      container.current.classList.add('animationEnd');
      localStorage.setItem('animationPlayed', 'true');
    }
  };

  return (
    <div
      id="animationContainer"
      className="flex column aItemsC jContentC"
      onAnimationEnd={animationEnd}
      ref={container}
    >
      <img src="/reUnion_Logo.png" alt="logo" id="animationImg" />
      <div id="titleContainer">
        <div id="animationSlider" />
        <img src="/reUnion_Title.png" alt="title" id="animationTitle" />
      </div>
    </div>
  );
};

export default Animation;
