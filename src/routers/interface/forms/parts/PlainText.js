import React from 'react';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// STYLES
import styles from './plainText.module.scss';

export default function PlainText(props) {
  return (
    <Form.Control
      {...props}
      formGroup={{
        className: styles.plaintext
      }}
      plaintext
    />
  );
}
