import React, { useCallback, useEffect, useState } from 'react';

// GLOBAL VARIABLES
import { TIMES } from 'globals.js';

// LOCAL COMPONENTS
import DayPicker from './picker/types/DayPicker';
import MonthPicker from './picker/types/MonthPicker';
import YearPicker from './picker/types/YearPicker';

// LOCAL VARIABLES
const COMPONENTS = {
  day: DayPicker,
  month: MonthPicker,
  year: YearPicker
}

// MAIN COMPONENTS
const Calendar = ({
  className,
  show,
  ...props
}) => {

  // PROPS
  const { currentDate } = props;

  // CALLBACKS
  const getPeriod = useCallback(
    currentDate => isNaN(new Date(currentDate).getTime()) ? new Date(new Date().getFullYear(), new Date().getMonth(), 1) : new Date(new Date(currentDate).setDate(1)),
    []
  )

  // CALENDAR PERIOD
  const [ period, setPeriod ] = useState(getPeriod(currentDate));
  useEffect(
    () => {
      setPeriod(getPeriod(currentDate))
    },
    [currentDate, getPeriod]
  )

  // CALENDAR YEAR
  const [ year, setYear ] = useState(period.getFullYear());
  useEffect(
    () => {
      setYear(period.getFullYear())
    },
    [period]
  )

  // CALENDAR DECADE
  const getDecade = useCallback(
    value => {
      const year = value instanceof Date ? value.getFullYear() : value;
      return Math.floor(year / 10) * 10;
    },
    []
  )
  const [ decade, setDecade ] = useState(getDecade(year));
  useEffect(
    () => {
      setDecade(getDecade(year))
    },
    [year, getDecade]
  )

  // CALENDAR MODE
  const [ mode, setModeState ] = useState('day');
  const setMode = useCallback(
    target => {
      if (target) setModeState(target);
      else {
        const modeKeys = Object.keys(COMPONENTS)
        const modeIndex = modeKeys.findIndex(el => el === mode);
        const newIndex = (modeIndex + 1) % modeKeys.length;
        const newMode = modeKeys[newIndex];
        setModeState(newMode);
      }
    },
    [mode, setModeState]
  )

  // RESET CALLBACK
  const resetPicker = useCallback(
    () => {
      setPeriod(getPeriod(currentDate));
      setMode('day');
    },
    [currentDate, getPeriod, setPeriod, setMode]
  )
  useEffect(
    () => {
      if (!show) setTimeout(resetPicker, TIMES.transitionDuration);
    },
    [show, resetPicker]
  )

  // RENDER
  return (
    <div className={className}>
      {Object.keys(COMPONENTS).map((component, i) => {

        const Component = COMPONENTS[component];

        return (
          <Component
            {...props}
            key={i}
            active={component === mode}
            period={period}
            setPeriod={setPeriod}
            year={year}
            setYear={setYear}
            decade={decade}
            setDecade={setDecade}
            getDecade={getDecade}
            setMode={setMode}
          />
        )
      })}
    </div>
  )
}

// EXPORT
export default Calendar;
