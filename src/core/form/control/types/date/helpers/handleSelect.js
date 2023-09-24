import React, { forwardRef, useCallback, useEffect, useState } from 'react';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// MAIN COMPONENT
export const handleSelect = Component => {
  return forwardRef(({
    startName,
    endName,
    onSelect,
    onDateValueChange,
    ...props
  }, ref) => {

    // PROPS
    const {
      name,
      range,
      currentDate = '',
      startDate = '',
      endDate = '',
      dateRange = '',
      dateOptions,
      form: {
        setFieldValue
      } = {}
    } = props;

    // STATE
    const [ option, setOption ] = useState();

    // CALLBACKS
    const updateDate = useCallback(
      value => {
        doCallback(onDateValueChange, { name, value });
        if (name) {
          doCallback(onSelect, value, name);
          doCallback(setFieldValue, name, value);
        }
        if (startName) {
          const startDate = value.split('-')[0];
          doCallback(onSelect, startDate, startName);
          doCallback(setFieldValue, startName, startDate);
        }
        if (endName) {
          const endDate = value.split('-')[1];
          doCallback(onSelect, endDate, endName);
          doCallback(setFieldValue, endName, endDate)
        };
      },
      [name, startName, endName, onSelect, onDateValueChange, setFieldValue]
    )
    const updateDateByOption = useCallback(
      option => {
        const { date, startDate = date, endDate = date } = dateOptions[option] || {};
        if (!date && !startDate && !endDate) return;
        const value = !range ? date : [startDate, endDate].filter(el => el).join('-');
        updateDate(value);
      },
      [range, dateOptions, updateDate]
    )
    const updateDateByValue = useCallback(
      (value, key) => {
        if (key === undefined) {
          updateDate(value);
          return
        } else {
          const dates = dateRange.split('-');
          if (dates.length < 2) {
            updateDate([value, value].join('-'));
          } else {
            dates[key] = value;
            updateDate(dates.join('-'));
          }
        }
      },
      [dateRange, updateDate]
    )
    const handleOptionSelect = useCallback(
      option => {
        setOption(option);
        updateDateByOption(option);
      },
      [setOption, updateDateByOption]
    )
    const handleDateSelect = useCallback(
      (value, key) => {
        setOption('custom');
        updateDateByValue(value, key);
      },
      [setOption, updateDateByValue]
    )

    // EFFECTS
    useEffect(
      () => {
        if (option) {
          if (!currentDate && !dateRange) {
            setOption(undefined);
            return;
          } else {
            return;
          }
        }
        if (!currentDate && !dateRange) return;

        let newOption = 'custom';

        Object.keys(dateOptions).forEach(key => {
          if (dateOptions[key].date === currentDate) {
            newOption = key;
            return;
          } else if (
            startDate === endDate &&
            startDate === dateOptions[key].date
          ) {
            newOption = key;
            return;
          } else if (
            dateOptions[key].startDate === startDate &&
            dateOptions[key].endDate === endDate
          ) {
            newOption = key;
            return;
          }
        })

        setOption(newOption);
      },
      [currentDate, startDate, endDate, dateRange, dateOptions, option, setOption]
    )

    // RENDER
    return <Component
      {...props}
      option={option}
      onOptionSelect={handleOptionSelect}
      onDateSelect={handleDateSelect}
      ref={ref}
    />
  })
}
