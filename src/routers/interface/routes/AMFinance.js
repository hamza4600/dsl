import React, { useEffect } from 'react';

// GLOBAL VARIABLES
import { INTERFACE } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// ROUTER COMPONENTS
import { Redirect, Route, Switch } from 'react-router-dom';

// ROUTES
import List from './amFinance/AMFinance';
import View from './amFinance/View';
import Edit from './amFinance/Edit';

// MAIN COMPONENT
const AMFinance = () => {
  return (
    <Switch>
      <Route path={makePath(INTERFACE.amFinance)} component={List} exact />
      <Route path={makePath(INTERFACE.amFinance, 'view', ':recordID')} component={View} exact />
      <Route path={makePath(INTERFACE.amFinance, 'edit', ':recordID')} component={Edit} exact />
      <Redirect to={makePath(INTERFACE.amFinance)} />
    </Switch>
  );
};

// EXPORT
export default AMFinance;
