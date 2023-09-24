import React from 'react';

// GLOBAL VARIABLES
import { INTERFACE, SETTINGS } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// ROUTER COMPONENTS
import { Redirect, Route, Switch } from "react-router-dom";

// ROUTES
import ListDealerForms from './dealerForms/ListDealerForms';
import UpdateDealerForm from './dealerForms/UpdateDealerForm';

// MAIN COMPONENT
const DealerForms = () => (
  <Switch>
    <Route
      path={[
        makePath(INTERFACE.settings, SETTINGS.dealerForms, 'add'),
        makePath(INTERFACE.settings, SETTINGS.dealerForms, 'edit', ':recordID')
      ]}
      component={UpdateDealerForm}
    />
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.dealerForms)}
      component={ListDealerForms}
    />
    <Redirect to={{
      pathname: makePath(INTERFACE.settings, SETTINGS.dealerForms),
    }} />
  </Switch>
)

// EXPORT
export default DealerForms;
