//React/Redux
import React, { useState, useEffect, useRef } from 'react';
import '../styles/delete.css'

const DeleteProfile = (props) => {

  console.log('props in profile', props);

  return (
    <div id='deleteModal' className='flex column jContentC aItemsC'>
      <h1>Are you sure you want to delete your account?</h1>
      <h3>Deleting an account cannot be undone</h3>

      <button
        className="dEButton"
        onClick={() => {
          props.deleteUser && props.deleteUser(props.user.id)
          console.log('props.deleteUser', props.deleteUser)
          console.log('props.user', props.user.id)
          // props.history && props.history.push(`/`);
        }}
      >
        Delete Your Account
      </button>
      <button type="button" className="dEButton" onClick={props.openClose}>
        Cancel
      </button>
    </div>
  )
}

export default DeleteProfile;
