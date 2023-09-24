import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL COMPONENTS
import MenuItem from 'parts/menu/layout/MenuItem';

// STYLES
import styles from './headerMenuItem.module.scss';

// MAIN COMPONENT
const HeaderMenuItem = ({
  className,
  ...props
}) => (
  <MenuItem
    className={clsx(
      styles.item,
      className
    )}
    linkClassName={styles.link}
    labelClassName={styles.label}
    {...props}
  />
)

// CHILD COMPONENTS
HeaderMenuItem.Button = ({
  className,
  ...props
}) => (
  <MenuItem.Button
    className={clsx(
      styles.item,
      className
    )}
    linkClassName={styles.link}
    labelClassName={styles.label}
    {...props}
  />
)

// EXPORT
export default HeaderMenuItem
