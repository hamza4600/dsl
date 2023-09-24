import React, { forwardRef } from 'react';

// BOOTSTRAP COMPONENTS
import { Form } from 'react-bootstrap';

// STYLES
import styles from './inputText.module.scss';

// MAIN COMPONENT
export const inputText = Component => forwardRef(({
  text,
  ...props
}, ref) => (<>
  <Component {...props} ref={ref} />
  {!!text &&
    <Form.Text className={styles.text}>{text}</Form.Text>
  }
</>))
