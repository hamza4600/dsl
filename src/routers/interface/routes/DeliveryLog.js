import React from 'react';

// GLOBAL VARIABLES
import { DELIVERY_LOG, INTERFACE,} from 'pathnames.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// ROUTER COMPONENTS
import { Redirect, Route, Switch } from "react-router-dom";

// ROUTES
import DealPosting from './deliveryLog/DealPosting';
import Delivered from './deliveryLog/Delivered';
import Funded from './deliveryLog/Funded';
import Overview from './deliveryLog/Overview';
import Rebilled from './deliveryLog/Rebilled';

// MAIN COMPONENT
const DeliveryLog = () =>(
  <Switch>
    <Route
      path={makePath(INTERFACE.deliveryLog, DELIVERY_LOG.overview)}
      component={Overview}
    />
    <Route
      path={makePath(INTERFACE.deliveryLog, DELIVERY_LOG.delivered)}
      component={Delivered}
    />
    <Route
      path={makePath(INTERFACE.deliveryLog, DELIVERY_LOG.rebilled)}
      component={Rebilled}
    />
    <Route
      path={makePath(INTERFACE.deliveryLog, DELIVERY_LOG.dealPosting)}
      component={DealPosting}
    />
    <Route
      path={makePath(INTERFACE.deliveryLog, DELIVERY_LOG.funded)}
      component={Funded}
    />
    <Redirect to={makePath(INTERFACE.deliveryLog, DELIVERY_LOG.overview)} />
  </Switch>
)

// EXPORT
export default DeliveryLog;
