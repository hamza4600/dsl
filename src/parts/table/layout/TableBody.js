import React, { useContext, useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL CONTEXT
import { ListContext } from 'helpers/getListData';

// LOCAL COMPONENTS
import TableEntry from './TableEntry';

// STYLES
import styles from './tableBody.module.scss';

// MAIN COMPONENT
const TableBody = ({
  children,
  className,
  style
}) => {

  // CONTEXT
  const { result = [] } = useContext(ListContext) || {};

  //MEMOS
  const empty = useMemo(
    () => !children && result.length < 1,
    [children, result]
  )

  // RENDER
  return (
    <div
      className={clsx(
        'table-body',
        styles.body,
        empty && styles.empty,
        className
      )}
      style={style}
    >
      {!!empty ? (
        <h4 className={styles.message}>No Records Found</h4>
      ) : (
        <div className={clsx(
          'table-rows',
          styles.rows,
          className
        )}>
          {children || result.map((record, i) => (
            <TableEntry
              key={i}
              rowNumber={i + 1}
              record={record}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// EXPORT
export default TableBody;
