import React, { useContext } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL CONTEXT
import { ListContext } from 'helpers/getListData';

// LOCAL COMPONENTS
import TableHeaderCell from './TableHeaderCell';
import TableRow from './TableRow';

// STYLES
import styles from './tableHeader.module.scss';
import cellStyles from './tableCell.module.scss';

// MAIN COMPONENT
const TableHeader = ({
  deal,
  rowNumber = true,
  children,
  className,
  style
}) => {

  // CONTEXT
  const {
    preferences: {
      showColumns = []
    } = {},
    columns = [],
    result = []
  } = useContext(ListContext) || {};
  // RENDER
  return !columns || ( !deal && !children && !result.length)  ? null : (
    <div
      className={clsx(
        'table-header',
        styles.header,
        className
      )}
      style={style}
    >
      <TableRow
        className={clsx(
          'table-header-row',
          styles.row,
          className
        )}
        rowNumber={rowNumber && '#'}
        header
      >
        {children || showColumns.map((key, i) => {
          const {
            className,
            ...column
          } = columns.find(column => column.key === key) || {};
          return (
            <TableHeaderCell
              key={i}
              className={clsx(
                cellStyles[key],
                styles[key],
                className
              )}
              sortKey={key}
              {...column}
            />
          )
        })}
      </TableRow>
    </div>
  )
}

TableHeader.Cell = TableHeaderCell;

// EXPORT
export default TableHeader;
