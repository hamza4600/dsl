import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// BOOTSTRAP COMPONENTS
import { Form } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Sprite from 'core/tools/Sprite';

// LOCAL COMPONENTS
import Control from '../../../Control';

// STYLES
import styles from './checkbox.module.scss';

// CHILD COMPONENT
const DependentControl = ({ as: Component = Control, className, checked, required, ...props }) => (
  <Component
    className={clsx(styles.formControl, className)}
    formGroup={{
      className: styles.formGroup,
      xs: 10,
      sm: 8,
      md: true
    }}
    disabled={!checked}
    required={required && checked}
    {...props}
  />
);

// MAIN COMPONENT
const Checkbox = ({
  className,
  containerClassName,
  type = 'checkbox',
  name,
  id,
  value,
  label,
  checked,
  onBlur,
  onChange,
  required,
  disabled,
  debug,
  control,
  ...props
}) => (
  <div className={clsx(styles.container, containerClassName)}>
    <Form.Check className={clsx('checkbox', styles.checkbox, className)} type={type}>
      <Form.Check.Input
        className={clsx(styles.input, disabled && styles.disabled)}
        type={type}
        name={name}
        id={id}
        value={value}
        label={label}
        checked={checked}
        onBlur={onBlur}
        onChange={onChange}
        disabled={disabled}
      />
      <div className={clsx('form-check-sprite', styles.sprite)}>
        <Sprite use={type === 'checkbox' ? 'checkmark' : 'radio'} size="xs" />
      </div>
      {label && <Form.Check.Label className={styles.label}>{label}</Form.Check.Label>}
    </Form.Check>
    {!!control && <DependentControl {...control} checked={checked} required={required} debug={debug} />}
  </div>
);

// EXPORT
export default Checkbox;
