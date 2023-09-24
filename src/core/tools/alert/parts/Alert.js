import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL VARIABLES
import { ALERT } from 'defaults.js';

// BOOTSTRAP COMPONENTS
import { Alert as BootstrapAlert } from 'react-bootstrap';

// STYLES
import styles from './alert.module.scss';

// MAIN COMPONENT
const Alert = ({
  className,
  variant = ALERT.variant,
  message,
  onClose,
}) => !message ? null : (
  <BootstrapAlert
    className={clsx(
      `alert-${variant}`, // Bootstrap Class
      styles.alert,
      className
    )}
    onClose={onClose}
  >
    {message}
  </BootstrapAlert>
)

// EXPORT
export default Alert;
