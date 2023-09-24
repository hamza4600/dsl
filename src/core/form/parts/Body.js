import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// LOCAL COMPONENTS
import Row from '../parts/Row';

// STYLES
import styles from './body.module.scss';

// MAIN COMPONENT
const Body = ({
  children,
  className,
  ...props
}) => (
  <Row
    className={clsx(
      styles.body,
      props.vertical && styles.vertical,
      className
    )}
    {...props}
  >
    {children}
  </Row>
)

Body.Inline = props => <Body inline {...props} />;
Body.Vertical = props => <Body vertical {...props} />;
Body.Columns = props => <Body columns {...props} />;

// EXPORT
export default Body;
