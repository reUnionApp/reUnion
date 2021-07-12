import React from 'react';
import { Link } from 'react-router-dom';
import { faWrench, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function EventBox(props) {
  const { statusColor, event, openClose, setDeleteEvent, adminCheck, userId } = props;
  let ownerCheck = event.UserEvent.isOwner;
  let coordCheck = event.UserEvent.isCoordinator;
  return (
    <div
      className={`flex column aItemsC jContentC eventBox ${statusColor}`}
    >
      {userId === event.ownerId && (
        <div id="eventBoxHost">Host</div>
      )}
      <Link to={`/myEvents/${event.id}`}>
        <h3 id="eventBoxTitle">{event.eventName}</h3>
      </Link>
      <div className="MEButtonRow flex jContentC w100">
        {adminCheck || ownerCheck || coordCheck ? (
          <div className="MEButtonWrapper">
            <Link
              to={`/myEvents/${event.id}/update`}
              id="MEWrenchLink"
            >
              <button className="MyEventsIcon">
                <FontAwesomeIcon
                  className="fontAwesomeLink MyEventsIconSVG"
                  icon={faWrench}
                  id="MEWrench"
                />
              </button>
            </Link>
          </div>
        ) : (
            false
          )}
        {adminCheck || ownerCheck ? (
          <div className="MEButtonWrapper">
            <button
              className="MyEventsIcon"
              onClick={() => {
                setDeleteEvent(event);
                openClose();
              }}
            >
              <FontAwesomeIcon
                className="fontAwesomeLink MyEventsIconSVG"
                icon={faTrash}
                id="METrash"
              />
            </button>
          </div>
        ) : (
            false
          )}
      </div>
    </div>
  );
}

export default EventBox



