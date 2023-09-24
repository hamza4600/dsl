import React, { useCallback } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// BOOTSTRAP COMPONENTS
import { Row } from 'react-bootstrap';

// CORE COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from '../calendar.module.scss';

// MAIN COMPONENT
const Picker = ({
  setMode,
  active,
  title,
  toggleLeft,
  toggleRight,
  tableHeader,
  tableBody,
  arrows = true,
  arrowLeft = arrows,
  arrowRight = arrows,
  togglePeriod = true
}) => {

  // CALLBACK
  const handleClick = useCallback(
    () => {
      doCallback(setMode);
    },
    [setMode]
  )

  // RENDER
  return (
    <div className={clsx(
      styles.calendar,
      active && styles.mode
    )}>
      <div className={styles.toggles}>
        <Button
          className={styles.toggle}
          variant="link"
          icon="arrow-left"
          onClick={toggleLeft}
          disabled={!arrowLeft || !toggleLeft}
        />
        <Button
          className={styles.title}
          variant="link"
          label={title}
          onClick={handleClick}
          disabled={!togglePeriod}
        />
        <Button
          className={styles.toggle}
          variant="link"
          icon="arrow-right"
          onClick={toggleRight}
          disabled={!arrowRight || !toggleRight}
        />
      </div>
      {tableHeader}
      <div className={styles.body}>
        <Row className={styles.row}>
          {tableBody}
        </Row>
      </div>
    </div>
  )
}

// EXPORT
export default Picker;
