import React from 'react';

// GLOBAL FUNCITONS
import { toNumber } from 'functions';

// GLOBAL COMPONENTS
import Table from 'parts/table/Table';

// STYLES
import styles from './tableBoolean.module.scss';

// MAIN COMPONENT
const TableBoolean = ({
  children
}) => {

  return (
    <Table.Cell className={styles.tableCell}>
      <div className={styles.container}>
        <Table.Badge
          badge={toNumber(children) === 1 ? 'success' : 'danger'}
        >
          {['No', 'Yes'][toNumber(children)]}
        </Table.Badge >
      </div>
    </Table.Cell>
  )
}

// EXPORT
export default TableBoolean;