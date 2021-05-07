//React/Redux
import React, {useState, useEffect} from 'react'
import {getEvent, createActivity} from '../store'
import {connect} from 'react-redux'

// React component imports
import {GoogleMapComponent, DateTimePicker} from './index.js'

//Swiper
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore, {Navigation, Pagination, A11y} from 'swiper'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'

// MaterialUI
import 'date-fns'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

// react calendar and clock
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'

// react google places autocomplete
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

// .env config
import dotenv from 'dotenv'
dotenv.config()

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
}))

SwiperCore.use([Navigation, Pagination, A11y])

const CreateActivity = (props) => {
  const [activityName, setActivityName] = useState('')
  const [activityDescription, setActivityDescription] = useState('')
  const [activityGoogleLocation, setActivityGoogleLocation] = useState({})
  const [activityStartDateTime, setActivityStartDateTime] = useState(new Date())
  const [activityEndDateTime, setActivityEndDateTime] = useState(new Date())
  const [activityData, setActivityData] = useState({})
  const [activityTextLocation, setActivityTextLocation] = useState('')

  const classes = useStyles()

  const handleChange = function (activity, hook) {
    activity.preventDefault()
    hook(activity.target.value)
  }

  const handleDateTimeChange = (activity, hook) => {
    hook(activity)
  }

  const dateFormat = (date) => {
    let dateObj = date
    let month = dateObj.getUTCMonth() + 1 //months from 1-12
    let day = dateObj.getUTCDate()
    let year = dateObj.getUTCFullYear()

    return month + '/' + day + '/' + year
  }

  const submitActivityForm = function (click) {
    click.preventDefault() // disable this after production

    let activity = {
      activityName: activityName,
      description: activityDescription,
      // location:
      //   activityTextLocation !== ''
      //     ? activityTextLocation
      //     : `${activityGoogleLocation.getPlace().name}, ${
      //         activityGoogleLocation.getPlace().formatted_address
      //       }`,
      startDateTime: activityStartDateTime,
      endDateTime: activityEndDateTime,
    }

    const eventId = props.match.params.eventId

    const resultId = props.createActivity(eventId, activity)

    props.history.push(`/myEvents/${eventId}/activities/${resultId}`)
  }

  return (
    <div className="topMargin">
      <div className="flex jContentC w100">
        <h1>Plan Your First Activity</h1>
      </div>
      <form>
        <Swiper
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          navigation
          style={{height: '70vh'}}
          allowTouchMove={false}
        >
          <SwiperSlide>
            <input
              type="text"
              name="activityName"
              placeholder="Activity Name"
              value={activityName}
              onChange={(click) => {
                handleChange(click, setActivityName)
              }}
            ></input>
            <DateTimePicker
              startDateTime={activityStartDateTime}
              setStartDateTime={setActivityStartDateTime}
              endDateTime={activityEndDateTime}
              setEndDateTime={setActivityEndDateTime}
            />
            <div className="swiper-no-swiping" style={{width: '50vw'}}>
              <GoogleMapComponent
                textLocation={activityTextLocation}
                setTextLocation={setActivityTextLocation}
                googleLocation={activityGoogleLocation}
                setGoogleLocation={setActivityGoogleLocation}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <textarea
              type="textarea"
              name="description"
              placeholder="Enter description of your activity"
              value={activityDescription}
              onChange={(click) => {
                handleChange(click, setActivityDescription)
              }}
            ></textarea>
          </SwiperSlide>
          <SwiperSlide>
            <h1>Activity Confirmation</h1>
            <ul>activityName: {activityName}</ul>
            <ul>description: {activityDescription}</ul>
            {activityTextLocation !== '' ? (
              <ul>location: {activityTextLocation}</ul>
            ) : (
              <ul>
                location:{' '}
                {activityGoogleLocation.gm_bindings_ &&
                activityGoogleLocation.getPlace()
                  ? `${activityGoogleLocation.getPlace().name}, ${
                      activityGoogleLocation.getPlace().formatted_address
                    }`
                  : false}
              </ul>
            )}
            <ul>startDate: {dateFormat(activityStartDateTime)}</ul>
            <ul>endDate: {dateFormat(activityEndDateTime)}</ul>
            <ul>
              startTime:{' '}
              {activityStartDateTime.toLocaleTimeString('en-US', {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
              })}
            </ul>
            <ul>
              endTime:{' '}
              {activityEndDateTime.toLocaleTimeString('en-US', {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
              })}
            </ul>
            <button
              onClick={(click) => {
                submitActivityForm(click)
              }}
            >
              Create Activity
            </button>
          </SwiperSlide>
        </Swiper>
      </form>
    </div>
  )
}

const mapState = (state) => ({
  activity: state.activityReducer,
  user: state.authReducer,
})

const mapDispatch = (dispatch) => ({
  getEvent: (id) => dispatch(getEvent(id)),
  createActivity: (eventId, activity) =>
    dispatch(createActivity(eventId, activity)),
})

export default connect(mapState, mapDispatch)(CreateActivity)
