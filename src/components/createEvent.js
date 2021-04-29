// React/Redux
import React, { useState, useEffect } from 'react';
import { getEvent, createEvent } from '../store';
import { connect } from 'react-redux';

// React component imports
import { GoogleMapComponent, DateTimePicker, GuestList } from './index.js';

// CSS imports
import '../styles/createEvent.css';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

// .env config
import dotenv from 'dotenv';
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
      <h1 style={{ margin: '0px 0px 0px 15px' }}>Plan Your First Event</h1>
      <form
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
            height: '70vh',
            border: '2px solid red',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <SwiperSlide>
              <div
                id="radioContainer"
                className="flex column aItemsC"
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
              <input
                type="text"
                name="eventName"
                placeholder="Event Name"
                value={eventName}
                onChange={(event) => {
                  handleChange(event, setEventName);
                }}
              ></input>
              <DateTimePicker
                startDateTime={eventStartDateTime}
                setStartDateTime={setEventStartDateTime}
                endDateTime={eventEndDateTime}
                setEndDateTime={setEventEndDateTime}
              />

              <div
                className="swiper-no-swiping"
                style={{ width: '50vw' }}
              ></div>
            </SwiperSlide>
            <SwiperSlide>
              <GoogleMapComponent
                textLocation={eventTextLocation}
                setTextLocation={setEventTextLocation}
                googleLocation={eventGoogleLocation}
                setGoogleLocation={setEventGoogleLocation}
              />
            </SwiperSlide>
            <SwiperSlide>
              {/* CHANGE COORDINATOR TEXTBOX TO LIST that populates on enter and then a confirm button to add to array */}
              <input
                type="text"
                name="coordinators"
                placeholder="Enter coordinators' names here"
                value={eventCoordinator}
                onChange={(event) => {
                  handleChange(event, setEventCoordinator);
                }}
              ></input>
            </SwiperSlide>
            <SwiperSlide>
              <textarea
                type="textarea"
                name="description"
                placeholder="Enter description of your event"
                value={eventDescription}
                onChange={(event) => {
                  handleChange(event, setEventDescription);
                }}
              ></textarea>
            </SwiperSlide>

            <SwiperSlide
              style={{
                marginTop: 0,
                paddingBottom: '30px',
              }}
            >
              <h1>Event Confirmation</h1>
              <ul>eventName: {eventName}</ul>
              <ul>eventType: {eventType}</ul>
              <ul>owner: {eventOwner}</ul>
              <ul>coordinator: {eventCoordinator}</ul>
              <ul>description: {eventDescription}</ul>
              {eventTextLocation !== '' ? (
                <ul>location: {eventTextLocation}</ul>
              ) : (
                <ul>
                  location:{' '}
                  {eventGoogleLocation.gm_bindings_ &&
                  eventGoogleLocation.getPlace()
                    ? `${eventGoogleLocation.getPlace().name}, ${
                        eventGoogleLocation.getPlace().formatted_address
                      }`
                    : false}
                </ul>
              )}
              <ul>startDate: {dateFormat(eventStartDateTime)}</ul>
              <ul>endDate: {dateFormat(eventEndDateTime)}</ul>
              <ul>
                startTime:{' '}
                {eventStartDateTime.toLocaleTimeString('en-US', {
                  hour12: true,
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </ul>
              <ul>
                endTime:{' '}
                {eventEndDateTime.toLocaleTimeString('en-US', {
                  hour12: true,
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </ul>
              <button type="submit">Create Event</button>
            </SwiperSlide>
          </div>
        </Swiper>
      </form>
    </div>
  );
};

const mapState = (state) => ({
  event: state.eventReducer.event,
  user: state.authReducer,
});

const mapDispatch = (dispatch) => ({
  getEvent: (id) => dispatch(getEvent(id)),
  createEvent: (event) => dispatch(createEvent(event)),
});

export default connect(mapState, mapDispatch)(CreateEvent);
