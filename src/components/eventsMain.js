import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';
import { getEvent, createEvent, updateEvent, removeEvent } from '../store';
import { connect } from "react-redux";

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

SwiperCore.use([Navigation, Pagination, A11y]);

/*
          eventName: faker.lorem.words(4),
          eventType: [faker.random.arrayElement(eTypes)],
          owner: faker.name.findName(),
          coordinator: [`${faker.name.findName()}`],
          description: faker.lorem.words(8),
          location: faker.name.jobArea(),
          startDate: Date.now(),
          endDate: tomorrow,
          startTime: '07:00 AM',
          endTime: '05:00 PM',

          "class reunion",
            "family reunion",
            "anniversary party",
            "baby shower",
            "other gathering",

*/

const EventsMain = (props) => {
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventOwner, setEventOwner] = useState('');
  const [eventCoordinator, setEventCoordinator] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventStartDate, setEventStartDate] = useState('')
  const [eventEndDate, setEventEndDate] = useState('')
  const [eventStartTime, setEventStartTime] = useState('')
  const [eventEndTime, setEventEndTime] = useState('')

  const handleChange = function (event) {
    event.preventDefault();
    setEventName(event.target.eventName)
  }

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
              value="eventName"
              onChange={handleChange}
            ></input>
          </SwiperSlide>
          <SwiperSlide>
            <select>
              <option value="classReunion">Class Reunion</option>
              <option value="familyReunion">Family Reunion</option>
              <option selected value="anniversaryParty">Anniversary Party</option>
              <option value="babyShower">Baby Shower</option>
              <option value="otherGathering">Other Gathering</option>
            </select>
          </SwiperSlide>
          <SwiperSlide>
            <input
              type="text"
              name="eventOwner"
              placeholder="Event Owner's Name"
              value="eventOwner"
            ></input>
          </SwiperSlide>
          <SwiperSlide>
            <input
              type="text"
              name="coordinators"
              placeholder="Enter coordinators' names here"
              value="coordinators"
            ></input>
          </SwiperSlide>
          <SwiperSlide>
            <input
              type="textarea"
              name="description"
              placeholder="Enter description of your event"
              value="description"
            ></input>
          </SwiperSlide>
          <SwiperSlide>
            <input
              type="textarea"
              name="location"
              placeholder="Enter the location of your event"
              value="location"
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
  user: state.authReducer
});

const mapDispatch = (dispatch) => ({
  getEvent: (id) => dispatch(getEvent(id)),
  createEvent: (event) => dispatch(createEvent(event)),
  updateEvent: (event) => dispatch(updateEvent(event)),
  removeEvent: (id) => dispatch(removeEvent(id)),
});

export default connect(mapState, mapDispatch)(EventsMain);
