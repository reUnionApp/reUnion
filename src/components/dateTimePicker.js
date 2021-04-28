import React, { useState, useEffect } from 'react';

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

// React calendar and clock
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

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

const DateTimePicker = (props) => {
  const handleDateTimeChange = (event, hook) => {
    hook(event);
  };

  const {
    eventStartDateTime,
    setEventStartDateTime,
    eventEndDateTime,
    setEventEndDateTime,
  } = props;

  return (
    <div>
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
    </div>
  );
};

export default DateTimePicker;
