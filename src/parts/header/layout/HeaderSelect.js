import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// STYLES
import styles from './headerSelect.module.scss';

// MAIN COMPONENT
const HeaderSelect = ({
  className,
  ...props
}) => (
  <Form.Select
    className={clsx(
      styles.select,
      className
    )}
    align="right"
    {...props}
  />
)

export default HeaderSelect
