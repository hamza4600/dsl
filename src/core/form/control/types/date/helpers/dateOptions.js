import React, { forwardRef, useMemo } from 'react';

// GLOBAL FUNCTIONS
import { formatDate } from 'functions.js';

// MAIN COMPONENT
export const dateOptions = Component => {
  return forwardRef((props, ref) => {

    // PROPS
    const {
      range
    } = props;

    // MEMOS
    const dateOptions = useMemo(
      () => ({
        custom: {
          label: 'Custom',
        },
        today: {
          label: 'Today',
          date: formatDate(new Date())
        },
        yesterday: {
          label: 'Yesterday',
          date: formatDate(new Date().setDate(new Date().getDate() - 1))
        },
        ...(!range ? {} : {
          thisWeek: {
            label: 'This Week',
            startDate: formatDate(new Date().setDate(new Date().getDate() - new Date().getDay())),
            endDate:   formatDate(new Date())
          },
          lastWeek: {
            label: 'Last Week',
            startDate: formatDate(new Date().setDate(new Date().getDate() - new Date().getDay() - 7)),
            endDate:   formatDate(new Date().setDate(new Date().getDate() - new Date().getDay() - 1))
          },
          thisMonth: {
            label: 'This Month',
            startDate: formatDate(new Date().setDate(1)),
            endDate:   formatDate(new Date())
          },
          lastMonth: {
            label: 'Last Month',
            startDate: formatDate(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)),
            endDate:   formatDate(new Date().setDate(0))
          },
          thisQuarter: {
            label: 'This Quarter',
            startDate: formatDate(new Date(new Date().setMonth(Math.floor(new Date().getMonth()/3) * 3)).setDate(1)),
            endDate:   formatDate(new Date())
          },
          lastQuarter: {
            label: 'Last Quarter',
            startDate: formatDate(new Date(new Date().setMonth(Math.floor(new Date().getMonth()/3) * 3 - 3)).setDate(1)),
            endDate:   formatDate(new Date(new Date().setMonth(Math.floor(new Date().getMonth()/3) * 3)).setDate(0))
          },
          thisYear: {
            label: 'This Year',
            startDate: formatDate(new Date(new Date().getFullYear(), 0, 1)),
            endDate:   formatDate(new Date())
          },
          lastYear: {
            label: 'Last Year',
            startDate: formatDate(new Date(new Date().getFullYear() - 1, 0, 1)),
            endDate: formatDate(new Date(new Date().getFullYear() - 1, 11, 31))
          },
          all: {
            label: 'All',
            startDate: formatDate(new Date(new Date().getFullYear() - 2, 0, 1)),
            endDate: formatDate(new Date())
          }
        })
      }),
      [range]
    )
    const selectOptions = useMemo(
      () => Object.keys(dateOptions).map(key => ({
        label: dateOptions[key].label,
        value: key
      })),
      [dateOptions]
    )

    // RENDER
    return <Component
      {...props}
      dateOptions={dateOptions}
      selectOptions={selectOptions}
      ref={ref}
    />
  })
}
