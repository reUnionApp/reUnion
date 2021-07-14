import React from 'react';

function GuestBox(props) {
  const {
    guest,
    adminCheck,
    coordCheck,
    ownerCheck,
    authUser,
    event,
    statusColor,
    openClose,
    selectGuest,
    editPerson,
    setGuestToUpdate,
    setUpdateGuest,
  } = props;
  return (
    <div className="guestBoxMaster">
      <img
        alt="corner ribbon"
        src="/cornerRibbon.png"
        className="cornerRibbon"
      />

      {statusColor === 'yellowFade' && <p className="CRFillerP">PENDING</p>}
      {statusColor === 'tealFade' && <p className="CRFiller">ACCEPTED</p>}
      {statusColor === 'pinkFade' && <p className="CRFiller">DECLINED</p>}
      <div key={guest.id}>
        <div
          onClick={(e) =>
            adminCheck || ownerCheck || coordCheck
              ? selectGuest(e, guest.id)
              : false
          }
          className={`flex column aItemsC jContentC guestBox ${statusColor}`}
        >
          <h3 className="guestBoxName">
            {guest.firstName} {guest.lastName}
          </h3>
          {guest.id === editPerson && (
            <div className="flex column expandedCard">
              <div className="expandedCardRow">
                <p className="expandedCardRowL">Email:</p>
                {guest.email.length >= 20 ? (
                  <div className="longEmail flex column aItemsFS">
                    <p className="expandedCardRowAlt">{guest.email}</p>
                  </div>
                ) : (
                  <p className="expandedCardRowR">{guest.email}</p>
                )}
              </div>
              {guest.alias && (
                <div className="expandedCardRow">
                  <p className="expandedCardRowL">Nickname:</p>
                  <p className="expandedCardRowR">{guest.alias}</p>
                </div>
              )}
              {guest.dietaryRestrictions && (
                <div className="expandedCardRow">
                  <p className="expandedCardRowL">Dietary Restrictions:</p>
                  <p className="expandedCardRowR">
                    {guest.dietaryRestrictions}
                  </p>
                </div>
              )}
              {guest.specialRequests && (
                <>
                  {guest.specialRequests.length >= 20 ? (
                    <div
                      className="flex column"
                      style={{ margin: '10px 0 0 0' }}
                    >
                      <p
                        className="expandedCardRowL"
                        style={{ alignSelf: 'flex-start' }}
                      >
                        Special Requests:
                      </p>
                      <div className="longText flex column aItemsFS">
                        <p className="expandedCardRowAlt">
                          {guest.specialRequests}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="expandedCardRow">
                      <p className="expandedCardRowL">Special Requests:</p>
                      <p className="expandedCardRowR">
                        {guest.specialRequests}
                      </p>
                    </div>
                  )}
                </>
              )}
              <div
                className="flex jContentSA"
                style={{
                  margin: '25px 0px 0px 0px',
                  alignItems: 'baseline',
                }}
              >
                <button
                  className="button"
                  id="GLUpdateButton"
                  onClick={() => {
                    setGuestToUpdate({
                      firstName: guest.firstName,
                      lastName: guest.lastName,
                      email: guest.email,
                      id: guest.id,
                      userType: guest.userType,
                      events: guest.Events,
                      coordStatusProp: guest.Events[0].UserEvent.isCoordinator,
                    });
                    setUpdateGuest(guest);
                    openClose();
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* {guests &&
        guests.map((guest) => {
          return (

          );
        })} */}
    </div>
  );
}

export default GuestBox;
