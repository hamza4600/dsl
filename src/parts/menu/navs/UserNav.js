import React from 'react';

// DEPENDENCIES
import { compose } from 'redux';
import { connect } from 'react-redux';

// GLOBAL VARIABLES
import { USER } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { logOut } from 'functions.js';

// BOOTSTRAP COMPONENTS
import { Nav } from 'react-bootstrap';

// LOCAL COMPONENTS
import MenuItem from '../layout/MenuItem';

// STYLES
import styles from './userNav.module.scss';

// MAIN COMPONENT
const UserNav = compose(
  connect(
    ({ user }) => ({ user })
  )
)(({
  // REDUX STATE
  user
}) => (
  <Nav className={styles.nav}>
    <MenuItem
      pathnames={USER}
      route="profile"
      label={`${user.first_name} ${user.last_name}`}
    />
    <MenuItem
      pathnames={USER}
      route="emailSettings"
    />
    <MenuItem.Button
      variant="secondary"
      route="logOut"
      onClick={() => logOut()}
    />
  </Nav>
))

// EXPORT
export default UserNav;
