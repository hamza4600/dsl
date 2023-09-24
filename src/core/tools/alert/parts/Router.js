import React, { useEffect } from 'react';

// DEPENDENCIES
import { startCase } from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// GLOBAL FUNCTIONS
import { alertFunctions } from 'functions.js';

// LOCAL COMPONENTS
import Alert from './Alert';

// MAIN COMPONENT
const Router = compose(
  connect(
    ({ alerts }) => ({ alerts })
  ),
  withRouter
)(({
  className,
  // REACT ROUTER
  location,
  // REDUX STATE
  alerts,
  // COMPONENT
  limit = alerts.length,
}) => {

  // MOUNT/UNMOUNT LISTENER
  useEffect(
    () => {
      window.addEventListener('beforeunload', alertFunctions.clear)
      return () => {
        window.removeEventListener('beforeunload', alertFunctions.clear)
      }
    },
    []
  )

  // NAVIGATION LISTENER
  useEffect(
    () => {
      const { state: { alerts } = {} } = location;
      alertFunctions.clear(alerts);
    },
    [location]
  )

  // LIMIT LISTENER
  useEffect(
    () => {
      if (alerts.length > limit) alertFunctions.clear([alerts[0]])
    },
    [alerts, limit]
  )

  // RENDER
  return alerts.length < 1 ? null : (
    <div className={className}>
      {alerts.slice(0, limit).map(({type, ...props}, i) => {
        const Component = Alert[startCase(type)] || Alert;

        return <Component key={i} {...props} />;
      })}
    </div>
  )
})

// EXPORT
export default Router;
