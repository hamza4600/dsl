import React, { cloneElement } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { kebabCase, startCase } from 'lodash';

// GLOBAL VARIABLES
import { INTERFACE } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// BOOTSTRAP COMPONENTS
import { Nav } from 'react-bootstrap';

// ROUTER COMPONENTS
import { NavLink } from 'react-router-dom';

// GLOBAL COMPONENTS
import Sprite from 'core/tools/Sprite';

// LOCAL COMPONENTS
import MenuButton from './MenuButton';

// STYLES
import styles from './menuItem.module.scss';

// MAIN COMPONENT
const MenuItem = ({
  children,
  className,
  linkClassName,
  labelClassName,
  as = NavLink,
  variant,
  pathnames = INTERFACE,
  route,
  icon = kebabCase(route),
  label = startCase(route),
  href = route ? makePath(pathnames[route]) : undefined,
  exact,
  onClick,
  after
}) => (
  <Nav.Item className={clsx(styles.item, className)}>
    <Nav.Link
      as={as}
      className={clsx(styles.link, linkClassName)}
      activeClassName={clsx('active', styles.active)}
      variant={variant}
      to={href}
      exact={exact}
      onClick={onClick}
    >
      {icon && <Sprite className={styles.icon} use={icon} size="md" />}
      <span className={clsx(styles.label, labelClassName)}>{label}</span>
      {after && after.map((tool, i) => cloneElement(tool, { key: i }))}
    </Nav.Link>
    {children}
  </Nav.Item>
);

// CHILD COMPONENTS
MenuItem.Button = ({ className, ...props }) => (
  <MenuItem as={MenuButton} className={clsx(styles.buttonItem, className)} {...props} />
);

// EXPORT
export default MenuItem;
