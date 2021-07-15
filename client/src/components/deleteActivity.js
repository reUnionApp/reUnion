//React/Redux
import React, { useState, useEffect, useRef } from 'react';
import '../styles/delete.css';

const DeleteActivity = (props) => {
  return (
    <div className="deleteModal flex column jContentC aItemsC">
      <h1>Are you sure you want to delete this activity?</h1>
      <h3>Deleting an activity cannot be undone</h3>

      <button
        className="deleteButtonModal button"
        type="button"
        onClick={() => {
          props.deleteActivity(props.singleEvent.id, props.activityToDelete.id);
          props.history &&
            props.history.push(`/myEvents/${props.singleEvent.id}`);
        }}
      >
        Delete {props.activityToDelete && props.activityToDelete.activityName}
      </button>
      <button
        type="button"
        className="deleteButtonModalCancel button"
        onClick={props.openCloseActivity}
      >
        Cancel
      </button>
    </div>
  );
};

export default DeleteActivity;
