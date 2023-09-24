import React, { useCallback, useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// LOCAL COMPONENTS
import Button from '../Button';

// STYLES
import styles from '../../calendar.module.scss';

// MAIN COMPONENT
const Year = ({
  minDate,
  maxDate,
  period,
  setPeriod,
  setMode,
  index,
  year,
  setYear,
  decade,
  button
}) => {

  // MEMOS
  const value = useMemo(
    () => decade + index,
    [index, decade]
  )
  const isInDecade = useMemo(
    () => index >= 0 && index < 10,
    [index]
  )
  const isDisabled = useMemo(
    () => (minDate && value < new Date(minDate).getFullYear()) || (maxDate && value > new Date(maxDate).getFullYear()),
    [minDate, maxDate, value]
  )

  // CLASSNAME
  const className = useMemo(
    () => {
      switch (true) {
        case (value === year):
          return styles.current;
        default:
          return styles.default;
      }
    },
    [year, value]
  )

  // CLICK HANDLER
  const handleClick = useCallback(
    () => {
      doCallback(setYear, value);
      doCallback(setMode, 'month');
    },
    [setYear, setMode, value]
  )

  // RENDER
  return (
    <Button
      as={button}
      className={clsx(
        styles.year,
        !isInDecade && styles.outside,
        className
      )}
      xs={6}
      label={value}
      onClick={handleClick}
      disabled={isDisabled}
    />
  )
}

// EXPORT
export default Year;
