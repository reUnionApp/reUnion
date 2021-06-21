import React, { useEffect } from 'react';
import '../styles/loading.css';

const loading = () => {
  return (
    <div id="loadingContainer" className="flex column aItemsC jContentC">
      <img src="/reUnion_Logo.png" alt="logo" id="loadingImg" />
      <div id="loadingTitleContainer">
        <h1 id="loadingTitle">Loading</h1>
        <div id="loadingDot"></div>
      </div>
    </div>
  );
};

export default loading;
