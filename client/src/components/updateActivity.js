//React/Redux
import React, { useState, useEffect, useRef } from 'react';
import {
  getEvent,
  getActivity,
  updateActivity,
  removeActivity,
} from '../store';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// React component imports
import { DateTimePicker } from './index.js';

// CSS imports
import '../styles/create.css';

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

const UpdateActivity = (props) => {
  const [activityName, setActivityName] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const [activityLocation, setActivityLocation] = useState('');
  const [activityStartDateTime, setActivityStartDateTime] = useState('');
  const [activityEndDateTime, setActivityEndDateTime] = useState('');
  const [activityData, setActivityData] = useState({});
  const [googleLocation, setGoogleLocation] = useState({});
  const [textLocation, setTextLocation] = useState('');
  const locationUpdate = useRef(false);

  const classes = useStyles();

  useEffect(() => {
    props.getEvent(props.match.params.eventId);
    props.getActivity(
      props.match.params.eventId,
      props.match.params.activityId
    );
  }, []);

  useEffect(() => {
    setActivityName(props.activity.activityName);
    setActivityDescription(props.activity.description);
    setActivityLocation(props.activity.location);
    setActivityStartDateTime(props.activity.startDateTime);
    setActivityEndDateTime(props.activity.endDateTime);
  }, [props]);

  const handleChange = function (activity, hook) {
    activity.preventDefault();
    hook(activity.target.value);
  };

  const handleDateTimeChange = (activity, hook) => {
    hook(activity);
  };

  const dateFormat = (date) => {
    let dateObj = date;
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    return month + '/' + day + '/' + year;
  };

  const submitActivityForm = async function (click) {
    click.preventDefault();

    let activity = {
      activityName: activityName,
      description: activityDescription,
      location:
        locationUpdate.current === true
          ? googleLocation.getPlace().formatted_address
            ? `${googleLocation.getPlace().formatted_address}`
            : `${googleLocation.getPlace().name}`
          : activityLocation,
      startDateTime: activityStartDateTime,
      endDateTime: activityEndDateTime,
    };

    setActivityData(activity);

    const eventId = props.match.params.eventId;
    const activityId = props.match.params.activityId;

    const resultId = await props.updateActivity(eventId, activityId, activity);

    props.history.push(`/myEvents/${eventId}/activities/${resultId}`);
  };

  const onLoad = (input) => {
    console.log('autocomplete: ', input);

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
    <div className="flex column jContentC aItemsC background2Down">
      <div
        className="flex column layout jContentC aItemsC"
        style={{ textAlign: 'center', marginBottom: '50px' }}
      >
        <h1>Update {props.activity.activityName}:</h1>
        <form
          className="updateForm"
          onSubmit={submitActivityForm}
          onKeyPress={(e) => {
            e.key === 'Enter' && e.preventDefault();
          }}
        >
          <div className="flex column">
            <div className="boldLabel flex jContentSB marginBottom">
              Activity Name:
              <input
                style={{ width: '50%' }}
                type="text"
                name="activityName"
                placeholder="Activity Name"
                value={activityName}
                onChange={(click) => {
                  handleChange(click, setActivityName);
                }}
              ></input>
            </div>
            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                inputValue={dateFormat(new Date(activityStartDateTime))}
                onChange={(click) => {
                  handleDateTimeChange(click, setActivityStartDateTime);
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
                inputValue={new Date(activityStartDateTime).toLocaleTimeString(
                  'en-US',
                  {
                    hour12: true,
                    hour: '2-digit',
                    minute: '2-digit',
                  }
                )}
                onChange={(click) => {
                  handleDateTimeChange(click, setActivityStartDateTime);
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
                inputValue={dateFormat(new Date(activityEndDateTime))}
                onChange={(click) => {
                  handleDateTimeChange(click, setActivityEndDateTime);
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
                inputValue={new Date(activityEndDateTime).toLocaleTimeString(
                  'en-US',
                  {
                    hour12: true,
                    hour: '2-digit',
                    minute: '2-digit',
                  }
                )}
                onChange={(click) => {
                  handleDateTimeChange(click, setActivityEndDateTime);
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider> */}
            <div
              className="marginBottom flex column"
              style={{ margin: '20px 0px 0px 0px' }}
            >
              <DateTimePicker
                startDateTime={activityStartDateTime}
                setStartDateTime={setActivityStartDateTime}
                endDateTime={activityEndDateTime}
                setEndDateTime={setActivityEndDateTime}
              />
            </div>
            <div
              className="boldLabel flex jContentSB marginBottom"
              style={{ margin: '20px 0px 0px 0px' }}
            >
              Address:
            </div>
            <div style={{ marginBottom: '10px' }}>
              <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE}
                libraries={['places']}
              >
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                  <input
                    type="text"
                    defaultValue={activityLocation}
                    style={{ width: '100%' }}
                  />
                </Autocomplete>
              </LoadScript>
            </div>

            {/* <div className="swiper-no-swiping" style={{ width: '50vw' }}>
          <GooglePlacesAutocomplete
            apiKey={process.env.REACT_APP_GOOGLE}
            selectProps={{
              activityLocation,
              onChange: setActivityLocation,
            }}
          />
        </div> */}
            <div
              className="boldLabel flex jContentSB marginBottom"
              style={{ margin: '20px 0px 0px 0px' }}
            >
              Description:
            </div>
            <div style={{ width: '290px' }}>
              <textarea
                style={{ overflow: 'hidden', maxWidth: '100%', width: '100%' }}
                type="textarea"
                name="description"
                placeholder="Enter description of your activity"
                value={activityDescription}
                onChange={(click) => {
                  handleChange(click, setActivityDescription);
                }}
              ></textarea>
            </div>
            <button type="submit" className="button createButton">
              Update Activity
            </button>
            <Link to={`/myEvents/${props.match.params.eventId}/activities/${props.match.params.activityId}`} className='flex jContentC aItemsC' style={{ margin: '0px auto' }}>
              <button type="submit" className="button" style={{ marginBottom: '55px', backgroundColor: '#e400678e' }}>
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapState = (state) => ({
  activity: state.activityReducer,
  user: state.authReducer,
});

const mapDispatch = (dispatch) => ({
  getEvent: (id) => dispatch(getEvent(id)),
  getActivity: (eventId, activityId) =>
    dispatch(getActivity(eventId, activityId)),
  updateActivity: (eventId, activityId, activity) =>
    dispatch(updateActivity(eventId, activityId, activity)),
});

export default connect(mapState, mapDispatch)(UpdateActivity);
