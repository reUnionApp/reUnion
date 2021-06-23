import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../store/index';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
    <div
      style={{
        marginBottom: '10px',
      }}
    >
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link to="/">reUnion</Link> {new Date().getFullYear()}
        {'.'}
      </Typography>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  login: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));

const LoginForm = (props) => {
  const classes = useStyles();
  const { login, error } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password);
  };

  return (
    <div className="flex column aItemsC" style={{ width: '100%' }}>
      <Container
        component="main"
        maxWidth="xs"
        style={{ height: '100vh', margin: '0px' }}
        className={classes.login}
      >
        <CssBaseline />
        <div className={`${classes.paper} signInContainer`}>
          <img
            className="loginLogoImg"
            src="/reUnion_Logo.png"
            alt="reUnion logo"
          />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              value={email}
            />
            <TextField
              variant="outlined"
              margin="normal"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!email || !password}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <div className="loginLinkPosition">
                  <Link to="/" className="loginLink loginLinkPosition">
                    Forgot password?
                  </Link>
                </div>
              </Grid>
              <Grid item>
                <p className="loginLinkPosition">
                  Don't have an account?{' '}
                  <Link to="/signup" className="loginLink">
                    Sign Up
                  </Link>
                </p>
              </Grid>
            </Grid>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
};

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.authReducer.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    login: (email, password) => {
      dispatch(login(email, password));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(LoginForm);

/**
 * PROP TYPES
 */
LoginForm.propTypes = {
  error: PropTypes.object,
};

export default LoginForm;
