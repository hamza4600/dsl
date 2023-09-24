import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// BOOTSTRAP COMOPNENTS
import { Col } from 'react-bootstrap';

// STYLES
import styles from './tableCol.module.scss';

// MAIN COMPONENT
const TableCol = ({
  children,
  mobile,
  className,
  size,
  cols,
  xs,
  sm,
  md = !mobile && 'auto',
  lg,
  xl = mobile && 'auto',
  actions,
  order
}) => (
  <Col
    className={clsx(
      'table-col',
      !mobile && styles.col,
      styles[size],
      actions && styles.actions,
      className
    )}
    xs={xs}
    sm={sm}
    md={md}
    lg={lg}
    xl={xl}
    style={{ order }}
    {...cols}
  >{children}</Col>
)
// EXPORT
export default TableCol;
