import React, { useCallback, useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL VARIABLES
import { MONTHS } from 'timeFormats.js';

// GLOBAL FUNCTIONS
import { compareDate, doCallback } from 'functions.js';

// LOCAL COMPONENTS
import Button from '../Button';

// STYLES
import styles from '../../calendar.module.scss';

// MAIN COMPONENT
const Month = ({
  minDate,
  maxDate,
  period,
  setPeriod,
  setMode,
  index,
  year,
  button
}) => {

  // MEMOS
  const value = useMemo(
    () => new Date(year, index, 1),
    [index, year]
  )
  const isDisabled = useMemo(
    () => (minDate && compareDate(value, '<', new Date(minDate).setDate(1))) || (maxDate && compareDate(value, '>', maxDate)),
    [minDate, maxDate, value]
  )

  // CLASSNAME
  const className = useMemo(
    () => {
      switch (true) {
        case (compareDate(value, '===', period)):
          return styles.current;
        default:
          return styles.default;
      }
    },
    [period, value]
  )

  // CLICK HANDLER
  const handleClick = useCallback(
    () => {
      doCallback(setPeriod, value);
      doCallback(setMode, 'day');
    },
    [setPeriod, setMode, value]
  )

  // RENDER
  return (
    <Button
      as={button}
      className={clsx(
        styles.month,
        className
      )}
      xs={6}
      label={MONTHS[index].substring(0, 3)}
      onClick={handleClick}
      disabled={isDisabled}
    />
  )
}

// EXPORT
export default Month;
