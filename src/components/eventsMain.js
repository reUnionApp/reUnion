import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, A11y } from "swiper";
import { getEvent, createEvent, updateEvent, removeEvent } from "../store";
import { connect } from "react-redux";

import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";

import Calendar from "react-calendar";
import DateTimePicker from "react-datetime-picker";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

SwiperCore.use([Navigation, Pagination, A11y]);
const EventsMain = (props) => {
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventOwner, setEventOwner] = useState("");
  const [eventCoordinator, setEventCoordinator] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventStartDateTime, setEventStartDateTime] = useState(new Date());
  const [eventEndDateTime, setEventEndDateTime] = useState(new Date());
  // const [eventStartDateTime, setEventStartDateTime] = useState(
  //   new Date(eventStartDate).setHours()
  // );
  // const [eventEndDateTime, setEventEndDateTime] = useState("");
  // const [selectedDate, setSelectedDate] = React.useState(
  //   new Date("2014-08-18T21:11:54")

  const classes = useStyles();

  const handleChange = function (event, hook) {
    event.preventDefault();
    hook(event.target.value);
    // console.log(event.target.value);
  };

  const handleDateTimeChange = (event, hook) => {
    hook(event);
  };

  useEffect(() => {
    console.log(eventStartDateTime, eventEndDateTime);
  }, [eventStartDateTime, eventEndDateTime]);

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
              <option value="classReunion">Class Reunion</option>
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
                    "aria-label": "change date",
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
                    "aria-label": "change time",
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
                    "aria-label": "change date",
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
                    "aria-label": "change time",
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
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
