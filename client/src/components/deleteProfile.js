//React/Redux
import React, { useState, useEffect, useRef } from 'react';
import '../styles/delete.css';

const DeleteProfile = (props) => {
  return (
    <div className="deleteModal flex column jContentC aItemsC">
      <h1>Are you sure you want to delete your account?</h1>
      <h3>Deleting an account cannot be undone</h3>

      <button
        className="button deleteButtonModal"
        type="button"
        onClick={() => {
          props.deleteSingleUser && props.deleteSingleUser(props.user.id);
        }}
      >
        Delete Your Account
      </button>
      <button
        type="button"
        className="button deleteButtonModalCancel"
        onClick={props.openClose}
      >
        Cancel
      </button>
    </div>
  );
};

export default DeleteProfile;
