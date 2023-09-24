import React, { useCallback, } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// STYLES
import styles from './dateFilter.module.scss';

// MAIN COMPONENT
const DateFilter = ({
  className,
  onUpdate,
  ...props
}) => {

  // PROPS
  const {
    name,
    range     = Array.isArray(name),
    startName = Array.isArray(name) ? name[0] : undefined,
    endName   = Array.isArray(name) ? name[1] : undefined,
  } = props;

  // EFFECTS
  const handleDateValueChange = useCallback(
    ({ value }) => {
      if (range) {
        const [ startValue, endValue ] = value.split('-');
        const validRange = !!startValue && !!endValue;
        if (startName && endName) {
          doCallback(onUpdate, startName, validRange ? startValue : undefined);
          doCallback(onUpdate, endName, validRange ? endValue : undefined);
        } else {
          doCallback(onUpdate, name, validRange ? value : undefined);
        }
      } else {
        doCallback(onUpdate, name, value);
      }
    },
    [name, range, startName, endName, onUpdate]
  )

  // RENDER
  return (
    <Form.Date
      className={clsx(
        styles.filter,
        className
      )}
      onDateValueChange={handleDateValueChange}
      useOptions
      {...props}
    />
  )
}

// CHILD COMPONENTS
DateFilter.Range = props => <DateFilter
  name={['startDate', 'endDate']}
  label="Date Range"
  defaultOption='thisMonth'
  maxDate={new Date()}
  range
  {...props}
/>

// EXPORT
export default DateFilter;
