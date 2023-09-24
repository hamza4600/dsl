import React, { useCallback, useContext } from 'react';

// DEPENDENCIES
import { compose } from 'redux';

// GLOBAL VARIABLES
import { NUMBER_FORMATS } from 'numberFormats.js';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// CONTEXT
import { DropdownContext } from 'core/tools/dropdown/helpers/dropdownContext';

// CORE COMPONENTS
import Calendar from 'core/tools/calendar/Calendar';

// LOCAL COMPONENTS
import Select from '../../select/Select';

// STYLES
import styles from './datePicker.module.scss';

// MAIN COMPONENT
const DateDropdown = compose(
//  dateValidation
)(({
  useDateRange,
  allowCustom = false,
  dropdown = {},
  toggle = {},
  ...props
}) => (
  <Select
    className={styles.select}
    defaultValue={props.currentDate}
    allowCustom={allowCustom}
    dropdown={{
      fullWidth: false,
      ...dropdown
    }}
    toggle={{
      icon: 'calendar',
      placeholder: NUMBER_FORMATS.date.placeholder,
      numberFormat: allowCustom ? NUMBER_FORMATS.date : undefined,
      input: {
        htmlSize: props.inline ? 10 : undefined
      },
      ...toggle
    }}
    {...props}
  >
    <Dropdown {...props} />
  </Select>
))

// CHILD COMPONENTS
const Dropdown = ({
  onSelect,
  ...props
}) => {

  // CONTEXT
  const { show, setShow } = useContext(DropdownContext) || {};

  // CALLBACKS
  const handleSelect = useCallback(
    value => {
      doCallback(onSelect, value);
      setShow(false);
    },
    [onSelect, setShow]
  )

  // RENDER
  return (
    <Calendar
      {...props}
      show={show}
      onSelect={handleSelect}
      className={styles.picker}
    />
  )
}

// EXPORT
export default DateDropdown;
