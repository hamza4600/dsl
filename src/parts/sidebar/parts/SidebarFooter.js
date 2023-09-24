import React from 'react';

// DEPENDENCIES
import clsx from 'clsx'

// STYLES
import styles from './sidebarFooter.module.scss';

// MAIN COMPONENT
const SidebarFooter = ({
  children,
  className
}) => !children ? null : (
  <div className={clsx(
    styles.footer,
    className
  )}>
    {children}
  </div>
)

// EXPORT
export default SidebarFooter;
