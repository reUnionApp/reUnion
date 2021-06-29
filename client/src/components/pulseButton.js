import '../styles/pulseButton.css';
import React, { useRef } from 'react';

const PulseButton = (props) => {
  const pulse = useRef(null);

  const handleClick = (e) => {
    // how far the button is from the left and the top of the viewport
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop;

    pulse.current.style.left = `${x}px`;
    pulse.current.style.top = `${y}px`;
    pulse.current.className = 'pulse';
  };

  return (
    <button
      id="pulseButton"
      type={props.type}
      onClick={handleClick}
      style={{
        height: `${props.height}px`,
        width: `${props.width}px`,
        fontSize: `${props.fontSize}px`,
        background: `linear-gradient(90deg, #${props.color1}, #${props.color2})`,
      }}
    >
      {props.message}
      <span
        ref={pulse}
        onAnimationEnd={() => {
          pulse.current.className = '';
        }}
        style={{ fontSize: `${props.fontSize}px` }}
      />
    </button>
  );
};

export default PulseButton;
