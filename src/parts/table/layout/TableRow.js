import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// BOOTSTRAP COMOPNENTS
import { Row } from 'react-bootstrap';

// LOCAL COMPONENTS
import TableActions from './TableActions';
import TableCell from './TableCell';
import TableCol from './TableCol';

// STYLES
import styles from './tableRow.module.scss';

// MAIN COMPONENT
const TableRow = ({
  children,
  className,
  record,
  rowNumber,
  action=true,
  header
}) => (
  <Row className={clsx(
    'table-row',
    styles.row,
    className
  )}>
    {rowNumber &&
      <TableCol
        className={styles.rowNumber}
        size="xs"
      >
        <TableCell>{rowNumber}</TableCell>
      </TableCol>
    }
    {children}
   {action && <TableActions
      className={styles.actions}
      record={record}
      header={header}
    />}
  </Row>
)

// EXPORT
export default TableRow;
