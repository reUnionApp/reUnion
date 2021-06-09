import React, { useState, useRef } from 'react';
import { faCheck, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/updateGuest.css';

const UpdateGuest = (props) => {
  const [coordStatus, setCoordStatus] = useState('');

  const handleChange = (e) => {
    console.log('e.target.value', e.target.value);
    setCoordStatus(e.target.value)
    console.log(coordStatus)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedInfo = {
      firstName: e.target.UGFirstName.value,
      lastName: e.target.UGLastName.value,
      email: e.target.UGEmail.value,
      id: props.guestInfo.id,
    };
    props.handleUpdate(e, updatedInfo);
  };

  const deleteGuest = () => {
    console.log('delete guest fired');
    props.deleteGuest(props.guestInfo.id);
  };
  console.log(111, props);

  if (props.guestInfo.events) {
    const event = props.guestInfo.events.filter((singleEvent) =>
      singleEvent.id === props.eventId
    );
    console.log('inside if statement')
    console.log(5555555, event)
  }

  return (
    <>
      <h1 style={{ color: 'white' }}>Update Guest</h1>
      {props.guestInfo.userType === 'registered' ? (
        <form
          id="updateGuestForm"
          className="flex column aItemsC"
          onSubmit={handleSubmit}
        >
          <div id="UGFormDiv" className="flex column">
            <label htmlFor="UGFirstName" className="UGLabel">
              First Name
            </label>
            <input
              type="text"
              className="UGInput"
              id="UGFirstName"
              placeholder="first name"
              defaultValue={props.guestInfo.firstName}
              required
              disabled={true}
            />
            <label htmlFor="UGLastName" className="UGLabel">
              Last Name
            </label>
            <input
              type="text"
              className="UGInput"
              id="UGLastName"
              placeholder="last name"
              defaultValue={props.guestInfo.lastName}
              required
              disabled={true}
            />
            <label htmlFor="UGEmail" className="UGLabel">
              Email
            </label>
            <input
              type="email"
              className="UGInput"
              id="UGEmail"
              placeholder="email"
              defaultValue={props.guestInfo.email}
              required
              disabled={true}
            />
            <div id="updateGuestErrorDiv">
              <p className="updateGuestError">
                CAN NOT UPDATE REGISTERED GUEST INFO
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="button"
            id="UGSubmit"
            disabled={true}
          >
            Update Guest
          </button>
          <button
            type="button"
            className="button"
            id="UGDelete"
            onClick={deleteGuest}
          >
            Remove Guest
          </button>
        </form>
      ) : (
          <form
            id="updateGuestForm"
            className="flex column aItemsC"
            onSubmit={handleSubmit}
          >
            <div id="UGFormDiv" className="flex column">
              <label htmlFor="UGFirstName" className="UGLabel">
                First Name
            </label>
              <input
                type="text"
                className="UGInput"
                id="UGFirstName"
                placeholder="first name"
                defaultValue={props.guestInfo.firstName}
                required
              />
              <label htmlFor="UGLastName" className="UGLabel">
                Last Name
            </label>
              <input
                type="text"
                className="UGInput"
                id="UGLastName"
                placeholder="last name"
                defaultValue={props.guestInfo.lastName}
                required
              />
              <label htmlFor="UGEmail" className="UGLabel">
                Email
            </label>
              <input
                type="email"
                className="UGInput"
                id="UGEmail"
                placeholder="email"
                defaultValue={props.guestInfo.email}
                required
              />
              <div id="updateGuestErrorDiv">
                {props.updateErrors.length > 0 && (
                  <p className="updateGuestError">{props.updateErrors}</p>
                )}
              </div>
            </div>
            <h5>Coordinator Status</h5>
            <div id="buttonDiv" className='flex jContentC aItemsC'>
              <input
                type="radio"
                name="yesNo"
                value="true"
                id="yesRadio"
                onChange={handleChange}
                checked={coordStatus.yesNo === 'true'}
              />
              <label htmlFor="yesRadio" className='flex jContentC aItemsC'>
                <img src='/check.png' alt='check image' className='radioIcon' />
              </label>
              <input
                type="radio"
                name="yesNo"
                value="false"
                id="noRadio"
                onChange={handleChange}
                checked={coordStatus.yesNo === 'false'}
              />
              <label htmlFor="noRadio" className='flex jContentC aItemsC'>
                <img src='/x.png' alt='X image' className='radioIcon' />
              </label>
            </div>

            <button type="submit" className="button" id="UGSubmit">
              Update Guest
          </button>
            <button
              type="button"
              id="UGDelete"
              onClick={deleteGuest}
            >
              <FontAwesomeIcon
                className="fontAwesomeLink MyEventsIconSVG"
                icon={faTrash}
                style={{ width: 'auto', height: '25px' }}
              />
            </button>
          </form>
        )}
      <button type="button" className="button" onClick={props.openClose}>
        Cancel
      </button>
    </>
  );
};

export default UpdateGuest;
