import React, { useEffect } from 'react';

// GLOBAL VARIABLES
import { ACCOUNTING_TASKS, INTERFACE } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// ROUTER COMPONENTS
import { Redirect, Route, Switch } from "react-router-dom";

// ROUTES
import Backend from './accountingTasks/Backend';
import DealCount from './accountingTasks/DealCount';
import Frontend from './accountingTasks/Frontend';

// MAIN COMPONENT
const AccountingTasks = () => (
  <Switch>
    <Route
      path={makePath(INTERFACE.accountingTasks, ACCOUNTING_TASKS.dealCount)}
      component={DealCount}
    />
    <Route
      path={makePath(INTERFACE.accountingTasks, ACCOUNTING_TASKS.frontend)}
      component={Frontend}
    />
    <Route
      path={makePath(INTERFACE.accountingTasks, ACCOUNTING_TASKS.backend)}
      component={Backend}
    />
    <Redirect to={{
      pathname: makePath(INTERFACE.accountingTasks, ACCOUNTING_TASKS.dealCount),
    }} />
  </Switch>
)

// EXPORT
export default AccountingTasks;
