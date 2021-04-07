import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Login,
  Signup,
  Homepage,
  LandingPage,
  Navbar,
  Hamburger,
  EventsMain,
  EventConfirmation,
} from './components';

import { me } from './store';

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    const { isAdmin } = this.props;

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Homepage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/landingPage" component={LandingPage} />

        {isAdmin && (
          <Switch>
            {/* Routes placed here are only available as as admin */}
          </Switch>
        )}
        {isLoggedIn && (
          <>
            <Hamburger />
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route exact path="/eventsMain" component={EventsMain} />
              <Route
                exact
                path="/eventConfirmation"
                component={EventConfirmation}
              />
            </Switch>
            <Navbar />
          </>
        )}

        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
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
