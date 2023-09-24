import React, { forwardRef } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// BOOTSTRAP COMPONENTS
import { Form } from 'react-bootstrap';

// LOCAL COMPONENTS
import Col from '../../../parts/Col';

// STYLES
import styles from './formGroup.module.scss';

// VARIABLES
const COLS = {
  inline: {
    xs: 'auto'
  },
  columns: {
    xs: 24,
    md: 12,
    xl: 8
  },
  default: {
    xs: 24
  }
}

// MAIN COMPONENT
export const formGroup = Component => {
  return forwardRef(({
    inline,
    columns,
    cols = inline ? COLS.inline : columns ? COLS.columns : COLS.default,
    formGroup = {},
    ...props
  }, ref) => (
    <Form.Group
      {...formGroup}
      className={clsx(
        styles.group,
        formGroup.className
      )}
      as={Col}
      cols={cols}
    >
      <Component
        {...props}
        inline={inline}
        columns={columns}
        ref={ref}
      />
    </Form.Group>
  ))
}
