// React/Redux
import React, { useState, useEffect, useRef } from 'react';
import { getEvent, createEvent } from '../store';
import { connect } from 'react-redux';

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

  let errorArray = [eventName, eventDescription, eventType];

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

  const submitEventForm = async function (click) {
    click.preventDefault();
    console.log('submit form func was fired!!!!!');

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

    setEventData(event);
    const resultId = await props.createEvent(event);

    props.history.push(`/myEvents/${resultId}`);
  };

  const addressError = () => {
    errorArray.push('');
    return <p className='confValueError'>NO ADDRESS</p>
  };

  return (
    <div>
      <form
        className="createForm"
        onSubmit={submitEventForm}
        onKeyPress={(e) => {
          e.key === 'Enter' && e.preventDefault();
        }}
      >
        <Swiper
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          navigation
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
          <div>
            <SwiperSlide className="background3Up">
              <div className="flex column aItemsC jContentC teal cEStamp">
                <p
                  style={{
                    textAlign: 'center',
                    fontSize: '12px',
                    margin: '0px 5px',
                  }}
                >
                  What's the event about?
                </p>
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
            <SwiperSlide
              style={{ overflow: 'scroll' }}
              className="background1Down"
            >
              <div className="flex column aItemsC jContentC teal cEStamp">
                <p
                  style={{
                    textAlign: 'center',
                    fontSize: '12px',
                    margin: '0px 5px',
                  }}
                >
                  What type of event?
                </p>
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
            <SwiperSlide
              style={{ overflow: 'scroll' }}
              className="background2Up"
            >
              <div className="flex column aItemsC jContentC teal cEStamp">
                <p
                  style={{
                    textAlign: 'center',
                    fontSize: '12px',
                    margin: '0px 5px',
                  }}
                >
                  Where is your event?
                </p>
              </div>
              <div style={{ margin: '130px 0px 55px 0px' }}>
                <GoogleMapComponent
                  textLocation={eventTextLocation}
                  setTextLocation={setEventTextLocation}
                  googleLocation={eventGoogleLocation}
                  setGoogleLocation={setEventGoogleLocation}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="background3Down">
              <div className="flex column aItemsC jContentC teal cEStamp">
                <p
                  style={{
                    textAlign: 'center',
                    fontSize: '12px',
                    margin: '0px 5px',
                  }}
                >
                  When is your event?
                </p>
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
            <SwiperSlide
              style={{ overflow: 'scroll' }}
              className="background1Up"
            >
              <div className="layout flex column aItemsFS jContentC">
                <h1>Event Confirmation</h1>
                <div className="confLine">
                  <p className="confBold">Event Name: </p>
                  <p className="confValue">{eventName}</p>
                  {eventName === '' && <p className='confValueError'>NO EVENT NAME</p>}
                </div>
                <div
                  className="confLine"
                  style={{ maxWidth: '100%', alignItems: 'flex-start' }}
                >
                  <p className="confBold">Description: </p>
                  {eventDescription.length ? (
                    <div id="descriptionConfContainer">
                      <p className="confValue">{eventDescription}</p>
                    </div>
                  ) : (
                      <p className='confValueError'>NO DESCRIPTION</p>
                    )}
                </div>
                <div className="confLine">
                  <p className="confBold">Event Type: </p>
                  <p className="confValue">{eventType}</p>
                  {eventType === '' && <p className='confValueError'>NO EVENT TYPE</p>}
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
                          ) : addressError()
                        }
                      </div>
                    </div>
                  )}
                <div className="confLine">
                  <p className="confBold">Start Date: </p>
                  <p className="confValue">{dateFormat(eventStartDateTime)}</p>
                </div>
                <div className="confLine">
                  <p className="confBold">End Date: </p>
                  <p className="confValue">{dateFormat(eventEndDateTime)}</p>
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
                <button type="submit" className="button createButton" disabled={errorArray.includes("")}>
                  Create Event
                </button>
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
