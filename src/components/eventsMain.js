import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';
import { getEvent, createEvent, updateEvent, removeEvent } from '../store';
import { connect } from 'react-redux';
import history from '../history';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

import Calendar from 'react-calendar';
import DateTimePicker from 'react-datetime-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// import dotenv from 'dotenv';
// dotenv.config();

import { eventConfirmation } from './eventConfirmation';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

SwiperCore.use([Navigation, Pagination, A11y]);
const EventsMain = (props) => {
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventOwner, setEventOwner] = useState('');
  const [eventCoordinator, setEventCoordinator] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventStartDateTime, setEventStartDateTime] = useState(new Date());
  const [eventEndDateTime, setEventEndDateTime] = useState(new Date());
  const [eventData, setEventData] = useState({});

  const classes = useStyles();

  const handleChange = function (event, hook) {
    event.preventDefault();
    hook(event.target.value);
  };

  const handleDateTimeChange = (event, hook) => {
    hook(event);
  };

  const dateFormat = (date) => {
    let dateObj = date;
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    return month + '/' + day + '/' + year;
  };

  const submitEventForm = function () {
    let startDate = dateFormat(eventStartDateTime);
    let endDate = dateFormat(eventEndDateTime);
    let startTime = eventStartDateTime.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
    });
    let endTime = eventEndDateTime.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
    });

    return {
      eventName: eventName,
      eventType: [eventType],
      owner: eventOwner,
      coordinator: [eventCoordinator],
      description: eventDescription,
      location: eventLocation.label,
      startDate: startDate,
      endDate: endDate,
      startTime: startTime,
      endTime: endTime,
    };
  };

  // const displayEvent = () => {
  //   for (const [key, value] of Object.entries(eventData)) {
  //     return key, value
  //   }
  // }

  useEffect(() => {
    console.log(
      eventName,
      eventType,
      eventOwner,
      eventCoordinator,
      eventDescription,
      eventLocation,
      'START',
      eventStartDateTime,
      'END',
      eventEndDateTime
    );
  }, [
    eventName,
    eventType,
    eventOwner,
    eventCoordinator,
    eventDescription,
    eventLocation,
    eventStartDateTime,
    eventEndDateTime,
  ]);

  return (
    <div>
      <h1>Plan Your First Event</h1>
      <form>
        <Swiper
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          navigation
          style={{ height: '70vh' }}
        >
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
              <option value="class reunion">Class Reunion</option>
              <option value="family reunion">Family Reunion</option>
              <option value="anniversary party">Anniversary Party</option>
              <option value="baby shower">Baby Shower</option>
              <option value="other gathering">Other Gathering</option>
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
              // rows="6"
              // cols="50"
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
            <div className="swiper-no-swiping" style={{ width: '50vw' }}>
              <GooglePlacesAutocomplete
                apiKey={process.env.REACT_APP_GOOGLE}
                selectProps={{
                  eventLocation,
                  onChange: setEventLocation,
                }}
              />
            </div>

            {/* <input
              type="text"
              name="location"
              placeholder="Enter the location of your event"
              value={eventLocation}
              onChange={(event) => {
                handleChange(event, setEventLocation);
              }}
            ></input> */}
          </SwiperSlide>
          <SwiperSlide>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date picker dialog"
                  format="MM/dd/yyyy"
                  value={eventStartDateTime}
                  onChange={(event) => {
                    handleDateTimeChange(event, setEventStartDateTime);
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Time picker"
                  value={eventStartDateTime}
                  onChange={(event) => {
                    handleDateTimeChange(event, setEventStartDateTime);
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </SwiperSlide>
          <SwiperSlide>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date picker dialog"
                  format="MM/dd/yyyy"
                  value={eventEndDateTime}
                  onChange={(event) => {
                    handleDateTimeChange(event, setEventEndDateTime);
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Time picker"
                  value={eventEndDateTime}
                  onChange={(event) => {
                    handleDateTimeChange(event, setEventEndDateTime);
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </SwiperSlide>
          <SwiperSlide>
            <h1>Event Confirmation</h1>
            <ul>eventName: {eventName}</ul>
            <ul>eventType: {eventType}</ul>
            <ul>owner: {eventOwner}</ul>
            <ul>coordinator: {eventCoordinator}</ul>
            <ul>description: {eventDescription}</ul>
            <ul>location: {eventLocation.label}</ul>
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
            <button
              onClick={() => {
                const event = submitEventForm();
                setEventData(event);
                props.createEvent(event);
              }}
            >
              Create Event
            </button>
          </SwiperSlide>
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
  updateEvent: (event) => dispatch(updateEvent(event)),
  removeEvent: (id) => dispatch(removeEvent(id)),
});

export default connect(mapState, mapDispatch)(EventsMain);
