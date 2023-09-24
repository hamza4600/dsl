import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// CORE COMPONENTS
import Number from 'core/tools/Number';

// STYLES
import styles from './tableNumber.module.scss';

// CHILD COMPONENTS
const TableNumber = {
  Dollars: ({
    children,
    ...props
  }) => (
    <Number.Dollars
      className={clsx(
        styles.number,
        styles.miles
      )}
      children={!children ? 0 : children}
      {...props}
    />
  ),
  Miles:   props => (
    <Number.Miles
      className={clsx(
        styles.number,
        styles.miles
      )}
      {...props}
    />
  )
}

// EXPORT
export default TableNumber;
