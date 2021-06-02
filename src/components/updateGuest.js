import React, { useState } from 'react';
import '../styles/updateGuest.css';

const UpdateGuest = (props) => {
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
  console.log(111, props.guestInfo);
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
          <button type="submit" className="button" id="UGSubmit">
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
      )}
      <button type="button" className="button" onClick={props.openClose}>
        Cancel
      </button>
    </>
  );
};

export default UpdateGuest;
