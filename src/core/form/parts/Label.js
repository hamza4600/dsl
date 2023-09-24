import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL VARIABLES
import { LABEL } from 'defaults.js';

// BOOTSTRAP COMPONENTS
import { Form } from 'react-bootstrap';

// LOCAL COMPONENTS
import Col from './Col';

// STYLES
import styles from './label.module.scss';

// MAIN COMPONENT
const Label = ({
  className,
  children,
  label = children,
  prefix,
  suffix,
  plaintext, 
  required,
  disabled,
  size,
  inline,
  columns,
  vertical,
  position = columns ? 'columns' : vertical ? 'above' : 'before',
  cols = inline ? LABEL.cols.inline : LABEL.cols[position]
}) => !label ? null : (
  <Col
    className={clsx(
      styles.col,
      styles[position],
      inline && styles.inline
    )}
    cols={cols}
  >
    {label &&
      <Form.Label
        className={clsx(
          styles.label,
          styles[size],
          disabled && styles.disabled,
          plaintext && styles.plaintext,
          inline && styles.inline,
          required && styles.required,
          className
        )}
      >
        <span>{prefix} {label} {suffix}</span>
      </Form.Label>
    }
  </Col>
)

// EXPORT
export default Label;
