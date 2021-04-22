//React/Redux
import React, { useState, useEffect } from 'react';
import { getEvent, createEvent } from '../store';
import { connect } from 'react-redux';

//Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

// MaterialUI
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

// react calendar and clock
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

// react google places autocomplete
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

// .env config
import dotenv from 'dotenv';
dotenv.config();

// MaterialUI Styling
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

const CreateEvent = (props) => {
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('class reunion');
  const [eventOwner, setEventOwner] = useState(props.user.firstName);
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

  const submitEventForm = async function (click) {
    click.preventDefault(); // disable this after production

    let startDate = new Date(eventStartDateTime);
    let endDate = new Date(eventEndDateTime);
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

    let event = {
      eventName: eventName,
      eventType: [eventType],
      owner: eventOwner,
      ownerId: props.user.id,
      coordinator: [eventCoordinator],
      description: eventDescription,
      location: eventLocation.label,
      startDate: startDate,
      endDate: endDate,
      startTime: startTime,
      endTime: endTime,
    };

    setEventData(event);
    const resultId = await props.createEvent(event);

    props.history.push(`/myEvents/${resultId}`)



  };

  // useEffect(() => {
  //   props.createEvent({
  //     eventName: 'TEST',
  //     eventType: ['baby shower'],
  //     owner: 'TEST',
  //     coordinator: ['TEST'],
  //     description: 'TEST',
  //     location: 'NYC, NY, USA',
  //     startDate: '2021-04-13',
  //     endDate: '2021-04-13',
  //     startTime: '06:57 PM',
  //     endTime: '06:57 PM',
  //   });
  // }, [eventData]);

  console.log('props', props);

  return (
    <div>
      <h1>Plan Your First Event</h1>
      <form>
        <Swiper
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          navigation
          style={{ height: '70vh', backgroundColor: 'red', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}
        >
          <div>
            <SwiperSlide>
              <select
                onChange={(event) => {
                  handleChange(event, setEventType);
                }}
                value={eventType}
              // defaultValue={eventType}
              >
                {/* <option>Select event type</option> */}
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
                name="eventName"
                placeholder="Event Name"
                value={eventName}
                onChange={(event) => {
                  handleChange(event, setEventName);
                }}
              ></input>
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
              <div className="swiper-no-swiping" style={{ width: '50vw' }}>
                <GooglePlacesAutocomplete
                  apiKey={process.env.REACT_APP_GOOGLE}
                  selectProps={{
                    eventLocation,
                    onChange: setEventLocation,
                  }}
                />
              </div>
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
            <SwiperSlide style={{ marginTop: 0, paddingBottom: '30px', backgroundColor: 'green' }}>
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
                onClick={(click) => {
                  submitEventForm(click);
                }}
              >
                Create Event
            </button>
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
