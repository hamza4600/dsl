import React from 'react';

// GLOBAL VARIABLES
import { INTERFACE, SETTINGS } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// ROUTER COMPONENTS
import { Redirect, Route, Switch } from "react-router-dom";

// ROUTES
import AMFinance from './settings/AMFinance';
import CustomerRebates from './settings/CustomerRebates';
import DealerForms from './settings/DealerForms';
import DealerIncentives from './settings/DealerIncentives';
import InventoryPacks from './settings/InventoryPacks';
import DealPacks from './settings/DealPacks';
import DealerSettings from './settings/DealerSettings';
import DynamicForms from './settings/DynamicForms';
import EmailSettings from './settings/EmailSettings';
import Reports from './settings/Reports';
import SpotInstructions from './settings/SpotInstructions';
import Staff from './settings/Staff';
import Users from './settings/Users';

// MAIN COMPONENT
const Settings = () => (
  <Switch>
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.amFinance)}
      component={AMFinance}
    />
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.dealerSettings)}
      component={DealerSettings}
    />
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.emailSettings)}
      component={EmailSettings}
    />
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.inventoryPacks)}
      component={InventoryPacks}
    />
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.dealPacks)}
      component={DealPacks}
    />
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.customerRebates)}
      component={CustomerRebates}
    />
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.dealerForms)}
      component={DealerForms}
    />
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.dealerIncentives)}
      component={DealerIncentives}
    />
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.spotInstructions)}
      component={SpotInstructions}
    />
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.reports)}
      component={Reports}
    />
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.dynamicForms)}
      component={DynamicForms}
    />
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.staff)}
      component={Staff}
    />
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.Users)}
      component={Users}
    />
    <Redirect to={{
      pathname: makePath(INTERFACE.settings, SETTINGS.amFinance),
    }} />
  </Switch>
)

// EXPORT
export default Settings;
