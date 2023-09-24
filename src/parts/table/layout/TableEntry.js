import React, { useContext, useState, useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL CONTEXT
import { ListContext } from 'helpers/getListData';

// LOCAL COMPONENTS
import TableEntryCell from './TableEntryCell';
import TableRow from './TableRow';

// STYLES
import styles from './tableEntry.module.scss';
import cellStyles from './tableCell.module.scss';

// MAIN COMPONENT
const TableEntry = ({ children, className, record, rowNumber, action, columns: tableColumns = [] }) => {
  const adjustedPrice =record? record['adjusted_price'] || record['advertised_price'] || '':'';
  const checkExpiey =record? record['estimated_delivery_date_expired'] === 1: false;
  //LOCAL STATES
  const [priceAdjusted, setPriceAdjusted] = useState(adjustedPrice);
  const [icon, setIcon] = useState(adjustedPrice ? 'good' : '');

  // CONTEXT
  const {
    preferences: { showColumns = [] },
    columns = []
  } = useContext(ListContext) || {};

  const setColumns = useMemo(() => {
    if (tableColumns.length) {
      return tableColumns;
    }
    return columns
  },[columns]);

  // RENDER
  return (
    <div className={clsx('table-entry', styles.entry, className)}>
      <TableRow
        className={clsx('table-entry-row', styles.row, className)}
        record={record}
        action={action}
        rowNumber={rowNumber}
      >
        {children ||
          showColumns.map((key, i) => {
            const { className, ...column } = setColumns.find(column => column.key === key) || {};

            return (
              <TableEntryCell
                key={i}
                record={record}
                columnKey={key}
                setPriceAdjusted={setPriceAdjusted}
                priceAdjusted={priceAdjusted}
                icon={icon}
                setIcon={setIcon}
                checkExpiey={checkExpiey}
                value={record[key]}
                inventoryId={record[column.inventoryIDKey || 'daily_sales_inventory_id']}
                className={clsx(cellStyles[key], styles[key], className)}
                {...column}
              />
            );
          })}
      </TableRow>
    </div>
  );
};

TableEntry.Cell = TableEntryCell;

// EXPORT
export default TableEntry;
