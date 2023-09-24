import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// BOOTSTRAP COMPONENTS
import { Form } from 'react-bootstrap';

// LOCAL COMPONENTS
import Col from './Col';

// STYLES
import styles from './text.module.scss';

// MAIN COMPONENT
const Text = ({
  children,
  className,
  cols = {
    xs: 24
  }
}) => (
  <Col
    cols={cols}
  >
    <Form.Text
      className={clsx(
        styles.text,
        className
      )}
    >
      <>{children}</>
    </Form.Text>
  </Col>
)

// EXPORT
export default Text;
