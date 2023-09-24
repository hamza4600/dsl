import React, { Children, cloneElement } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// BOOTSTRAP COMPONENTS
import { Col as BootstrapCol } from 'react-bootstrap';

// STYLES
import styles from './col.module.scss';

// MAIN COMPONENT
const Col = ({
  children,
  className,
  cols = {},
  ...props
}) => (
  <BootstrapCol
    className={clsx(
      styles.col,
      !!props.inline && 'col-auto',
      className
    )}
    {...cols}
  >
    {Children.map(children, (child, i) => !child ? null : cloneElement(child, Object.assign({
      key: i,
      ...props
    }, child.props)))}
  </BootstrapCol>
)

// EXPORT
export default Col;
