//React/Redux
import React, { useState, useEffect, useRef } from 'react';
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
  useEffect(async () => {
    await props.getEvent(props.match.params.eventId);
  }, []);

  const [activityName, setActivityName] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const [activityGoogleLocation, setActivityGoogleLocation] = useState({});
  const [activityStartDateTime, setActivityStartDateTime] = useState(null);
  const [activityEndDateTime, setActivityEndDateTime] = useState(null);
  const [activityData, setActivityData] = useState({});
  const [activityTextLocation, setActivityTextLocation] = useState('');

  const threeBalloon1CA = useRef(null);
  const threeBalloon2CA = useRef(null);
  const threeBalloon3CA = useRef(null);
  const CRPulseCA = useRef(null);

  const CRPulseFunc = (e) => {
    const x = e.clientX - e.target.getBoundingClientRect().left;
    const y = e.clientY - e.target.getBoundingClientRect().top;
    CRPulseCA.current.style.left = `${x}px`;
    CRPulseCA.current.style.top = `${y}px`;
    CRPulseCA.current.className = 'CRPulse';
  };

  const handleChange = function (activity, hook) {
    activity.preventDefault();
    hook(activity.target.value);
  };

  if (props.singleEvent.id && activityStartDateTime === null) {
    setActivityStartDateTime(new Date(props.singleEvent.startDateTime));
    setActivityEndDateTime(new Date(props.singleEvent.endDateTime));
  }

  const dateFormat = (date) => {
    if (!date) {
      return;
    }
    let dateObj = date;
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    return month + '/' + day + '/' + year;
  };

  const submitActivityForm = function (click) {
    click.preventDefault();

    threeBalloon1CA.current.classList.add('TB1Float');
    threeBalloon2CA.current.classList.add('TB2Float');
    threeBalloon3CA.current.classList.add('TB3Float');
  };

  const completeSubmit = async () => {
    let activity = {
      activityName: activityName,
      description: activityDescription,
      location:
        activityTextLocation === ''
          ? setActivityTextLocation('')
          : activityGoogleLocation === ''
          ? setActivityGoogleLocation('')
          : activityTextLocation !== ''
          ? activityTextLocation
          : ` ${activityGoogleLocation.getPlace().formatted_address}`,
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
        className="createForm"
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
          <SwiperSlide className="background2Down">
            <div className="flex column aItemsC jContentC CRBalloonBox">
              <img
                src="/pink-balloon.png"
                alt="balloon"
                className="CRBalloonPink"
              />
              <p className="CRStampMessage">What's the activity about?</p>
            </div>
            <div
              style={{
                minHeight: '100%',
                width: '80%',
                margin: '130px 0px 55px 0px',
              }}
              className="flex column jContentFS aItemsC"
            >
              <div
                style={{
                  width: '80%',
                  margin: '0px 0px 36px 0px',
                }}
                className="flex column"
              >
                <input
                  type="text"
                  className="createInput"
                  name="activityName"
                  placeholder="Activity Name"
                  pattern="^((?!~).)*$"
                  value={activityName}
                  onChange={(click) => {
                    handleChange(click, setActivityName);
                  }}
                />
                <div className="swiper-no-swiping" style={{ width: '50vw' }} />
              </div>
              <textarea
                type="textarea"
                name="description"
                className="createTextArea"
                placeholder="Enter description of your activity"
                value={activityDescription}
                onChange={(click) => {
                  handleChange(click, setActivityDescription);
                }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className="background3Up">
            <div className="flex column aItemsC jContentC CRBalloonBox">
              <img
                src="/orange-balloon.png"
                alt="balloon"
                className="CRBalloonOrange"
              />
              <p className="CRStampMessage">Where is this activity?</p>
            </div>
            <div className="googleMapWrapper">
              <GoogleMapComponent
                textLocation={activityTextLocation}
                setTextLocation={setActivityTextLocation}
                googleLocation={activityGoogleLocation}
                setGoogleLocation={setActivityGoogleLocation}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className="background1Down">
            <div className="flex column aItemsC jContentC CRBalloonBox">
              <img
                src="/teal-balloon.png"
                alt="balloon"
                className="CRBalloonTealDTP"
              />
              <p className="CRStampMessageDTP">When is the activity?</p>
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
          <SwiperSlide className="background2Up">
            <div className="CRConfOverflow">
              <div className="CRConfMaster flex column aItemsC jContentC ">
                <div className="CRConfWrapper flex column aItemsFS jContentC">
                  <h1 className="CEEventConfTitle">Activity Confirmation</h1>
                  <div className="TildeErrorDiv flex jContentC aItemsC"></div>
                  <div className="confLine">
                    <p className="confBold">Activity Name: </p>
                    <p className="confValue" style={{ textAlign: 'end' }}>
                      {activityName}
                    </p>
                    {activityName === '' && (
                      <p className="confValueError">NO ACTIVITY NAME</p>
                    )}
                  </div>
                  <div
                    className="confLine"
                    style={{ maxWidth: '100%', alignItems: 'flex-start' }}
                  >
                    <p className="confBold">Description: </p>
                    {activityDescription.length ? (
                      <div className="descriptionConfContainer">
                        <p className="confValueDesc">{activityDescription}</p>
                      </div>
                    ) : (
                      false
                    )}
                  </div>
                  {activityTextLocation !== '' ? (
                    <div className="confLine">
                      <p className="confBold">Location: </p>
                      <div className="locationConf">
                        <p className="confValue">{activityTextLocation}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="confLine">
                      <p className="confBold">Location: </p>
                      <div className="locationConf">
                        {activityGoogleLocation.gm_bindings_ &&
                        activityGoogleLocation.getPlace() ? (
                          <p className="confValue">
                            {activityGoogleLocation.getPlace().name},
                            {
                              activityGoogleLocation.getPlace()
                                .formatted_address
                            }
                          </p>
                        ) : (
                          false
                        )}
                      </div>
                    </div>
                  )}
                  <div className="confLine">
                    <p className="confBold">Start Date: </p>
                    <p className="confValue">
                      {activityStartDateTime &&
                        dateFormat(activityStartDateTime)}
                    </p>
                  </div>
                  <div className="confLine">
                    <p className="confBold">End Date: </p>
                    <p className="confValue">
                      {dateFormat(activityEndDateTime)}
                    </p>
                  </div>
                  <div className="confLine">
                    <p className="confBold">Start Time: </p>
                    <p className="confValue">
                      {activityStartDateTime &&
                        activityStartDateTime.toLocaleTimeString('en-US', {
                          hour12: true,
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                    </p>
                  </div>
                  <div className="confLine">
                    <span className="confBold">End Time: </span>
                    <p className="confValue">
                      {activityEndDateTime &&
                        activityEndDateTime.toLocaleTimeString('en-US', {
                          hour12: true,
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                    </p>
                  </div>
                  <div className="buttonThreeBallonWrapper">
                    <button
                      type="submit"
                      className="createButton"
                      onClick={CRPulseFunc}
                      disabled={activityName === ''}
                    >
                      Create Activity{' '}
                      <span
                        ref={CRPulseCA}
                        onAnimationEnd={() => {
                          CRPulseCA.current.className = '';
                        }}
                      />
                    </button>
                    <img
                      src="/pink-balloon.png"
                      className="threeBalloon1 threeBalloonBalloon"
                      ref={threeBalloon1CA}
                      alt="balloon"
                      onAnimationEnd={() => {
                        completeSubmit();
                      }}
                    />
                    <img
                      src="/teal-balloon.png"
                      className="threeBalloon2 threeBalloonBalloon"
                      ref={threeBalloon2CA}
                      alt="balloon"
                    />
                    <img
                      src="/orange-balloon.png"
                      className="threeBalloon3 threeBalloonBalloon"
                      ref={threeBalloon3CA}
                      alt="balloon"
                    />
                  </div>
                  <div style={{ width: '100%' }}>
                    {activityStartDateTime &&
                    activityEndDateTime &&
                    (Date.parse(activityStartDateTime) <
                      Date.parse(new Date(props.singleEvent.startDateTime)) ||
                      Date.parse(activityEndDateTime) >
                        Date.parse(new Date(props.singleEvent.endDateTime))) ? (
                      <p
                        className="CATimeError"
                        style={{ textAlign: 'center' }}
                      >
                        Warning! This activity starts or ends outside of the
                        main event timeframe
                      </p>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </form>
    </div>
  );
};

const mapState = (state) => ({
  activity: state.activityReducer,
  auth: state.authReducer,
  singleEvent: state.eventReducer,
});

const mapDispatch = (dispatch) => ({
  getEvent: (id) => dispatch(getEvent(id)),
  createActivity: (eventId, activity) =>
    dispatch(createActivity(eventId, activity)),
});

export default connect(mapState, mapDispatch)(CreateActivity);
