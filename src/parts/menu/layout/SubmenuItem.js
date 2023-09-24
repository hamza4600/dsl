import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// LOCAL COMPONENTS
import MenuItem from './MenuItem';

// STYLES
import styles from './submenuItem.module.scss';

// MAIN COMPONENT
const SubmenuItem = ({
  className,
  linkClassName,
  ...props
}) => (
  <MenuItem
    className={clsx(
      'submenu-item',
      styles.item,
      className
    )}
    linkClassName={clsx(
      'submenu-link',
      styles.link,
      linkClassName
    )}
    icon={false}
    {...props}
  />
)

// EXPORT
export default SubmenuItem;
