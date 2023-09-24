import React from 'react';

// GLOBAL VARIABLES
import { INTERFACE, SETTINGS } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// ROUTER COMPONENTS
import { Redirect, Route, Switch } from "react-router-dom";

// ROUTES
import EmailSettingList from './email/List';
import EmailSettingUpdate from './email/Update';

// MAIN COMPONENT
const EmailSettings = () => (
  <Switch>
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.emailSettings)}
      component={EmailSettingList}
      exact
    />
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.emailSettings, 'edit', ':recordID')}
      component={EmailSettingUpdate}
    />
    <Redirect to={{
      pathname: makePath(INTERFACE.settings, SETTINGS.emailSettings),
    }} />
  </Switch>
)

// EXPORT
export default EmailSettings;
