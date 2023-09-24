import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// STYLES
import styles from './formRow.module.scss';

export default function FormRow({ label, col1, col2, col3, col4, col5, col6, className }) {
  return (
    <Form.Row className={clsx('w-100', styles.row, className)}>
      <Form.Col cols={{ xs: 24, lg: 5 }} className={clsx('justify-content-end', styles.col)}>
        <>{label ? <Form.Label className="justify-content-end text-right">{label}</Form.Label> : col1}</>
      </Form.Col>
      <Form.Col cols={{ xs: 24, lg: 3 }} className={styles.col}>
        <>{col2}</>
      </Form.Col>
      <Form.Col cols={{ xs: 24, lg: 2 }} className={styles.col}>
        <>{col3}</>
      </Form.Col>
      <Form.Col cols={{ xs: 24, lg: 5 }} className={styles.col}>
        <>{col4}</>
      </Form.Col>
      <Form.Col cols={{ xs: 24, lg: 5 }} className={styles.col}>
        <>{col5}</>
      </Form.Col>
      <Form.Col cols={{ xs: 24, lg: 4 }} className={styles.col}>
        <>{col6}</>
      </Form.Col>
    </Form.Row>
  );
}
