import React, { forwardRef, useMemo } from 'react';

// DEPENDENCIES
import * as yup from 'yup';

// GLOBAL FUNCTIONS
import { safeDate, formatDate } from 'functions.js';

// MAIN COMPONENT
export const dateValidation = Component => {
  return forwardRef(({
    ...props
  }, ref) => {

    // MEMO
    const minDate = useMemo(
      () => safeDate(props.minDate),
      [props.minDate]
    )
    const maxDate = useMemo(
      () => safeDate(props.maxDate),
      [props.maxDate]
    )
    const feedback = useMemo(
      () =>({
        date: 'Invalid date.',
        min:  `Date must be no earlier than ${formatDate(minDate)}`,
        max:  `Date must be no later than ${formatDate(maxDate)}`
      }),
      [minDate, maxDate]
    )
    const validation = useMemo(
      () => {

        if (minDate && maxDate)
          return yup.date().typeError(feedback.date).min(maxDate, feedback.min).max(maxDate, feedback.max);

        if (minDate)
          return yup.date().typeError(feedback.date).min(maxDate, feedback.min);

        if (maxDate)
          return yup.date().typeError(feedback.date).max(maxDate, feedback.max);

        else
          return yup.date().typeError(feedback.date);
      },
      [minDate, maxDate, feedback]
    )

    // RENDER
    return <Component
      {...props}
      validation={!!props.value ? validation : undefined}
      ref={ref}
    />
  })
}
