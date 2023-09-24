import React, { useContext } from 'react';

// DEPENDENCIES
import { compose } from 'redux';

// GLOBAL VARIABLES
import { ACCOUNTING_TASKS, AM_FINANCE, DELIVERY_LOG, INTERFACE, INVENTORY, REPORTS, SETTINGS } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// GLOBAL HELPERS // CONTEXT
import { getLookupData } from 'helpers/getLookupData';

// BOOTSTRAP COMPONENTS
import { Nav } from 'react-bootstrap';

// LOCAL COMPONENTS
import MenuItem from '../layout/MenuItem';
import Submenu from '../layout/Submenu';
import CountBadge from '../tools/CountBadge';

// STYLES
import styles from './siteNav.module.scss';
import { MenuContext } from '../helpers/menuContext';

// MAIN COMPONENT
const MenuNav = ({ lookupData = {}, mobile=false}) => {
  const { amfinance_records, order_records, rebilled_eposts } = lookupData;
  const { toggleMenuShow } = useContext(MenuContext);
  return (
    <Nav className={styles.nav}>
      <MenuItem route="dashboard" onClick={() => mobile && toggleMenuShow()} />
      <MenuItem route="forms" onClick={() => mobile && toggleMenuShow()} />
      <MenuItem route="dailySales" onClick={() => mobile && toggleMenuShow()} />
      <MenuItem route="amFinance" label="AM / Finance" after={[<CountBadge count={amfinance_records} />]} onClick={() => toggleMenuShow()} />
      <MenuItem route="fallout" onClick={() => mobile && toggleMenuShow()} />
      <MenuItem route="order" after={[<CountBadge count={order_records} />]} onClick={() => mobile && toggleMenuShow()} />
      <Submenu route="deliveryLog" pathnames={DELIVERY_LOG}>
        <Submenu.Item route="overview" onClick={() => mobile && toggleMenuShow()} />
        <Submenu.Item route="delivered" onClick={() => mobile && toggleMenuShow()} />
        <Submenu.Item route="rebilled" after={[<CountBadge count={rebilled_eposts} color="orange" />]} onClick={() => mobile && toggleMenuShow()} />
        <Submenu.Item route="dealPosting" onClick={() => mobile && toggleMenuShow()} />
        <Submenu.Item route="funded" onClick={() => mobile && toggleMenuShow()} />
      </Submenu>
      <Submenu route="accountingTasks" pathnames={ACCOUNTING_TASKS}>
        <Submenu.Item route="dealCount" onClick={() => mobile && toggleMenuShow()} />
        <Submenu.Item
          route="frontend"
          label={
            <>
              Frontend Gross <br className="d-none d-lg-block" />
              Analysis
            </>
          }
          onClick={() => mobile && toggleMenuShow()} 
        />
        <Submenu.Item
          route="backend"
          label={
            <>
              Backend Gross <br className="d-none d-lg-block" />
              Analysis
            </>
          }
          onClick={() => mobile && toggleMenuShow()} 
        />
      </Submenu>
      <MenuItem route="dealTasks" onClick={() => mobile && toggleMenuShow()} />
      <Submenu route="inventory" pathnames={INVENTORY}>
        <Submenu.Item route="inStock" onClick={() => mobile && toggleMenuShow()} />
        <Submenu.Item route="priceAnalysis" onClick={() => mobile && toggleMenuShow()} />
        <Submenu.Item route="problems" onClick={() => mobile && toggleMenuShow()} />
        <Submenu.Item route="delivered" onClick={() => mobile && toggleMenuShow()} />
        <Submenu.Item route="funded" onClick={() => mobile && toggleMenuShow()}  />
      </Submenu>
      <Submenu route="settings" pathnames={SETTINGS} last>
        <Submenu
          as={Submenu.Item}
          route="amFinance"
          label="AM / Finance"
          pathnames={AM_FINANCE}
          prefix={makePath(INTERFACE.settings, SETTINGS.amFinance)}
          foo
        >
          <Submenu.Item route="products" onClick={() => mobile && toggleMenuShow()} />
          <Submenu.Item route="lenders" onClick={() => mobile && toggleMenuShow()} />
        </Submenu>
        <Submenu.Item route="dealerSettings" onClick={() => mobile && toggleMenuShow()} />
        <Submenu.Item route="emailSettings" onClick={() => mobile && toggleMenuShow()} />
        <Submenu.Item route="inventoryPacks" onClick={() => mobile && toggleMenuShow()} />
        <Submenu.Item route="dealPacks" onClick={() => mobile && toggleMenuShow()} />
        <Submenu.Item route="customerRebates" onClick={() => mobile && toggleMenuShow()} />
        <Submenu.Item route="dealerForms" onClick={() => mobile && toggleMenuShow()} />
        <Submenu.Item route="dealerIncentives" onClick={() => mobile && toggleMenuShow()} />
        <Submenu.Item route="spotInstructions" onClick={() => mobile && toggleMenuShow()} />
        <Submenu
          as={Submenu.Item}
          route="reports"
          pathnames={REPORTS}
          prefix={makePath(INTERFACE.settings, SETTINGS.reports)}
        >
          <Submenu.Item route="reports" href={makePath(INTERFACE.settings, SETTINGS.reports)} exact onClick={() => toggleMenuShow()} />
          <Submenu.Item route="categories" onClick={() => mobile && toggleMenuShow()} />
          <Submenu.Item route="emailReports" onClick={() => mobile && toggleMenuShow()} />
        </Submenu>
        <Submenu.Item route="dynamicForms" onClick={() => mobile && toggleMenuShow()} />
        <Submenu.Item route="staff" onClick={() => mobile && toggleMenuShow()} />
        <Submenu.Item route="users" onClick={() => mobile && toggleMenuShow()} />
      </Submenu>
    </Nav>
  );
};

// EXPORT
export default compose(getLookupData())(MenuNav);
