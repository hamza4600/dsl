import React from 'react';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// ROUTER COMPONENTS
import { Redirect, Route, Switch } from "react-router-dom";

// SCREENS
import AlertsModals from './routes/AlertsModals';
import FormElements from './routes/FormElements';

// MAIN COMPONENT
const PatternLibrary = () => (
  <Switch>
    <Route
      path={makePath('forms')}
      component={FormElements}
    />
    <Route
      path={makePath('alerts')}
      component={AlertsModals}
    />
    <Redirect to={makePath('forms')} />
  </Switch>
)

// EXPORT
export default PatternLibrary;
