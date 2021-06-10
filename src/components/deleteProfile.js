//React/Redux
import React, { useState, useEffect, useRef } from 'react';
import '../styles/delete.css'

const DeleteProfile = (props) => {

  console.log('props in profile', props);

  return (
    <div id='deleteModal' className='flex column jContentSE aItemsC'>
      <h1>Are you sure you want to delete your account?</h1>
      <h3>Deleting an account cannot be undone</h3>

      <button
        className="button dEButton deleteButton"
        onClick={() => {
          props.deleteSingleUser && props.deleteSingleUser(props.user.id);
          console.log('props.deleteSingleUser', props.deleteSingleUser)
          console.log('props.user', props.user.id)
          // props.history && props.history.push(`/`);
        }}
      >
        Delete Your Account
      </button>
      <button type="button" className="button dEButton" style={{ backgroundColor: '#F6DA83', color: 'black' }} onClick={props.openClose}>
        Cancel
      </button>
    </div>
  )
}

export default DeleteProfile;
