import React from 'react';

// DEPENDENCIES
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// GLOBAL FUNCTIONS
import { makePath, toNumber } from 'functions';

// GLOBAL COMPONENTS
import Table from 'parts/table/Table';
import Button from 'core/tools/Button';

// MAIN COMPONENT
const TableEdit = compose(
  withRouter
)(({
  className,
  children,
  // ROUTER
  location,
  ...props
}) => (
  <Table.Cell
    className={className}
    {...props}
  >
    <Button.Link
      label="Edit"
      icon='edit'
      to={makePath(location.pathname, 'edit', toNumber(children))}
    />
  </Table.Cell>
  )
);

// EXPORT
export default TableEdit;
