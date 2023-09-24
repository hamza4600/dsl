import React, { useMemo } from 'react';

// LOCAL COMPONENTS
import Picker from '../Picker';
import Month from '../../button/types/Month';

// MAIN COMPONENT
const MonthPicker = ({
  ...props
}) => {

  // PROPS
  const {
    minDate,
    maxDate,
    year,
    setYear
  } = props;

  // MEMOS
  const minYear = useMemo(
    () => minDate && year <= new Date(minDate).getFullYear(),
    [minDate, year]
  )
  const maxYear = useMemo(
    () => maxDate && year >= new Date(maxDate).getFullYear(),
    [maxDate, year]
  )
  const toggle = useMemo(
    () => ({
      increment: maxYear ? undefined : () => setYear(year + 1),
      decrement: minYear ? undefined : () => setYear(year - 1)
    }),
    [year, setYear, minYear, maxYear]
  )

  // RENDER
  return (
    <Picker
      {...props}
      title={year}
      toggleLeft={toggle.decrement}
      toggleRight={toggle.increment}
      tableBody={[...Array(12).keys()].map((month, i) => (
        <Month
          {...props}
          key={i}
          index={i}
        />
      ))}
    />
  )
}

// EXPORT
export default MonthPicker;
