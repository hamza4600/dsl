import React from 'react';

// DEPENDENCIES
import { compose } from 'redux';

// GLOBAL VARIABLES
import { INTERFACE, USER } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// GLOBAL HELPERS
import { sessionTimer } from 'helpers/sessionTimer';

// ROUTER COMPONENTS
import { Redirect, Route, Switch } from "react-router-dom";

// GLOBAL COMPONENTS
import Modal from 'core/tools/modal/Modal';
import Wrapper from 'parts/wrapper/Wrapper';

// ROUTES
import AccountingTasks from './routes/AccountingTasks';
import AMFinance from './routes/AMFinance';
import DailySales from './routes/dailySales/DailySales';
import Dashboard from './routes/Dashboard';
import DealTasks from './routes/DealTasks';
import DeliveryLog from './routes/DeliveryLog';
import EmailSettings from './routes/EmailSettings';
import Fallout from './routes/Fallout';
import Forms from './routes/Forms';
import Sales from './routes/Sales';
import Inventory from './routes/Inventory';
import Notifications from './routes/Notifications';
import Order from './routes/Order';
import Profile from './routes/Profile';
import Settings from './routes/Settings';
import Results from './routes/Results';

// MAIN COMPONENT
const Interface = compose(
  sessionTimer
)(() => (
  <Wrapper>
    <Switch>
      {/* MAIN MENU */}
      <Route
        path={makePath(INTERFACE.dashboard)}
        component={Dashboard}
      />
      <Route
        path={makePath(INTERFACE.forms)}
        component={Forms}
      />
      <Route
        path={makePath(INTERFACE.dailySales)}
        component={DailySales}
      />
      <Route
        path={makePath(INTERFACE.amFinance)}
        component={AMFinance}
      />
      <Route
        path={makePath(INTERFACE.fallout)}
        component={Fallout}
      />
      <Route
        path={makePath(INTERFACE.order)}
        component={Order}
      />
      <Route
        path={makePath(INTERFACE.deliveryLog)}
        component={DeliveryLog}
      />
      <Route
        path={makePath(INTERFACE.sales)}
        component={Sales}
      />
      <Route
        path={makePath(INTERFACE.accountingTasks)}
        component={AccountingTasks}
      />
      <Route
        path={makePath(INTERFACE.dealTasks)}
        component={DealTasks}
      />
      <Route
        path={makePath(INTERFACE.sales)}
        component={Sales}
      />
      <Route
        path={makePath(INTERFACE.inventory)}
        component={Inventory}
      />
      <Route
        path={makePath(INTERFACE.settings)}
        component={Settings}
      />
      {/* USER */}
      <Route
        path={makePath(USER.profile)}
        component={Profile}
      />
      <Route
        path={makePath(USER.emailSettings)}
        component={EmailSettings}
      />
      {/* OTHER */}
      <Route
        path={makePath(INTERFACE.notifications)}
        component={Notifications}
      />
       <Route
        path={makePath(INTERFACE.results)}
        component={Results}
      />
      <Redirect to={{
        pathname: makePath(INTERFACE.dailySales),
      }} />
    </Switch>
    <Modal.Router />
  </Wrapper>
))

// EXPORT
export default Interface;
