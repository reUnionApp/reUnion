import React, { useState } from 'react';
import Routes from './routes';
import { Navbar } from './components';
import './styles/app.css';

let isMobile = false;

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  isMobile = true;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className={`App ${isMobile ? 'mobile' : 'desktop'}`}>
      <Routes isMobile={isMobile} />
    </div>
  );
}

export default App;
