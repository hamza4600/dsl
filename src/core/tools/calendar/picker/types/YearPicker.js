import React, { useMemo } from 'react';

// LOCAL COMPONENTS
import Picker from '../Picker';
import Year from '../../button/types/Year';

// MAIN COMPONENT
const YearPicker = ({
  ...props
}) => {

  // PROPS
  const {
    minDate,
    maxDate,
    decade,
    setDecade,
    getDecade
  } = props;

  // MEMOS
  const minDecade = useMemo(
    () => minDate && decade <= getDecade(minDate),
    [minDate, decade, getDecade]
  )
  const maxDecade = useMemo(
    () => maxDate && decade >= getDecade(maxDate),
    [maxDate, decade, getDecade]
  )
  const toggle = useMemo(
    () => ({
      increment: maxDecade ? undefined : () => setDecade(decade + 10),
      decrement: minDecade ? undefined : () => setDecade(decade - 10)
    }),
    [decade, setDecade, minDecade, maxDecade]
  )

  // RENDER
  return (
    <Picker
      {...props}
      title={`${decade} - ${decade + 9}`}
      toggleLeft={toggle.decrement}
      toggleRight={toggle.increment}
      tableBody={[...Array(12).keys()].map((year, i) => (
        <Year
          {...props}
          key={i}
          index={year - 1}
        />
      ))}
    />
  )
}

// EXPORT
export default YearPicker;
