import React from 'react';

// GLOBAL VARIABLES
import { INTERFACE, REPORTS, SETTINGS } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// ROUTER COMPONENTS
import { Redirect, Route, Switch } from "react-router-dom";

// ROUTES
import Categories from './reports/Categories';
import EmailReports from './reports/EmailReports';
import Index from './reports/Index';

// MAIN COMPONENT
const Reports = () => (
  <Switch>
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.reports, REPORTS.categories)}
      component={Categories}
    />
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.reports, REPORTS.emailReports)}
      component={EmailReports}
    />
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.reports)}
      component={Index}
    />
    <Redirect to={{
      pathname: makePath(INTERFACE.settings, SETTINGS.reports),
    }} />
  </Switch>
)

// EXPORT
export default Reports;
