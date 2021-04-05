import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';
import { getEvent, createEvent, updateEvent, removeEvent } from '../store';
import { connect } from 'react-redux';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

SwiperCore.use([Navigation, Pagination, A11y]);

const EventsMain = (props) => {
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventOwner, setEventOwner] = useState('');
  const [eventCoordinator, setEventCoordinator] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');

  const handleChange = function (event, hook) {
    event.preventDefault();
    hook(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    console.log(eventType);
  }, [eventType]);

  return (
    <div>
      <h1>Plan Your First Event</h1>
      <form>
        <Swiper effect="fade" spaceBetween={0} slidesPerView={1} navigation>
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
          </SwiperSlide>
          <SwiperSlide>
            <select
              onChange={(event) => {
                handleChange(event, setEventType);
              }}
              value={eventType}
            >
              <option selected value="classReunion">
                Class Reunion
              </option>
              <option value="familyReunion">Family Reunion</option>
              <option value="anniversaryParty">Anniversary Party</option>
              <option value="babyShower">Baby Shower</option>
              <option value="otherGathering">Other Gathering</option>
            </select>
          </SwiperSlide>
          <SwiperSlide>
            <input
              type="text"
              name="eventOwner"
              placeholder="Event Owner's Name"
              value={eventOwner}
              onChange={(event) => {
                handleChange(event, setEventOwner);
              }}
            ></input>
          </SwiperSlide>
          <SwiperSlide>
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
              rows="6"
              cols="50"
              type="textarea"
              name="description"
              placeholder="Enter description of your event"
              value={eventDescription}
              onChange={(event) => {
                handleChange(event, setEventDescription);
              }}
            ></textarea>
          </SwiperSlide>
          <SwiperSlide>
            <input
              type="text"
              name="location"
              placeholder="Enter the location of your event"
              value={eventLocation}
              onChange={(event) => {
                handleChange(event, setEventLocation);
              }}
            ></input>
          </SwiperSlide>
          <SwiperSlide>
            <input
              type="text"
              name="startDate"
              placeholder="Enter the start date of your event"
              value="startDate"
            ></input>
          </SwiperSlide>
          <SwiperSlide>
            <input
              type="text"
              name="endDate"
              placeholder="Enter the end date of your event"
              value="endDate"
            ></input>
          </SwiperSlide>
          <SwiperSlide>
            <input
              type="text"
              name="startTime"
              placeholder="Enter the start time of your event"
              value="startTime"
            ></input>
          </SwiperSlide>
          <SwiperSlide>
            <input
              type="text"
              name="endTime"
              placeholder="Enter the end time of your event"
              value="endTime"
            ></input>
          </SwiperSlide>
        </Swiper>
      </form>
      <button>Get Started</button>
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
  updateEvent: (event) => dispatch(updateEvent(event)),
  removeEvent: (id) => dispatch(removeEvent(id)),
});

export default connect(mapState, mapDispatch)(EventsMain);
