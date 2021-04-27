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

  const onLoad = (input) => {
    console.log('autocomplete: ', input);

    props.setEventGoogleLocation(input);
  };

  const onPlaceChanged = () => {
    console.log(999, props.eventGoogleLocation.getPlace());
    if (props.eventGoogleLocation !== null) {
      if (!props.eventGoogleLocation.getPlace().address_components) {
        props.setEventTextLocation(props.eventGoogleLocation.getPlace().name);
        return;
      }
      props.setEventGoogleLocation(props.eventGoogleLocation);
      let newLat = props.eventGoogleLocation.getPlace().geometry.location.lat();
      let newLng = props.eventGoogleLocation.getPlace().geometry.location.lng();
      setCoordinates({
        lat: newLat,
        lng: newLng,
      });
      addCount(count + 1);
      props.setEventTextLocation('');
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
      {props.eventTextLocation !== '' ? (
        <p>{props.eventTextLocation}</p>
      ) : (
        <p>
          {props.eventGoogleLocation.gm_bindings_ &&
          props.eventGoogleLocation.getPlace()
            ? `${props.eventGoogleLocation.getPlace().name}, ${
                props.eventGoogleLocation.getPlace().formatted_address
              }`
            : false}
        </p>
      )}
    </LoadScript>
  );
};

export default GoogleMapComponent;
