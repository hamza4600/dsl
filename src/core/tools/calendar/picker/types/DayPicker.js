import React, { useMemo } from 'react';

// GLOBAL VARIABLES
import { DAYS, MONTHS } from 'timeFormats.js';

// GLOBAL FUNCTIONS
import { compareDate } from 'functions.js';

// BOOTSTRAP COMPONENTS
import { Col, Row } from 'react-bootstrap';

// LOCAL COMPONENTS
import Picker from '../Picker';
import Day from '../../button/types/Day';

// STYLES
import styles from '../../calendar.module.scss';

// MAIN COMPONENT
const DayPicker = ({
  ...props
}) => {

  // PROPS
  const {
    currentDate,
    startDate,
    endDate,
    minDate,
    maxDate,
    isRange,
    period,
    setPeriod
  } = props;

  // MEMOS
  const minMonth = useMemo(
    () => minDate && compareDate(period, '<=', new Date(minDate).setDate(1)),
    [minDate, period]
  )
  const maxMonth = useMemo(
    () => maxDate && compareDate(period, '>=', new Date(maxDate).setDate(1)),
    [maxDate, period]
  )
  const toggle = useMemo(
    () => ({
      increment: maxMonth ? undefined : () => setPeriod(new Date(period.getFullYear(), period.getMonth() + 1, 1)),
      decrement: minMonth ? undefined : () => setPeriod(new Date(period.getFullYear(), period.getMonth() - 1, 1)),
    }),
    [period, setPeriod, minMonth, maxMonth]
  )

  // NEW PROPS
  props.daysInMonth = useMemo(
    () => new Date(period.getFullYear(), period.getMonth() + 1, 0).getDate(),
    [period]
  )
  props.daysBefore = useMemo(
    () => period.getDay(),
    [period]
  )
  props.weeksInMonth = useMemo(
    () => Math.ceil((props.daysInMonth + props.daysBefore) / 7),
    [props.daysInMonth, props.daysBefore]
  )

  // RENDER
  return (
    <div
      data-picker-range={isRange}
      data-current-date={!isRange ? currentDate : undefined}
      data-start-date={isRange ? startDate : undefined}
      data-end-date={isRange ? endDate : undefined}
    >
      <Picker
        {...props}
        title={`${MONTHS[period.getMonth()].substring(0, 3)} ${period.getFullYear()}`}
        toggleLeft={toggle.decrement}
        toggleRight={toggle.increment}
        tableHeader={(
          <div className={styles.header}>
            <Row className={styles.row}>
              {DAYS.map((day, i) => (
                <Col key={i} className={styles.col}>
                  <span className={styles.caption}>
                    {day.substring(0, 3)}
                  </span>
                </Col>
              ))}
            </Row>
          </div>
        )}
        tableBody={Array(props.weeksInMonth).fill().map((_, w) => (Array(7).fill().map((_, d) => (
          <Day
            {...props}
            key={d}
            week={w}
            day={d + 1}
          />
        ))))}
      />
    </div>
  )
}

// EXPORT
export default DayPicker;
