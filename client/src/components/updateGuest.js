import React, { useState, useEffect } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from './loading';
import '../styles/updateGuest.css';

const UpdateGuest = (props) => {
  const [coordStatus, setCoordStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedInfo = {
      firstName: e.target.UGFirstName.value,
      lastName: e.target.UGLastName.value,
      email: e.target.UGEmail.value,
      id: props.guestInfo.id,
      coordStatus,
    };
    props.handleUpdate(e, updatedInfo);
  };

  const deleteGuest = () => {
    props.deleteGuest(props.guestInfo.id);
  };

  if (props.guestInfo.events) {
    const event = props.guestInfo.events.filter(
      (singleEvent) => singleEvent.id === props.eventId
    );
  }

  if (Object.keys(props.guestInfo).length && coordStatus === null) {
    setCoordStatus(props.guestInfo.coordStatusProp);
  }

  return (
    <div className="updateOverflowWrapper flex column aItemsC">
      {Object.keys(props.guestInfo).length > 0 ? (
        <>
          <h1 className="updateTitle">Update Guest</h1>
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
              <button type="button" id="UGDelete" onClick={deleteGuest}>
                <FontAwesomeIcon
                  className="fontAwesomeLink MyEventsIconSVG"
                  icon={faTrash}
                  style={{ width: 'auto', height: '25px' }}
                />
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
                {props.guestInfo && props.guestInfo?.events[0].UserEvent.rsvpStatus === 'accepted' ? (<><h5 id="coordStatusTitle">Coordinator Status</h5>
                  <div id="buttonDiv" className="flex jContentC aItemsC">
                    <input
                      type="radio"
                      name="yesNo"
                      value="false"
                      id="noRadio"
                      onChange={() => setCoordStatus(false)}
                      checked={coordStatus === false}
                    />
                    <label htmlFor="noRadio" className="flex jContentC aItemsC">
                      <div className="radioIconContainerNo">
                        <img src="/x.png" alt="X image" className="radioIcon" />
                      </div>
                    </label>
                    <input
                      type="radio"
                      name="yesNo"
                      value="true"
                      id="yesRadio"
                      onChange={() => setCoordStatus(true)}
                      checked={coordStatus === true}
                    />
                    <label htmlFor="yesRadio" className="flex jContentC aItemsC">
                      <div className="radioIconContainerYes">
                        <img
                          src="/check.png"
                          alt="check image"
                          className="radioIcon"
                        />
                      </div>
                    </label>
                  </div></>) : false}

                <button type="submit" className="button" id="UGSubmit">
                  Update Guest
              </button>
                <button type="button" id="UGDelete" onClick={deleteGuest}>
                  <FontAwesomeIcon
                    className="fontAwesomeLink MyEventsIconSVG"
                    icon={faTrash}
                    style={{ width: 'auto', height: '25px' }}
                  />
                </button>
              </form>
            )}
          <button
            type="button"
            className="button updateCancel"
            onClick={() => {
              props.openClose();
              setCoordStatus(props.guestInfo.coordStatusProp);
            }}
          >
            Cancel
          </button>
        </>
      ) : (
          <Loading />
        )}
    </div>
  );
};

export default UpdateGuest;
