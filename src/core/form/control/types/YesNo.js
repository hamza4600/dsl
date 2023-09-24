import React, { useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL VARIABLES
import { YES_NO } from 'defaults.js';

// LOCAL COMPONENTS
import Checklist from './checklist/Checklist';
import Toggle from './toggle/Toggle';

// STYLES
import styles from './yesNo.module.scss';

// MAIN COMPONENT
const YesNo = ({
  className,
  numeric = YES_NO.useNumeric,
  toggle  = YES_NO.useToggle,
  ...props
}) => {

  // MEMOS
  const options = useMemo(
    () => ([
      {
        label: 'Yes',
        value: numeric ? 1 : true
      },
      {
        label: 'No',
        value: numeric ? 0 : false
      }
    ]),
    [numeric]
  )

  // RENDER
  return toggle ? (
    <Toggle
      className={clsx(
        styles.toggle,
        className
      )}
      options={options}
      {...props}
    />
  ) : (
    <Checklist
      className={clsx(
        styles.checklist,
        className
      )}
      type="radio"
      options={options}
      useCSV
      formGroup={{
        className: styles.formGroup
      }}
      {...props}
    />
  )
}

// EXPORT
export default YesNo;
