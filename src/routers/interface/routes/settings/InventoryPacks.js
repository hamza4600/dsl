import React from 'react';

// GLOBAL VARIABLES
import { INTERFACE, SETTINGS } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// ROUTER COMPONENTS
import { Redirect, Route, Switch } from "react-router-dom";

// ROUTES
import InventoryPackList from './inventoryPacks/List';
import InventoryPackUpdate from './inventoryPacks/Update';

// MAIN COMPONENT
const InventoryPacks = () => (
  <Switch>
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.inventoryPacks)}
      component={InventoryPackList}
      exact
    />
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.inventoryPacks, 'add')}
      component={InventoryPackUpdate}
    />
    <Route
      path={makePath(INTERFACE.settings, SETTINGS.inventoryPacks, 'edit', ':recordID')}
      component={InventoryPackUpdate}
    />
    <Redirect to={{
      pathname: makePath(INTERFACE.settings, SETTINGS.inventoryPacks),
    }} />
  </Switch>
)

// EXPORT
export default InventoryPacks;
