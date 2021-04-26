import React, { useState, useEffect } from 'react';
import { Autocomplete, LoadScript, GoogleMap } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
};

let center = {
  lat: 40.73,
  lng: -73.935,
};

const googleMap = () => {
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE}
      libraries={['places']}
    >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <></>
      </GoogleMap>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input type="text" />
      </Autocomplete>
    </LoadScript>
  );
};

export default googleMap;
