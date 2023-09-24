import React, { Children, cloneElement } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// BOOTSTRAP COMPONENTS
import { Row as BootstrapRow } from 'react-bootstrap';

// STYLES
import styles from './row.module.scss';

// MAIN COMPONENT
const Row = ({
  children,
  className,
  ...props
}) => (
  <BootstrapRow
    className={clsx(
      styles.row,
      className
    )}
  >
    {Children.map(children, (child, i) => !child ? null : cloneElement(child, Object.assign({
      key: i,
      ...props
    }, child.props)))}
  </BootstrapRow>
)

// EXPORT
export default Row;
