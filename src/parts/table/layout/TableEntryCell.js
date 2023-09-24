import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { connect } from 'react-redux';
import { compose } from 'redux';

// LOCAL COMPONENTS
import TableCell from './TableCell';
import TableCol from './TableCol';

// STYLES
import styles from './tableEntryCell.module.scss';

// MAIN COMPONENT
const TableEntryCell = compose(connect(({ mobile }) => ({ mobile })))(
  ({
    children,
    component: Component = TableCell,
    className,
    name,
    label = name,
    color='',
    checkExpiey,
    value: rawValue = children,
    format = value => value,
    hidden,
    // REDUX STATE
    mobile,
    // REST
    ...props
  }) => {
    const value = format(rawValue);
    return hidden ? null : (mobile.mobile?
      <Component
      as={TableCell}
      className={clsx(
        'table-entry-cell',
        styles.cell,
        'text-right',
        className
      )}
      {...props}
    >
      {value !== undefined ? value : <>&ndash;</>}
    </Component>:
      <TableCol
        className={clsx(
          'table-entry-col',
          styles.col,
          className
        )}
        {...props}
      >
        {label !== false &&
          <label className={styles.label}>
            {label || <>&nbsp;</>}
          </label>
        }
        <Component
          as={TableCell}
          className={clsx(
            'table-entry-cell',
            checkExpiey&& color,
            styles.cell,
            className
          )}
          {...props}
        >
          {value !== undefined ? value : <>&ndash;</>}
        </Component>
      </TableCol>
    );
  }
);

// EXPORT
export default TableEntryCell;
