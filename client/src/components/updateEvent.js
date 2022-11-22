//React/Redux
import React, { useState, useEffect, useRef } from 'react';
import { getEvent, updateEvent, removeEvent } from '../store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// React component imports
import { DateTimePicker } from './index.js';

// CSS imports
import '../styles/updateEA.css';

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

// React component imports
import {
  Autocomplete,
  StandaloneSearchBox,
  LoadScript,
  GoogleMap,
} from '@react-google-maps/api';

// .env config
import dotenv from 'dotenv';
import { CompareArrowsOutlined } from '@material-ui/icons';
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

const UpdateEvent = (props) => {
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventOwner, setEventOwner] = useState(props.auth.firstName);
  // const [eventCoordinator, setEventCoordinator] = useState("");
  const [eventDescription, setEventDescription] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventStartDateTime, setEventStartDateTime] = useState('');
  const [eventEndDateTime, setEventEndDateTime] = useState('');
  const [eventData, setEventData] = useState({});
  const [googleLocation, setGoogleLocation] = useState({});
  const [textLocation, setTextLocation] = useState('');
  const locationUpdate = useRef(false);

  const classes = useStyles();

  useEffect(() => {
    props.getEvent(props.match.params.eventId);
  }, []);

  useEffect(() => {
    setEventName(props.event.eventName);
    setEventType(props.event.eventType);
    // setEventCoordinator(props.event.coordinator);
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

    return month + '/' + day + '/' + year;
  };

  const submitEventForm = async function (click) {
    click.preventDefault();

    let event = {
      eventName: eventName,
      eventType: eventType,
      owner: eventOwner,
      ownerId: props.auth.id,
      // coordinator: [eventCoordinator],
      description: eventDescription,
      location:
        locationUpdate.current === true
          ? googleLocation.getPlace().formatted_address
            ? `${googleLocation.getPlace().formatted_address}`
            : `${googleLocation.getPlace().name}`
          : eventLocation,
      startDateTime: eventStartDateTime,
      endDateTime: eventEndDateTime,
    };

    setEventData(event);

    const resultId = await props.updateEvent(props.match.params.eventId, event);

    if (resultId !== undefined) {
      props.history.push(`/myEvents/${resultId.id}`);
    }
  };

  const onLoad = (input) => {
    setGoogleLocation(input);
  };

  const onPlaceChanged = () => {
    if (googleLocation !== null) {
      if (!googleLocation.getPlace().address_components) {
        setTextLocation(googleLocation.getPlace().name);
        locationUpdate.current = true;
        return;
      }

      setGoogleLocation({});
      setGoogleLocation(googleLocation);
      setTextLocation('');
      locationUpdate.current = true;
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  return (
    <div className="updateMaster flex column jContentC aItemsC background3Up">
      <div className="updateWrapper flex column aItemsC">
        <div className="updateTopButtonRow w100 flex jContentFE">
          <Link
            to={`/myEvents/${props.match.params.eventId}`}
            className="flex jContentC aItemsC"
          >
            <button type="button" className="button cancelUpdateButton">
              Cancel
            </button>
          </Link>
        </div>
        <h1 className="updateEATitle">Update {props.event.eventName}</h1>
        <form
          className="updateForm FSInherit"
          onSubmit={submitEventForm}
          onKeyPress={(e) => {
            e.key === 'Enter' && e.preventDefault();
          }}
        >
          <div className="flex column FSInherit">
            <div className="updateDataRow flex jContentSB marginBottom">
              <label className="boldLabelU" htmlFor="updateEventSelect">
                Event Type:
              </label>
              <select
                id="updateEventSelect"
                style={{ width: '50%' }}
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
            <div className="updateDataRow flex jContentSB marginBottom">
              <label className="boldLabelU" htmlFor="updateEventName">
                Event Name:
              </label>
              <input
                id="updateEventName"
                style={{ width: '50%' }}
                type="text"
                name="eventName"
                value={eventName}
                onChange={(event) => {
                  handleChange(event, setEventName);
                }}
              ></input>
            </div>
            <div className="marginBottom flex column">
              <DateTimePicker
                startDateTime={eventStartDateTime}
                setStartDateTime={setEventStartDateTime}
                endDateTime={eventEndDateTime}
                setEndDateTime={setEventEndDateTime}
              />
            </div>
            <div className="updateDataRow flex column marginBottom">
              <div className="flex jContentSB">
                <label className="boldLabelU" htmlFor="updateEventAddress">
                  Address:
                </label>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <LoadScript
                  googleMapsApiKey={process.env.REACT_APP_GOOGLE}
                  libraries={['places']}
                >
                  <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <input
                      id="updateEventAddress"
                      type="text"
                      defaultValue={eventLocation}
                      style={{ width: '100%' }}
                    />
                  </Autocomplete>
                </LoadScript>
              </div>
            </div>
            <div className="updateDataRow">
              <div className="boldLabelU flex jContentSB marginBottom">
                <label className="boldLabelU" htmlFor="updateEventDescription">
                  Description:
                </label>
              </div>
              <div style={{ width: '290px' }}>
                <textarea
                  id="updateEventDescription"
                  style={{
                    overflow: 'hidden',
                    maxWidth: '100%',
                    width: '100%',
                  }}
                  type="textarea"
                  name="description"
                  placeholder="Enter description of your event"
                  value={eventDescription}
                  onChange={(event) => {
                    handleChange(event, setEventDescription);
                  }}
                ></textarea>
              </div>
            </div>
            <button type="submit" className="updateButton">
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
  auth: state.authReducer,
});

const mapDispatch = (dispatch) => ({
  getEvent: (id) => dispatch(getEvent(id)),
  updateEvent: (eventId, event) => dispatch(updateEvent(eventId, event)),
  removeEvent: (id) => dispatch(removeEvent(id)),
});

export default connect(mapState, mapDispatch)(UpdateEvent);
