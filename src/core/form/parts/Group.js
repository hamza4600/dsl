import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// LOCAL COMPONENTS
import Row from '../parts/Row';

// STYLES
import styles from './group.module.scss';

// MAIN COMPONENT
const Group = ({
  children,
  className,
  ...props
}) => (
  <Row
    className={clsx(
      styles.group,
      className
    )}
    inline
    {...props}
  >
    {children}
  </Row>
)

// EXPORT
export default Group;
