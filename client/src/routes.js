import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, location } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Login,
  Signup,
  LandingPage,
  Navbar,
  NavbarTop,
  CreateEvent,
  MyEvents,
  SingleEvent,
  UpdateEvent,
  AllActivities,
  SingleActivity,
  CreateActivity,
  UpdateActivity,
  AllUsers,
  Profile,
  UpdateProfile,
  GuestList,
  Animation,
  Loading,
  Darken,
} from './components';

import { me } from './store';

class Routes extends Component {
  constructor(props) {
    super();
  }
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    let animationKey = localStorage.getItem('animationPlayed');

    return (
      <>
        {animationKey !== 'true' && <Animation />}
        <Switch>
          {isLoggedIn ? (
            <>
              <NavbarTop />
              <Darken />
              <Switch>
                <Route exact path="/users" component={AllUsers} />
                <Route
                  exact
                  path="/myEvents/:eventId/activities/:activityId/update"
                  component={UpdateActivity}
                />
                <Route
                  exact
                  path="/myEvents/:eventId/activities/:activityId"
                  component={SingleActivity}
                />
                <Route
                  exact
                  path="/myEvents/:eventId/activities"
                  component={AllActivities}
                />
                <Route
                  exact
                  path="/myEvents/:eventId/createActivity"
                  component={CreateActivity}
                />
                <Route
                  exact
                  path="/myEvents/:eventId/update"
                  component={UpdateEvent}
                />
                <Route
                  exact
                  path="/myEvents/:eventId/guestList"
                  component={GuestList}
                />
                <Route
                  exact
                  path="/myEvents/:eventId"
                  component={SingleEvent}
                />
                <Route exact path="/myEvents" component={MyEvents} />
                <Route exact path="/updateprofile" component={UpdateProfile} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/createEvent" component={CreateEvent} />
                <Route exact path="/" component={MyEvents} />
              </Switch>
              <Route path="/" component={Navbar} />
            </>
          ) : (
            <>
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/landingPage" component={LandingPage} />
                <Route component={Login} />
              </Switch>
            </>
          )}
        </Switch>
      </>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey

    isLoggedIn: !!state.authReducer.id,
    isAdmin: !!state.authReducer.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
