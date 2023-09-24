import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// STYLES
import styles from './module.module.scss';

// MAIN COMPONENT
const Component = ({
  children,
  className,
  title
}) => (
  <div className={clsx(
    className,
    styles.module
  )}>
    {!!title &&
      <h3 className={styles.header}>
        {title}
      </h3>
    }
    {children}
  </div>
)

Component.Divider = () => <hr className={styles.divider} />

export default Component;
