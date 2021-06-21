import React, { useEffect } from 'react';
import '../styles/animation.css';

const Animation = () => {
  useEffect(() => {
    const container = document.getElementById('animationContainer');

    container.addEventListener('animationend', function (e) {
      if (e.target.id === 'animationContainer') {
        container.classList.add('animationEnd');
        localStorage.setItem('animationPlayed', 'true');
      }
    });
  }, []);

  return (
    <div id="animationContainer" className="flex column aItemsC jContentC">
      <img src="/reUnion_Logo.png" alt="logo" id="animationImg" />
      <div id="titleContainer">
        <div id="animationSlider"></div>
        <img src="/reUnion_Title.png" alt="title" id="animationTitle" />
      </div>
    </div>
  );
};

export default Animation;
