import React from 'react';

// GLOBAL VARIABLES
import { ASSIGNMENT_STATUS } from 'codes.js';

// BOOTSTRAP COMPONENTS
import clsx from 'clsx';

// GLOBAL COMPONENTS
import Table from 'parts/table/Table';

// STYLES
import styles from './assignmentCell.module.scss';

// MAIN COMPONENT
const AssignmentCell = ({ children, className, rowValues, statusKey, timeKey }) => {
  return (
    <div className={clsx('d-flex align-items-center flex-wrap', className)}>
      <div className={clsx('my-1', styles.value)}>{children}</div>
      <div className={clsx('d-flex align-items-center mr-2', styles.time)}>{rowValues[timeKey]}</div>
      <div className={clsx('d-flex align-items-center', styles.badge)}>
        <div>
          <Table.Code codes={Object.values(ASSIGNMENT_STATUS)}>
            {ASSIGNMENT_STATUS[rowValues[statusKey]]?.code}
          </Table.Code>
        </div>
      </div>
    </div>
  );
};

// EXPORT
export default AssignmentCell;
