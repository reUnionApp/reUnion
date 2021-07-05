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
        console.log('here');
        console.log(
          'googleLocation.getPlace().name',
          googleLocation.getPlace().name
        );
        setTextLocation(googleLocation.getPlace().name);
        locationUpdate.current = true;
        return;
      }

      setGoogleLocation({});
      setGoogleLocation(googleLocation);
      console.log('g state after-->', googleLocation);
      setTextLocation('');
      locationUpdate.current = true;
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  return (
    <div className="updateMaster flex column jContentC aItemsC background2Down">
      <div className="updateWrapper flex column aItemsC">
        <div className="updateTopButtonRow w100 flex jContentFE">
          <Link
            to={`/myEvents/${props.match.params.eventId}/activities/${props.match.params.activityId}`}
            className="flex jContentC aItemsC"
          >
            <button type="button" className="button cancelUpdateButton">
              Cancel
            </button>
          </Link>
        </div>
        <h1 className="updateEATitle">Update {props.activity.activityName}:</h1>
        <form
          className="updateForm FSInherit"
          onSubmit={submitActivityForm}
          onKeyPress={(e) => {
            e.key === 'Enter' && e.preventDefault();
          }}
        >
          <div className="flex column FSInherit">
            <div className="updateDataRow flex jContentSB marginBottom">
              <label className="boldLabelU" htmlFor="updateActivityName">
                Activity Name:
              </label>
              <input
                id="updateActivityName"
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
            <div className="updateDataRow flex column marginBottom">
              <div className="flex jContentSB" style={{ marginBottom: '10px' }}>
                <label className="boldLabelU" htmlFor="updateActivityAddress">
                  Address:
                </label>
              </div>
              <div>
                <LoadScript
                  googleMapsApiKey={process.env.REACT_APP_GOOGLE}
                  libraries={['places']}
                >
                  <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <input
                      id="updateActivityAddress"
                      type="text"
                      defaultValue={activityLocation}
                      style={{ width: '100%' }}
                    />
                  </Autocomplete>
                </LoadScript>
              </div>
            </div>
            <div className="updateDataRow">
              <div className="boldLabelU flex jContentSB marginBottom">
                <label
                  className="boldLabelU"
                  htmlFor="updateActivityDescription"
                >
                  Description:
                </label>
              </div>
              <div style={{ width: '290px' }}>
                <textarea
                  id="updateActivityDescription"
                  style={{
                    overflow: 'hidden',
                    maxWidth: '100%',
                    width: '100%',
                  }}
                  type="textarea"
                  name="description"
                  placeholder="Enter description of your activity"
                  value={activityDescription}
                  onChange={(click) => {
                    handleChange(click, setActivityDescription);
                  }}
                ></textarea>
              </div>
            </div>
            <button type="submit" className="updateButton">
              Update Activity
            </button>
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
