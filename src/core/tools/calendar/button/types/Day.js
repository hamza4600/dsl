import React, { useCallback, useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL VARIABLES
import { CALENDAR } from 'defaults.js';

// GLOBAL FUNCTIONS
import { compareDate, doCallback, formatDate } from 'functions.js';

// LOCAL COMPONENTS
import Button from '../Button';

// STYLES
import styles from '../../calendar.module.scss';

// MAIN COMPONENT
const Day = ({
  period,
  currentDate,
  startDate,
  endDate,
  minDate,
  maxDate,
  onSelect,
  daysInMonth,
  daysBefore,
  showOutsideMonth = CALENDAR.showOutsideMonth,
  month,
  week,
  day,
  button
}) => {

  // MEMOS
  const date = useMemo(
    () => week * 7 + day - daysBefore,
    [week, day, daysBefore]
  )
  const value = useMemo(
    () => new Date(period.getFullYear(), period.getMonth(), date),
    [period, date]
  )
  const isInMonth = useMemo(
    () => date > 0 && date <= daysInMonth,
    [daysInMonth, date]
  )
  const isDisabled = useMemo(
    () => (minDate && compareDate(value, '<', minDate)) || (maxDate && compareDate(value, '>', maxDate)),
    [minDate, maxDate, value]
  )

  // CLASSNAME
  const classNames = useMemo(
    () => {
      const classNames = [];
      if (compareDate(value, '===', startDate))
        classNames.push(styles.start);
      if (compareDate(value, '===', endDate))
        classNames.push(styles.end);
      if (compareDate(value, '===', currentDate))
        classNames.push(styles.current);
      if (compareDate(value, '>=', startDate) && compareDate(value, '<=', endDate))
        classNames.push(styles.active);
      return classNames;
    },
    [currentDate, startDate, endDate, value]
  )

  // CLICK HANDLER
  const handleClick = useCallback(
    () => {
      doCallback(onSelect, formatDate(new Date(value)));
    },
    [onSelect, value]
  )

  // MAIN COMPONENT
  return !isInMonth && !showOutsideMonth ? (
    <div className={styles.spacer}></div>
  ) : (
    <Button
      as={button}
      className={clsx(
        styles.day,
        !isInMonth && styles.outside,
        ...classNames
      )}
      label={new Date(period.getFullYear(), period.getMonth(), date).getDate()}
      onClick={handleClick}
      disabled={isDisabled}
      square
    />
  )
}

// EXPORT
export default Day;
