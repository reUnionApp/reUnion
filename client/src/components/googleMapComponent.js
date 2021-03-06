import React, { useState, useEffect } from 'react';
import { Autocomplete, LoadScript, GoogleMap } from '@react-google-maps/api';

const GoogleMapComponent = (props) => {
  const [count, addCount] = useState(0);
  const [coordinates, setCoordinates] = useState({
    lat: 40.73,
    lng: -73.935,
  });

  // let viewPortWidth = (window.visualViewport.width / 100) * 75;

  const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '5px',
    position: 'relative',
  };

  const { textLocation, setTextLocation, googleLocation, setGoogleLocation } =
    props;

  const onLoad = (input) => {
    setGoogleLocation(input);
  };

  const onPlaceChanged = () => {
    if (googleLocation !== null) {
      if (!googleLocation.getPlace().address_components) {
        setTextLocation(googleLocation.getPlace().name);
        return;
      }

      setGoogleLocation({});
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
    <div
      style={{ width: '100%', height: '100%' }}
      className="flex column aItemsC"
    >
      <LoadScript
        style={{ width: '100%', height: '100%' }}
        googleMapsApiKey={process.env.REACT_APP_GOOGLE}
        libraries={['places']}
      >
        <div id="mapBox">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={coordinates}
            zoom={count === 0 ? 10 : 18}
          >
            <div id="mapBoxBoxShadow" />
          </GoogleMap>
        </div>

        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Enter an Address"
            id="mapLocationInput"
          />
        </Autocomplete>
        <h4 id="CREventAddress">Event Address:</h4>
        <div style={{ width: '80%', textAlign: 'center' }}>
          {textLocation !== '' ? (
            <p id="finalLocation">{textLocation}</p>
          ) : (
            <p>
              {googleLocation.gm_bindings_ && googleLocation.getPlace()
                ? `${googleLocation.getPlace().formatted_address}`
                : false}
            </p>
          )}
        </div>
      </LoadScript>
    </div>
  );
};

export default GoogleMapComponent;
