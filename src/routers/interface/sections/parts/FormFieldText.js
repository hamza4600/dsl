import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// STYLES
import styles from './formFieldText.module.scss';

// MAIN COMPONENT
export default function FormFieldText({
                                        key,
                                        label,
                                        text = [],
                                        className,
                                        labelClassName,
                                        ...props
}) {
  const textArray = Array.isArray(text) ? text : [text];
  return (
    <Form.Row key={key} className={clsx('w-100', styles.row, className)}>
      <Form.Col cols={{ xs: 24, lg: 8 }} className={styles.label}>
        <Form.Label className={labelClassName}>{label}</Form.Label>
      </Form.Col>
      <Form.Col cols={{ xs: 24, sm: 8, lg: 4 }} className={styles.col}>
        <Form.Control className={className ? "" : styles.text } plaintext {...props} />
      </Form.Col>
      {textArray.map((c, i) => {
        const cIsObject = !!c && typeof c === 'object' && Object.hasOwn(c, 'label') && Object.hasOwn(c, 'className');

        return (
          <Form.Col
            key={i}
            cols={{ xs: 24, sm: 8, lg: 6 }}
            className={clsx('d-flex align-items-center', styles.col)}
          >
            <span className={clsx(styles.text, cIsObject && c.className)}>
              {cIsObject ? c.label : c}
            </span>
          </Form.Col>
        );
      })}
    </Form.Row>
  );
}
