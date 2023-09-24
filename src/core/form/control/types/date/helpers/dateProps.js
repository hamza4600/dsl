import React, { forwardRef, useMemo } from 'react';

// GLOBAL FUNCTIONS
import { formatDate } from 'functions.js';

// MAIN COMPONENT
export const dateProps = Component => {
  return forwardRef(({
    name,
    value,
    ...props
  }, ref) => {

    // PROPS
    const {
      range     = Array.isArray(name),
      startName = Array.isArray(name) ? name[0] : undefined,
      endName   = Array.isArray(name) ? name[1] : undefined,
      startDate = Array.isArray(value) ? value[0] : undefined,
      endDate   = Array.isArray(value) ? value[1] : undefined,
      form: {
        values
      } = {}
    } = props;

    // MEMOS
    const {
      [name]:      dateValue      = Array.isArray(value) ? value.filter(el => el).join('-') : value,
      [startName]: startDateValue = startDate,
      [endName]:   endDateValue   = endDate
    } = useMemo(
      () => values || {},
      [values]
    )

    const dateValues = useMemo(
      () => !range ? {
        currentDate: formatDate(dateValue)
      } : dateValue ? {
        dateRange:   formatDate(dateValue),
        startDate:   formatDate(dateValue.split('-')[0]),
        endDate:     formatDate(dateValue.split('-')[1])
      } : {
        dateRange:   [formatDate(startDateValue), formatDate(endDateValue)].join('-'),
        startDate:   formatDate(startDateValue),
        endDate:     formatDate(endDateValue)
      },
      [range, dateValue, startDateValue, endDateValue]
    )

    // RENDER
    return <Component
      {...props}
      {...dateValues}
      name={Array.isArray(name) ? undefined : name}
      startName={startName}
      endName={endName}
      range={range}
      ref={ref}
    />
  })
}
