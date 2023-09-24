import React, { useEffect } from 'react';

// GLOBAL VARIABLES
import { INTERFACE } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// ROUTER COMPONENTS
import { Route, Switch } from "react-router-dom";

// ROUTES
import View from './sales/view/View';
import Edit from './sales/edit/Edit';

// MAIN COMPONENT
const Sales = () => (
  <Switch>
    <Route
      path={makePath(INTERFACE.sales, 'view', ':recordID' )}
      component={View}
    />
    <Route
      path={makePath(INTERFACE.sales, 'edit', ':recordID' )}
      component={Edit}
    />
    <Route
      path={makePath(INTERFACE.sales, 'add' )}
      component={Edit}
    />
  </Switch>
)

// EXPORT
export default Sales;
