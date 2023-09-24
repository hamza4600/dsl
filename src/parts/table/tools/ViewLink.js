import React, { useContext } from 'react';

// GLOBAL VARIABLES
import { INTERFACE } from 'pathnames';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// DEPENDENCIES
import {useLocation} from 'react-router-dom';

// CONTEXT
import { ListContext } from 'helpers/getListData';

// REACT ROUTER COMPONENTS
import { Link } from 'react-router-dom';

// STYLES
import styles from './viewLink.module.scss';
import clsx from 'clsx';

// MAIN COMPONENT
const ViewLink = ({
  children,
  as: Component = 'span',
  className,
  to,
  value,
  padd,
  inventoryId,
  recordID = (inventoryId || children || value),
  includeCurrentPath = false,
  stateKeys = []
}) => {
  const location = useLocation();

  // CONTEXT
  const {
    settings: { path = INTERFACE.inventory },
    data
  } = useContext(ListContext) || {};

  const getNavState = () => {
    let navState = {};

    stateKeys.forEach(key => {
      if (data.hasOwnProperty(key)) {
        navState[key] = data[key];
      }
    })

    if (includeCurrentPath) navState.prevPath = location.pathname;

    return navState;
  }
  return (
    <Link
      className={styles.link}
      to={to || { pathname: makePath(path, 'view', recordID), state: getNavState()  }}
    >
      <Component className={clsx(className,padd)}>
        {children || value}
      </Component>
    </Link>
  )
}

// EXPORT
export default ViewLink;
