import React, { useState, useEffect } from 'react';
import { Autocomplete, LoadScript, GoogleMap } from '@react-google-maps/api';

const GoogleMapComponent = (props) => {
  const [count, addCount] = useState(0);
  const [coordinates, setCoordinates] = useState({
    lat: 40.73,
    lng: -73.935,
  });

  const containerStyle = {
    width: '400px',
    height: '400px',
  };

  const {
    textLocation,
    setTextLocation,
    googleLocation,
    setGoogleLocation,
  } = props;

  const onLoad = (input) => {
    console.log('autocomplete: ', input);

    setGoogleLocation(input);
  };

  const onPlaceChanged = () => {
    console.log(999, googleLocation.getPlace());
    if (googleLocation !== null) {
      if (!googleLocation.getPlace().address_components) {
        setTextLocation(googleLocation.getPlace().name);
        return;
      }
      setGoogleLocation(googleLocation);
      let newLat = googleLocation.getPlace().geometry.location.lat();
      let newLng = googleLocation.getPlace().geometry.location.lng();
      setCoordinates({
        lat: newLat,
        lng: newLng,
      });
      addCount(count + 1);
      setTextLocation('');
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE}
      libraries={['places']}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates}
        zoom={count === 0 ? 10 : 18}
      >
        <></>
      </GoogleMap>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input type="text" />
      </Autocomplete>
      <h4>Your event will be held at:</h4>
      {textLocation !== '' ? (
        <p>{textLocation}</p>
      ) : (
        <p>
          {googleLocation.gm_bindings_ && googleLocation.getPlace()
            ? `${googleLocation.getPlace().name}, ${
                googleLocation.getPlace().formatted_address
              }`
            : false}
        </p>
      )}
    </LoadScript>
  );
};

export default GoogleMapComponent;
