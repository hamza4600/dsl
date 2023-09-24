import React from 'react';

// GLOBAL VARIABLES
import { AM_FINANCE, INTERFACE, SETTINGS } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// ROUTER COMPONENTS
import { Redirect, Route, Switch } from "react-router-dom";

// ROUTES
import LenderList from './amFinance/lenders/List';
import LenderUpdate from './amFinance/lenders/Update';
import ProductList from './amFinance/products/List';
import ProductUpdate from './amFinance/products/Update';

// MAIN COMPONENT
const AMFinance = () => (
  <Switch>
    {/* LENDERS */}
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.amFinance, AM_FINANCE.lenders)}
      component={LenderList}
      exact
    />
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.amFinance, AM_FINANCE.lenders, 'add')}
      component={LenderUpdate}
    />
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.amFinance, AM_FINANCE.lenders, 'edit', ':recordID')}
      component={LenderUpdate}
    />

    {/* PRODUCTS */}
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.amFinance, AM_FINANCE.products)}
      component={ProductList}
      exact
    />
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.amFinance, AM_FINANCE.products, 'add')}
      component={ProductUpdate}
    />
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.amFinance, AM_FINANCE.products, 'edit', ':recordID')}
      component={ProductUpdate}
    />

    {/* REDIRECT */}
    <Redirect to={{
      pathname: makePath(INTERFACE.settings, SETTINGS.amFinance, AM_FINANCE.lenders),
    }} />
  </Switch>
)

// EXPORT
export default AMFinance;
