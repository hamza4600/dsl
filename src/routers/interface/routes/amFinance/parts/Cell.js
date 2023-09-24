import React from 'react';

// BOOTSTRAP COMPONENTS
import clsx from 'clsx';
import isUndefined from 'lodash/isUndefined';
import { Col } from 'react-bootstrap';

// STYLES
import styles from './cell.module.scss';

// MAIN COMPONENT
const Cell = ({ children, className, label, order, ...props }) => (
  <Col {...props} className={clsx('cell border-bottom', className)} style={{ order }}>
    <div className="py-3">
      {!isUndefined(label) ? <label className={styles.label}>{label}</label> : null}
      <div>{children}</div>
    </div>
  </Col>
);

// EXPORT
export default Cell;
