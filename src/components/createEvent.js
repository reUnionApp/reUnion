// React/Redux
import React, { useState, useEffect } from 'react';
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
dotenv.config();

SwiperCore.use([Navigation, Pagination, A11y]);

const CreateEvent = (props) => {
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('class reunion');
  const [eventOwner, setEventOwner] = useState(props.user.firstName);
  const [eventCoordinator, setEventCoordinator] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventGoogleLocation, setEventGoogleLocation] = useState({});
  const [eventStartDateTime, setEventStartDateTime] = useState(new Date());
  const [eventEndDateTime, setEventEndDateTime] = useState(new Date());
  const [eventData, setEventData] = useState({});
  const [eventTextLocation, setEventTextLocation] = useState('');

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
      eventType: [eventType],
      owner: eventOwner,
      ownerId: props.user.id,
      coordinator: [eventCoordinator],
      description: eventDescription,
      location:
        eventTextLocation !== ''
          ? eventTextLocation
          : `${eventGoogleLocation.getPlace().name}, ${
          eventGoogleLocation.getPlace().formatted_address
          }`,
      startDateTime: eventStartDateTime,
      endDateTime: eventEndDateTime,
    };

    setEventData(event);
    const resultId = await props.createEvent(event);

    props.history.push(`/myEvents/${resultId}`);
  };

  return (
    <div>
      <form
        id="createEventForm"
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
            <SwiperSlide style={{ overflow: 'scroll' }}>
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
                <label className="pink" htmlFor="class-reunion">
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
                <label className="pink" htmlFor="family-reunion">
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
                <label className="pink" htmlFor="anniversary-party">
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
                <label className="pink" htmlFor="baby-shower">
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
                <label className="pink" htmlFor="other-gathering">
                  <div className="flex column aItemsC jContentC centeredLabel">
                    <p className="whiteBtnTextCE">Other Gathering</p>
                  </div>
                </label>
              </div>
            </SwiperSlide>
            <SwiperSlide>
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
                    className="createEventInput"
                    value={eventName}
                    onChange={(event) => {
                      handleChange(event, setEventName);
                    }}
                  ></input>
                  <div
                    className="swiper-no-swiping"
                    style={{ width: '50vw' }}
                  ></div>
                  {/* CHANGE COORDINATOR TEXTBOX TO LIST that populates on enter and then a confirm button to add to array */}
                  {/* vvv consider deleting vvv */}
                  <input
                    type="text"
                    name="coordinators"
                    className="createEventInput"
                    placeholder="Enter coordinators' names here"
                    value={eventCoordinator}
                    onChange={(event) => {
                      handleChange(event, setEventCoordinator);
                    }}
                  ></input>
                </div>
                <textarea
                  type="textarea"
                  name="description"
                  className="createEventTextArea"
                  placeholder="Enter description of your event"
                  value={eventDescription}
                  onChange={(event) => {
                    handleChange(event, setEventDescription);
                  }}
                ></textarea>
              </div>
            </SwiperSlide>
            <SwiperSlide>
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
                style={{ height: '100vh' }}
              >
                <DateTimePicker
                  startDateTime={eventStartDateTime}
                  setStartDateTime={setEventStartDateTime}
                  endDateTime={eventEndDateTime}
                  setEndDateTime={setEventEndDateTime}
                />
              </div>
            </SwiperSlide>

            <SwiperSlide style={{ overflow: 'scroll' }}>
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
            <SwiperSlide style={{ overflow: 'scroll' }}>
              <div id="eventConf" className="flex column aItemsFS">
                <h1>Event Confirmation</h1>
                <div className="eventConfLine">
                  <p className="eventConfBold">Event Name: </p>
                  <p className="eventConfValue">{eventName}</p>
                </div>
                <div className="eventConfLine">
                  <p className="eventConfBold">Event Type: </p>
                  <p className="eventConfValue">{eventType}</p>
                </div>
                <div className="eventConfLine">
                  <p className="eventConfBold">Host: </p>
                  <p className="eventConfValue">{eventOwner}</p>
                </div>
                <div className="eventConfLine">
                  <p className="eventConfBold">Coordinator: </p>
                  <p className="eventConfValue">{eventCoordinator}</p>
                </div>
                <div
                  className="eventConfLine"
                  style={{ maxWidth: '100%', alignItems: 'flex-start' }}
                >
                  <p className="eventConfBold">Description: </p>
                  {eventDescription.length ? (
                    <div id="descriptionConfContainer">
                      <p className="eventConfValue">{eventDescription}</p>
                    </div>
                  ) : (
                      false
                    )}
                </div>
                {eventTextLocation !== '' ? (

                  <div className="eventConfLine">
                    <p className="eventConfBold">Location: </p>
                    <div id="eventLocationConf">
                      <p className="eventConfValue">{eventTextLocation}</p>
                    </div>
                  </div>
                ) : (

                    <div className="eventConfLine">
                      <p className="eventConfBold">Location: </p>
                      <div id="eventLocationConf">
                        {eventGoogleLocation.gm_bindings_ &&
                          eventGoogleLocation.getPlace() ? (
                            <p className="eventConfValue">
                              {eventGoogleLocation.getPlace().name},
                              {eventGoogleLocation.getPlace().formatted_address}
                            </p>
                          ) : (
                            false
                          )}
                      </div>
                    </div>
                  )}

                <div className="eventConfLine">
                  <p className="eventConfBold">Start Date: </p>
                  <p className="eventConfValue">
                    {dateFormat(eventStartDateTime)}
                  </p>
                </div>
                <div className="eventConfLine">
                  <p className="eventConfBold">End Date: </p>
                  <p className="eventConfValue">
                    {dateFormat(eventEndDateTime)}
                  </p>
                </div>
                <div className="eventConfLine">
                  <p className="eventConfBold">Start Time: </p>
                  <p className="eventConfValue">
                    {eventStartDateTime.toLocaleTimeString('en-US', {
                      hour12: true,
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <div className="eventConfLine">
                  <span className="eventConfBold">End Time: </span>
                  <p className="eventConfValue">
                    {eventEndDateTime.toLocaleTimeString('en-US', {
                      hour12: true,
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <button type="submit" className="button createEventButton">
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
