import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { compose } from 'redux';
import { connect } from 'react-redux';

// LOCAL COMPONENTS
import TableBody from './layout/TableBody';
import TableEntry from './layout/TableEntry';
import TableHeader from './layout/TableHeader';
import TableScrollbox from './layout/TableScrollbox';
import TableCell from './layout/TableCell';
import ColumnsFilter from './tools/ColumnsFilter';
import TableBadge from './tools/TableBadge';
import TableCode from './tools/TableCode';
import ViewLink from './tools/ViewLink';
import TableEdit from './tools/TableEdit';
import TableBoolean from './tools/TableBoolean';
import TableNumber from './tools/TableNumber';
import TableDate from './tools/TableDate';
import TableVariants from 'routers/interface/routes/inventory/tools/TableVariants';
import MobileView from './layout/MobileView';
import AssignmentName from 'routers/interface/routes/orders/tools/AssignmentName';
import SisNameCell from 'routers/interface/routes/orders/tools/SisNameCell';
import Trade from 'routers/interface/routes/orders/tools/Trade';

// STYLES
import styles from './table.module.scss';


// MAIN COMPONENT
const Table = compose(
  connect (
    ({ mobile })=> ({ mobile })
  )
)(({
  children,
  className,
  lastCol,
  // REDUX STATE
  mobile
}) => (
  <div className={clsx(
    'table',
    styles.table,
    className
  )}>
    {!mobile.mobile?<TableScrollbox>
      {children || (<>
        <TableHeader />
        <TableBody />
      </>)}
    </TableScrollbox> : <MobileView lastCol={lastCol} />}
  </div>
))

// LAYOUT
Table.Header         = TableHeader;
Table.Body           = TableBody;
Table.Entry          = TableEntry;
Table.Cell           = TableCell;

// TOOLS
Table.Badge           = TableBadge;
Table.Code            = TableCode;
Table.View            = ViewLink;
Table.Edit            = TableEdit;
Table.Boolean         = TableBoolean;
Table.Number          = TableNumber;
Table.Date            = TableDate;
Table.Columns         = ColumnsFilter;
Table.Variants        = TableVariants;
Table.SisNameCell     = SisNameCell;
Table.Trade           = Trade;
Table.AssignmentName  = AssignmentName;
// EXPORT
export default Table;
