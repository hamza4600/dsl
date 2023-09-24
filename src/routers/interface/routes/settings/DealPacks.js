import React from 'react';

// GLOBAL VARIABLES
import { INTERFACE, SETTINGS } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// ROUTER COMPONENTS
import { Redirect, Route, Switch } from "react-router-dom";

// ROUTES
import DealPackList from './dealPacks/List';
import DealPackUpdate from './dealPacks/Update';

// MAIN COMPONENT
const DealPacks = () => (
  <Switch>
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.dealPacks)}
      component={DealPackList}
      exact
    />
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.dealPacks, 'add')}
      component={DealPackUpdate}
    />
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.dealPacks, 'edit', ':recordID')}
      component={DealPackUpdate}
    />
    <Redirect to={{
      pathname: makePath(INTERFACE.settings, SETTINGS.dealPacks),
    }} />
  </Switch>
)

// EXPORT
export default DealPacks;
