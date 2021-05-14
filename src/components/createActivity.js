//React/Redux
import React, { useState, useEffect } from 'react';
import { getEvent, createActivity } from '../store';
import { connect } from 'react-redux';

// React component imports
import { GoogleMapComponent, DateTimePicker } from './index.js';

// CSS imports
import '../styles/create.css';

//Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

// react calendar and clock
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

// .env config
import dotenv from 'dotenv';
dotenv.config();

SwiperCore.use([Navigation, Pagination, A11y]);

const CreateActivity = (props) => {
  const [activityName, setActivityName] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const [activityGoogleLocation, setActivityGoogleLocation] = useState({});
  const [activityStartDateTime, setActivityStartDateTime] = useState(
    new Date()
  );
  const [activityEndDateTime, setActivityEndDateTime] = useState(new Date());
  const [activityData, setActivityData] = useState({});
  const [activityTextLocation, setActivityTextLocation] = useState('');

  const handleChange = function (activity, hook) {
    activity.preventDefault();
    hook(activity.target.value);
  };

  const dateFormat = (date) => {
    let dateObj = date;
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    return month + '/' + day + '/' + year;
  };

  const submitActivityForm = async function (click) {
    click.preventDefault(); // disable this after production

    let activity = {
      activityName: activityName,
      description: activityDescription,
      location:
        activityTextLocation !== ''
          ? activityTextLocation
          : `${activityGoogleLocation.getPlace().name}, ${
              activityGoogleLocation.getPlace().formatted_address
            }`,
      startDateTime: activityStartDateTime,
      endDateTime: activityEndDateTime,
    };

    const eventId = props.match.params.eventId;

    const resultId = await props.createActivity(eventId, activity);

    props.history.push(`/myEvents/${eventId}/activities/${resultId}`);
  };

  return (
    <div>
      <form
        id="createForm"
        onSubmit={submitActivityForm}
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
            minHeight: '80vh',
            bottom: '0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          <SwiperSlide>
            <div className="flex column aItemsC jContentC teal cEStamp">
              <p
                style={{
                  textAlign: 'center',
                  fontSize: '12px',
                  margin: '0px 5px',
                }}
              >
                What's the activity about?
              </p>
            </div>
            <div
              style={{
                minHeight: '100%',
                width: '80%',
              }}
              className="flex column jContentC aItemsC"
            >
              <input
                type="text"
                name="activityName"
                placeholder="Activity Name"
                value={activityName}
                onChange={(click) => {
                  handleChange(click, setActivityName);
                }}
                style={{ marginBottom: '30px' }}
              ></input>
              <textarea
                type="textarea"
                name="description"
                className="createTextArea"
                placeholder="Enter description of your activity"
                value={activityDescription}
                onChange={(click) => {
                  handleChange(click, setActivityDescription);
                }}
              ></textarea>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex column aItemsC jContentC teal cEStamp">
              <p
                style={{
                  textAlign: 'center',
                  fontSize: '12px',
                  margin: '0px 5px',
                }}
              >
                When is this activity?
              </p>
            </div>
            <div
              className="flex column jContentC"
              style={{ height: '100vh', width: '60%' }}
            >
              <DateTimePicker
                startDateTime={activityStartDateTime}
                setStartDateTime={setActivityStartDateTime}
                endDateTime={activityEndDateTime}
                setEndDateTime={setActivityEndDateTime}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide style={{ overflow: 'scroll' }}>
            <div className="flex column aItemsC jContentC teal cEStamp">
              <p
                style={{
                  textAlign: 'center',
                  fontSize: '12px',
                  margin: '0px 5px',
                }}
              >
                Where is this activity?
              </p>
            </div>
            <div style={{ margin: '130px 0px 55px 0px' }}>
              <GoogleMapComponent
                textLocation={activityTextLocation}
                setTextLocation={setActivityTextLocation}
                googleLocation={activityGoogleLocation}
                setGoogleLocation={setActivityGoogleLocation}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide style={{ overflow: 'scroll' }}>
            <div id="conf" className="layout flex column aItemsFS">
              <h1>Activity Confirmation</h1>
              <div className="confLine">
                <p className="confBold">Activity Name: </p>
                <p className="confValue" style={{ textAlign: 'end' }}>
                  {activityName}
                </p>
              </div>
              <div
                className="confLine"
                style={{ maxWidth: '100%', alignItems: 'flex-start' }}
              >
                <p className="confBold">Description: </p>
                {activityDescription.length ? (
                  <div id="descriptionConfContainer">
                    <p className="confValue">{activityDescription}</p>
                  </div>
                ) : (
                  false
                )}
              </div>
              {activityTextLocation !== '' ? (
                <div className="confLine">
                  <p className="confBold">Location: </p>
                  <div id="locationConf">
                    <p className="confValue">{activityTextLocation}</p>
                  </div>
                </div>
              ) : (
                <div className="confLine">
                  <p className="confBold">Location: </p>
                  <div id="locationConf">
                    {activityGoogleLocation.gm_bindings_ &&
                    activityGoogleLocation.getPlace() ? (
                      <p className="confValue">
                        {activityGoogleLocation.getPlace().name},
                        {activityGoogleLocation.getPlace().formatted_address}
                      </p>
                    ) : (
                      false
                    )}
                  </div>
                </div>
              )}
              <div className="confLine">
                <p className="confBold">Start Date: </p>
                <p className="confValue">{dateFormat(activityStartDateTime)}</p>
              </div>
              <div className="confLine">
                <p className="confBold">End Date: </p>
                <p className="confValue">{dateFormat(activityEndDateTime)}</p>
              </div>
              <div className="confLine">
                <p className="confBold">Start Time: </p>
                <p className="confValue">
                  {activityStartDateTime.toLocaleTimeString('en-US', {
                    hour12: true,
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <div className="confLine">
                <span className="confBold">End Time: </span>
                <p className="confValue">
                  {activityEndDateTime.toLocaleTimeString('en-US', {
                    hour12: true,
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <button type="submit" className="button createButton">
                Create Activity
              </button>
            </div>
          </SwiperSlide>
        </Swiper>
      </form>
    </div>
  );
};

const mapState = (state) => ({
  activity: state.activityReducer,
  user: state.authReducer,
});

const mapDispatch = (dispatch) => ({
  getEvent: (id) => dispatch(getEvent(id)),
  createActivity: (eventId, activity) =>
    dispatch(createActivity(eventId, activity)),
});

export default connect(mapState, mapDispatch)(CreateActivity);
