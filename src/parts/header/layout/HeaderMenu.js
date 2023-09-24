import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { withRouter } from 'react-router';

// GLOBAL COMPONENTS
import Dropdown from 'core/tools/dropdown/Dropdown';

// LOCAL COMPONENTS
import HeaderButton from './HeaderButton';
import HeaderMenuItem from './HeaderMenuItem';

// STYLES
import styles from './headerMenu.module.scss';

// MAIN COMPONENT
const HeaderMenu = withRouter(({
  children,
  className,
  toggle = {},
  menu = {},
  // ROUTER
  history,
  location,
  match,
  staticContext,
  // REST
  ...props
}) => (
  <Dropdown
    className={clsx(
      styles.dropdown,
      className
    )}
    toggle={{
      ...toggle,
      as: HeaderButton,
      className: clsx(
        styles.button,
        toggle.className
      )
    }}
    menu={{
      ...menu,
      className: clsx(
        styles.menu,
        menu.className
      )
    }}
    useArrow={false}
    {...props}
  >
    {children}
  </Dropdown>
))

// CHILD COMPONENTS
HeaderMenu.Item = HeaderMenuItem;
HeaderMenu.Button = HeaderMenuItem.Button;

// EXPORT
export default HeaderMenu
