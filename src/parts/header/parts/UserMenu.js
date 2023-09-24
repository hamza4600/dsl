import React, {useState } from 'react';

// GLOBAL VARIABLES
import { USER } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { logOut } from 'functions.js';

// LOCAL COMPONENTS
import HeaderMenu from '../layout/HeaderMenu';

// STYLES
import styles from './userMenu.module.scss';

// MAIN COMPONENT
const UserMenu = () => {
  
  // State
  const [show, setShow] = useState(false)

  // RENDER
  return (
    <HeaderMenu
      toggle={{
        className: styles.toggle,
        icon: show ? 'cancel' : 'menu'
      }}
      onShow={(e) => setShow(e)}
    >
      <HeaderMenu.Item
        pathnames={USER}
        route="profile"
        label="My Account"
      />
      <HeaderMenu.Item
        pathnames={USER}
        route="emailSettings"
      />
      <HeaderMenu.Button
        variant="secondary"
        route="logOut"
        onClick={() => logOut()}
      />
    </HeaderMenu>
  )
}

export default UserMenu;
