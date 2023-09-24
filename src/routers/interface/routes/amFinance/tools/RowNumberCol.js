import React from 'react';

// BOOTSTRAP COMPONENTS
import clsx from 'clsx';
import { Col } from 'react-bootstrap';

// STYLES
import styles from './rowNumberCol.module.scss';

// MAIN COMPONENT
const RowNumberCell = ({ children, className, ...props }) => (
  <Col style={{ order: 0 }} {...props} className={clsx('pr-0 py-3 border-bottom', className)}>
    <div className={styles.number}>{children}</div>
  </Col>
);

// EXPORT
export default RowNumberCell;
