import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// STYLES
import styles from './tableCell.module.scss';

// MAIN COMPONENT
const TableCell = ({
  children,
  mobile,
  className
}) => (
  <div
    className={clsx(
      'table-cell',
      !mobile && styles.cell,
      className
    )}
  >{children}</div>
)

// EXPORT
export default TableCell;
