import React from 'react';

// GLOBAL VARIABLES
import { INTERFACE, INVENTORY } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// ROUTER COMPONENTS
import { Redirect, Route, Switch } from 'react-router-dom';

// ROUTES
import Delivered from './inventory/Delivered';
import Funded from './inventory/Funded';
import InStock from './inventory/InStock';
import PriceAnalysis from './inventory/PriceAnalysis';
import Problems from './inventory/Problems';
import InventoryAdd from './inventory/Add';
import InventoryEdit from './inventory/Edit';
import InventoryView from './inventory/view/View';

// MAIN COMPONENT
const Inventory =() =>(
  <Switch>
    <Route path={makePath(INTERFACE.inventory, INVENTORY.inStock)} component={InStock} exact />
    <Route path={makePath(INTERFACE.inventory, INVENTORY.priceAnalysis)} component={PriceAnalysis} exact />
    <Route path={makePath(INTERFACE.inventory, INVENTORY.problems)} component={Problems} exact />
    <Route path={makePath(INTERFACE.inventory, INVENTORY.delivered)} component={Delivered} exact />
    <Route path={makePath(INTERFACE.inventory, INVENTORY.funded)} component={Funded} exact />
    <Route path={makePath(INTERFACE.inventory, 'add')} component={InventoryAdd} exact />
    <Route path={makePath(INTERFACE.inventory, 'view', ':recordID')} component={InventoryView} exact />
    <Route path={makePath(INTERFACE.inventory, 'edit', ':recordID')} component={InventoryEdit} exact />
    <Redirect to={makePath(INTERFACE.inventory, INVENTORY.inStock)} />
  </Switch>
);

// EXPORT
export default Inventory;
