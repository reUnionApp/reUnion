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
    startDateTime,
    setStartDateTime,
    endDateTime,
    setEndDateTime,
  } = props;

  return (
    <div
      style={{
        border: '1px solid black',
        borderRadius: '10px',
        // width: '100%',
        alignSelf: 'center',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        padding: '10px',
      }}
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Start Date"
            format="MM/dd/yyyy"
            value={startDateTime}
            onChange={(event) => {
              handleDateTimeChange(event, setStartDateTime);
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Start Time"
            value={startDateTime}
            onChange={(event) => {
              handleDateTimeChange(event, setStartDateTime);
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
            label="End Date"
            format="MM/dd/yyyy"
            value={endDateTime}
            onChange={(event) => {
              handleDateTimeChange(event, setEndDateTime);
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="End Time"
            value={endDateTime}
            onChange={(event) => {
              handleDateTimeChange(event, setEndDateTime);
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
