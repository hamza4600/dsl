import React from 'react';

// LOCAL COMPONENTS
import HeaderMenu from '../layout/HeaderMenu';

// STYLES
import styles from './notificationMenu.module.scss';

// MAIN COMPONENT
const NotificationMenu = () => (
  <HeaderMenu
    menu={{
      className: styles.menu
    }}
    toggle={{
      icon: 'notification'
    }}
  >
    <i className="text-light">Under construction.</i>
  </HeaderMenu>
)

export default NotificationMenu;
