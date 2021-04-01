import React, { useState } from 'react';
import Routes from './routes';
import { Navbar } from './components';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
