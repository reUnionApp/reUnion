//React/Redux
import React from 'react';
import '../styles/delete.css'

const DeleteEvent = (props) => {
  return (
    <div id='deleteModal' className='flex column jContentC aItemsC'>
      <h1>Are you sure you want to delete this event?</h1>
      <h3>Deleting an event cannot be undone</h3>

      <button
        className="dEButton"
        onClick={() => props.deleteEvent(props.singleEvent.id)}
      >
        Delete {props.singleEvent.eventName}
      </button>
      <button type="button" className="dEButton" onClick={props.openClose}>
        Cancel
      </button>
    </div>
  )
}

export default DeleteEvent;
