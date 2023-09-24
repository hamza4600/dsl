import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// BOOTSTRAP COMPONENTS
import { Col } from 'react-bootstrap';

// CORE COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from '../calendar.module.scss';

// MAIN COMPONENT
const CalendarButton = ({
  className,
  xs,
  label,
  onClick,
  disabled
}) => (
  <Col
    className={clsx(
      styles.col,
      styles.btnContainer,
      className,
    )}
    xs={xs}
  >
    <Button
      className={styles.btn}
      label={label}
      onClick={onClick}
      disabled={disabled}
      size="sm"
    />
  </Col>
)

// EXPORT
export default CalendarButton;
