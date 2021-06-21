import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signup } from '../store/index';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

/**
 * COMPONENT
 */
function Copyright() {
  return (
    <div style={{ marginBottom: '10px' }}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="http://localhost:3000/">
          reUnion
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signUp: {
    height: '100vh',
    margin: '0px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));

const SignUpForm = (props) => {
  const classes = useStyles();
  const { signup, error } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    signup(email, password, firstName, lastName);
  };

  return (
    <div className="flex column aItemsC" style={{ width: '100%' }}>
      <Container component="main" maxWidth="xs" className={classes.signUp}>
        <CssBaseline />
        <div className={classes.paper} style={{ marginTop: '50%' }}>
          <img
            src="reUnion_Logo.png"
            style={{ width: '10vw' }}
            alt="reUnion logo"
          />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                  value={firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                  value={lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  value={password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!email || !password || !firstName || !lastName}
            >
              Sign Up
            </Button>
            <Grid container justify="center">
              <Grid item>
                <Link href="http://localhost:3000/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.authReducer.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    signup: (email, password, firstName, lastName) => {
      dispatch(signup(email, password, firstName, lastName));
    },
  };
};

export const Signup = connect(mapSignup, mapDispatch)(SignUpForm);

/**
 * PROP TYPES
 */
SignUpForm.propTypes = {
  error: PropTypes.object,
};

export default SignUpForm;
