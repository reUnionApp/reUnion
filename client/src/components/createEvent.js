// React/Redux
import React, { useState, useEffect, useRef } from 'react';
import { getEvent, createEvent } from '../store';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

// React component imports
import { GoogleMapComponent, DateTimePicker, GuestList } from './index.js';

// CSS imports
import '../styles/create.css';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

// .env config
import dotenv from 'dotenv';
import zIndex from '@material-ui/core/styles/zIndex';
import { useForkRef } from '@material-ui/core';
dotenv.config();

SwiperCore.use([Navigation, Pagination, A11y]);

const CreateEvent = (props) => {
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventOwner, setEventOwner] = useState(props.user.firstName);
  // const [eventCoordinator, setEventCoordinator] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventGoogleLocation, setEventGoogleLocation] = useState({});
  const [eventStartDateTime, setEventStartDateTime] = useState(new Date());
  const [eventEndDateTime, setEventEndDateTime] = useState(new Date());
  const [eventData, setEventData] = useState({});
  const [eventTextLocation, setEventTextLocation] = useState('');
  const [eventNameError, setEventNameError] = useState('');
  const [eventCreate, setEventCreated] = useState(false);
  const threeBalloon1 = useRef(null);
  const threeBalloon2 = useRef(null);
  const threeBalloon3 = useRef(null);
  const CRPulse = useRef(null);

  let errorArray = [eventName, eventDescription, eventType];

  const history = useHistory();

  const handleChange = function (event, hook) {
    hook(event.target.value);
  };

  const dateFormat = (date) => {
    let dateObj = date;
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    return month + '/' + day + '/' + year;
  };

  const CRPulseFunc = (e) => {
    const x = e.clientX - e.target.getBoundingClientRect().left;
    const y = e.clientY - e.target.getBoundingClientRect().top;
    CRPulse.current.style.left = `${x}px`;
    CRPulse.current.style.top = `${y}px`;
    CRPulse.current.className = 'CRPulse';
  };

  const submitEventForm = function (e) {
    e.preventDefault();

    threeBalloon1.current.classList.add('TB1Float');
    threeBalloon2.current.classList.add('TB2Float');
    threeBalloon3.current.classList.add('TB3Float');
  };

  const completeSubmit = async () => {
    let event = {
      eventName: eventName,
      eventType: eventType,
      owner: eventOwner,
      ownerId: props.user.id,
      // coordinator: [eventCoordinator],
      description: eventDescription,
      location:
        eventTextLocation !== ''
          ? eventTextLocation
          : `${eventGoogleLocation.getPlace().formatted_address}`,
      startDateTime: eventStartDateTime,
      endDateTime: eventEndDateTime,
    };

    const createEventAttempt = await props.createEvent(event);

    if (createEventAttempt === 'Validation error') {
      setEventNameError('Event name already exists');
    } else {
      setEventData(event);
      // const result = await props.createEvent(event);
      if (event) {
        props.history.push(`/myEvents/${createEventAttempt.id}`);
      }
    }
  };

  const addressError = () => {
    errorArray.push('');

    return <p className="confValueError">NO ADDRESS</p>;
  };

  return (
    <div>
      <form
        id="createEventForm"
        className="createForm"
        onSubmit={submitEventForm}
        onKeyPress={(e) => {
          e.key === 'Enter' && e.preventDefault();
        }}
      >
        <Swiper
          id="createEventSwiperMaster"
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          navigation={true}
          allowTouchMove={false}
          style={{
            minHeight: '80vh',
            bottom: '0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          <div id="CESwiperSlidesWrapper">
            <SwiperSlide className="background3Up CRSlide">
              <div className="flex column aItemsC jContentC CRBalloonBox">
                <img
                  src="teal-balloon.png"
                  alt="balloon"
                  className="CRBalloonTeal"
                />
                <p className="CRStampMessage">What's the event about?</p>
              </div>
              <div
                style={{
                  minHeight: '100%',
                  width: '80%',
                  margin: '130px 0px 55px 0px',
                }}
                className="flex column jContentFS aItemsC"
              >
                <div
                  style={{
                    width: '80%',
                    margin: '0px 0px 36px 0px',
                  }}
                  className="flex column"
                >
                  <input
                    type="text"
                    name="eventName"
                    placeholder="Event Name"
                    className="createInput"
                    value={eventName}
                    pattern="^((?!~).)*$"
                    onChange={(event) => {
                      handleChange(event, setEventName);
                    }}
                  ></input>
                  <div
                    className="swiper-no-swiping"
                    style={{ width: '50vw' }}
                  ></div>
                  {/* <input
                    type="text"
                    name="coordinators"
                    className="createInput"
                    placeholder="Enter coordinators' names here"
                    value={eventCoordinator}
                    onChange={(event) => {
                      handleChange(event, setEventCoordinator);
                    }}
                  ></input> */}
                </div>
                <textarea
                  type="textarea"
                  name="description"
                  className="createTextArea"
                  placeholder="Enter description of your event"
                  value={eventDescription}
                  onChange={(event) => {
                    handleChange(event, setEventDescription);
                  }}
                ></textarea>
              </div>
            </SwiperSlide>
            <SwiperSlide className="background1Down">
              <div className="flex column aItemsC jContentC CRBalloonBox">
                <img
                  src="orange-balloon.png"
                  alt="balloon"
                  className="CRBalloonOrange"
                />
                <p className="CRStampMessage">What type of event?</p>
              </div>
              <div
                id="radioContainer"
                className="flex column aItemsC jContentC"
                style={{ height: '100%' }}
                onChange={(event) => {
                  handleChange(event, setEventType);
                }}
              >
                <input
                  type="radio"
                  name="eventType"
                  id="class-reunion"
                  value="class reunion"
                />
                <label htmlFor="class-reunion">
                  <div className="flex column aItemsC jContentC centeredLabel">
                    <p className="whiteBtnTextCE">Class Reunion</p>
                  </div>
                </label>
                <input
                  type="radio"
                  name="eventType"
                  id="family-reunion"
                  value="family reunion"
                />
                <label htmlFor="family-reunion">
                  <div className="flex column aItemsC jContentC centeredLabel">
                    <p className="whiteBtnTextCE">Family Reunion</p>
                  </div>
                </label>
                <input
                  type="radio"
                  name="eventType"
                  id="anniversary-party"
                  value="anniversary party"
                />
                <label htmlFor="anniversary-party">
                  <div className="flex column aItemsC jContentC centeredLabel">
                    <p className="whiteBtnTextCE">Anniversary Party</p>
                  </div>
                </label>
                <input
                  type="radio"
                  name="eventType"
                  id="baby-shower"
                  value="baby shower"
                />
                <label htmlFor="baby-shower">
                  <div className="flex column aItemsC jContentC centeredLabel">
                    <p className="whiteBtnTextCE">Baby Shower</p>
                  </div>
                </label>
                <input
                  type="radio"
                  name="eventType"
                  id="other-gathering"
                  value="other gathering"
                />
                <label htmlFor="other-gathering">
                  <div className="flex column aItemsC jContentC centeredLabel">
                    <p className="whiteBtnTextCE">Other Gathering</p>
                  </div>
                </label>
              </div>
            </SwiperSlide>
            <SwiperSlide className="background2Up">
              <div className="flex column aItemsC jContentC CRBalloonBox">
                <img
                  src="pink-balloon.png"
                  alt="balloon"
                  className="CRBalloonPink"
                />
                <p className="CRStampMessage">Where is your event?</p>
              </div>
              <div id="googleMapWrapper">
                <GoogleMapComponent
                  textLocation={eventTextLocation}
                  setTextLocation={setEventTextLocation}
                  googleLocation={eventGoogleLocation}
                  setGoogleLocation={setEventGoogleLocation}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="background3Down">
              <div className="flex column aItemsC jContentC CRBalloonBox">
                <img
                  src="teal-balloon.png"
                  alt="balloon"
                  className="CRBalloonTealDTP"
                />
                <p className="CRStampMessageDTP">When is the event?</p>
              </div>
              <div
                className="flex column jContentC"
                style={{ height: '100vh', width: '60%' }}
              >
                <DateTimePicker
                  startDateTime={eventStartDateTime}
                  setStartDateTime={setEventStartDateTime}
                  endDateTime={eventEndDateTime}
                  setEndDateTime={setEventEndDateTime}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="background1Up">
              <div id="CRConfOverflow">
                <div
                  className="flex column aItemsFS jContentC"
                  id="CRConfMaster"
                >
                  {/* <div id="ThreeBalloonBox">
                  <img
                    src="teal-balloon.png"
                    className="threeBalloonBalloon"
                    id="threeBalloon1"
                    alt="balloon"
                  />
                  <img
                    src="orange-balloon.png"
                    className="threeBalloonBalloon"
                    id="threeBalloon2"
                    alt="balloon"
                  />
                  <img
                    src="pink-balloon.png"
                    className="threeBalloonBalloon"
                    id="threeBalloon3"
                    alt="balloon"
                  />
                </div> */}
                  <div
                    id="CRConfWrapper"
                    className="flex column aItemsFS jContentC"
                  >
                    <h1 id="CEEventConfTitle">Event Confirmation</h1>
                    <div id="TildeErrorDiv" className="flex jContentC aItemsC">
                      {eventName.split('').includes('~') && (
                        <p className="confValueError">
                          EVENT NAME CAN'T CONTAIN '~'
                        </p>
                      )}
                    </div>
                    <div className="confLine">
                      <p className="confBold">Event Name: </p>
                      <p
                        className={
                          eventName.split('').includes('~')
                            ? 'confValueError'
                            : 'confValue'
                        }
                      >
                        {eventName}
                      </p>
                      {eventName === '' && (
                        <p className="confValueError">NO EVENT NAME</p>
                      )}
                    </div>
                    <div
                      className="confLine"
                      style={{ maxWidth: '100%', alignItems: 'flex-start' }}
                    >
                      <p className="confBold">Description: </p>
                      {eventDescription.length ? (
                        <div id="descriptionConfContainer">
                          <p className="confValueDesc">{eventDescription}</p>
                        </div>
                      ) : (
                        <p className="confValueError">NO DESCRIPTION</p>
                      )}
                    </div>
                    <div className="confLine">
                      <p className="confBold">Event Type: </p>
                      <p className="confValue">{eventType}</p>

                      {eventType === '' && (
                        <p className="confValueError">NO EVENT TYPE</p>
                      )}
                    </div>
                    {/* <div className="confLine">
                  <p className="confBold">Coordinator: </p>
                  <p className="confValue">{eventCoordinator}</p>
                </div> */}
                    {eventTextLocation !== '' ? (
                      <div className="confLine">
                        <p className="confBold">Address: </p>
                        <div id="locationConf">
                          <p className="confValue">{eventTextLocation}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="confLine">
                        <p className="confBold">Address: </p>
                        <div id="locationConf">
                          {eventGoogleLocation.gm_bindings_ &&
                          eventGoogleLocation.getPlace() ? (
                            <p className="confValue">
                              {eventGoogleLocation.getPlace().formatted_address}
                            </p>
                          ) : (
                            addressError()
                          )}
                        </div>
                      </div>
                    )}
                    <div className="confLine">
                      <p className="confBold">Start Date: </p>
                      <p className="confValue">
                        {dateFormat(eventStartDateTime)}
                      </p>
                    </div>
                    <div className="confLine">
                      <p className="confBold">End Date: </p>
                      <p className="confValue">
                        {dateFormat(eventEndDateTime)}
                      </p>
                    </div>
                    <div className="confLine">
                      <p className="confBold">Start Time: </p>
                      <p className="confValue">
                        {eventStartDateTime.toLocaleTimeString('en-US', {
                          hour12: true,
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <div className="confLine">
                      <span className="confBold">End Time: </span>
                      <p className="confValue">
                        {eventEndDateTime.toLocaleTimeString('en-US', {
                          hour12: true,
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <div className="confLine">
                      <p className="confBold">Host: </p>
                      <p className="confValue">{eventOwner}</p>
                    </div>
                    {eventNameError && (
                      <p
                        className="confValueError"
                        style={{
                          width: '100%',
                          margin: '0px',
                          textAlign: 'center',
                        }}
                      >
                        {eventNameError}
                      </p>
                    )}
                    <div id="buttonThreeBallonWrapper">
                      <button
                        type="submit"
                        className="createButton"
                        onClick={CRPulseFunc}
                        disabled={
                          errorArray.includes('') ||
                          eventName.split('').includes('~')
                        }
                      >
                        Create Event{' '}
                        <span
                          ref={CRPulse}
                          onAnimationEnd={() => {
                            CRPulse.current.className = '';
                          }}
                        />
                      </button>
                      <img
                        src="pink-balloon.png"
                        className="threeBalloonBalloon"
                        id="threeBalloon1"
                        ref={threeBalloon1}
                        alt="balloon"
                        onAnimationEnd={() => {
                          completeSubmit();
                        }}
                      />
                      <img
                        src="teal-balloon.png"
                        className="threeBalloonBalloon"
                        id="threeBalloon2"
                        ref={threeBalloon2}
                        alt="balloon"
                      />
                      <img
                        src="orange-balloon.png"
                        className="threeBalloonBalloon"
                        id="threeBalloon3"
                        ref={threeBalloon3}
                        alt="balloon"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </div>
        </Swiper>
      </form>
    </div>
  );
};

const mapState = (state) => ({
  event: state.eventReducer,
  user: state.authReducer,
});

const mapDispatch = (dispatch) => ({
  getEvent: (id) => dispatch(getEvent(id)),
  createEvent: (event) => dispatch(createEvent(event)),
});

export default connect(mapState, mapDispatch)(CreateEvent);
