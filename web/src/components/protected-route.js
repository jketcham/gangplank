import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { isAuthenticated as isLoggedIn } from '../store/account/selectors';


const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    )}
  />
);

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
};

ProtectedRoute.defaultProps = {
  location: null,
};

const mapStateToProps = state => ({
  isAuthenticated: isLoggedIn(state),
});

const connector = connect(mapStateToProps);


export default connector(ProtectedRoute);
