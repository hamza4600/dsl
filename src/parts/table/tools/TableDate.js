import React from 'react';

// GLOBAL FUNCTIONS
import { formatDate } from 'functions';

// GLOBAL COMPONENTS
import Table from 'parts/table/Table';

// MAIN COMPONENT
const TableDate = ({
  children,
  ...props
}) => (
  <Table.Cell
    {...props}
  >
    { formatDate(children, 4) }
  </Table.Cell>
)

// EXPORT
export default TableDate;