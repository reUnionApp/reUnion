//React/Redux
import React, { useState, useEffect, useRef } from "react";
import { getEvent, updateEvent, removeEvent } from "../store";
import { connect } from "react-redux";

// CSS imports
import "../styles/create.css";

// MaterialUI
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

// react calendar and clock
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

// React component imports

import {
  Autocomplete,
  StandaloneSearchBox,
  LoadScript,
  GoogleMap,
} from "@react-google-maps/api";

// .env config
import dotenv from "dotenv";
import { CompareArrowsOutlined } from "@material-ui/icons";
dotenv.config();

// MaterialUI Styling
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

const UpdateEvent = (props) => {
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventOwner, setEventOwner] = useState(props.user.firstName);
  const [eventCoordinator, setEventCoordinator] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventStartDateTime, setEventStartDateTime] = useState("");
  const [eventEndDateTime, setEventEndDateTime] = useState("");
  const [eventData, setEventData] = useState({});
  const [googleLocation, setGoogleLocation] = useState({});
  const [textLocation, setTextLocation] = useState("");
  const locationUpdate = useRef(false);

  const classes = useStyles();

  useEffect(() => {
    props.getEvent(props.match.params.eventId);
  }, []);

  useEffect(() => {
    setEventName(props.event.eventName);
    setEventType(props.event.eventType);
    setEventCoordinator(props.event.coordinator);
    setEventDescription(props.event.description);
    setEventLocation(props.event.location);
    setEventStartDateTime(props.event.startDateTime);
    setEventEndDateTime(props.event.endDateTime);
  }, [props]);

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

    return month + "/" + day + "/" + year;
  };

  const submitEventForm = async function (click) {
    click.preventDefault();

    let event = {
      eventName: eventName,
      eventType: [eventType],
      owner: eventOwner,
      ownerId: props.user.id,
      coordinator: [eventCoordinator],
      description: eventDescription,
      location:
        locationUpdate.current === true
          ? googleLocation.getPlace().formatted_address
            ? `${googleLocation.getPlace().name}, ${
                googleLocation.getPlace().formatted_address
              }`
            : `${googleLocation.getPlace().name}`
          : eventLocation,
      startDateTime: eventStartDateTime,
      endDateTime: eventEndDateTime,
    };

    setEventData(event);

    const resultId = await props.updateEvent(props.match.params.eventId, event);

    props.history.push(`/myEvents/${resultId}`);
  };

  const onLoad = (input) => {
    console.log("autocomplete: ", input);

    setGoogleLocation(input);
  };

  const onPlaceChanged = () => {
    console.log(999, googleLocation.getPlace());
    if (googleLocation !== null) {
      if (!googleLocation.getPlace().address_components) {
        console.log("here");
        console.log(
          "googleLocation.getPlace().name",
          googleLocation.getPlace().name
        );
        setTextLocation(googleLocation.getPlace().name);
        locationUpdate.current = true;
        return;
      }

      setGoogleLocation({});
      setGoogleLocation(googleLocation);
      console.log("g state after-->", googleLocation);
      setTextLocation("");
      locationUpdate.current = true;
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  return (
    <div
      className="flex column jContentC aItemsC "
      // style={{ marginTop: '50px' }}
    >
      <div className="flex column layout jContentC aItemsC">
        <h1>Update {props.event.eventName}</h1>
        <form
          id="createForm"
          onSubmit={submitEventForm}
          onKeyPress={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
        >
          <div className="flex column">
            <div className="boldLabel flex jContentSB marginBottom">
              Event Type:
              <select
                style={{ width: "50%" }}
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
            </div>
            <div className="boldLabel flex jContentSB marginBottom">
              Event Name:
              <input
                style={{ width: "50%" }}
                type="text"
                name="eventName"
                value={eventName}
                onChange={(event) => {
                  handleChange(event, setEventName);
                }}
              ></input>
            </div>
            <div className="marginBottom">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Start Date"
                    format="MM/dd/yyyy"
                    inputValue={dateFormat(new Date(eventStartDateTime))}
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
                    label="Start Time"
                    inputValue={new Date(eventStartDateTime).toLocaleTimeString(
                      "en-US",
                      {
                        hour12: true,
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                    onChange={(event) => {
                      handleDateTimeChange(event, setEventStartDateTime);
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="End Date"
                    format="MM/dd/yyyy"
                    inputValue={dateFormat(new Date(eventEndDateTime))}
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
                    label="End Time"
                    inputValue={new Date(eventEndDateTime).toLocaleTimeString(
                      "en-US",
                      {
                        hour12: true,
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                    onChange={(event) => {
                      handleDateTimeChange(event, setEventEndDateTime);
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>

            <div className="boldLabel flex jContentSB marginBottom" style={{}}>
              Location:
              <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE}
                libraries={["places"]}
              >
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                  <input type="text" defaultValue={eventLocation} />
                </Autocomplete>
              </LoadScript>
            </div>

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
            <textarea
              type="textarea"
              name="description"
              placeholder="Enter description of your event"
              value={eventDescription}
              onChange={(event) => {
                handleChange(event, setEventDescription);
              }}
            ></textarea>
            <button type="submit" className="button createButton">
              Update Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapState = (state) => ({
  event: state.eventReducer,
  user: state.authReducer,
});

const mapDispatch = (dispatch) => ({
  getEvent: (id) => dispatch(getEvent(id)),
  updateEvent: (eventId, event) => dispatch(updateEvent(eventId, event)),
  removeEvent: (id) => dispatch(removeEvent(id)),
});

export default connect(mapState, mapDispatch)(UpdateEvent);
