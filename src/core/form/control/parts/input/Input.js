import React, { forwardRef } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { PLACEHOLDERS } from 'defaults.js';

// LOCAL HELPERS
import { inputGroup } from '../../helpers/layout/inputGroup';
import { inputGroupAddons } from '../../helpers/layout/inputGroupAddons';
import { inputAppend } from '../../helpers/layout/inputAppend';
import { inputFocus } from '../../helpers/state/inputFocus';
import { clearButton } from '../../helpers/toggles/clearButton';
import { infoButton } from '../../helpers/toggles/infoButton';

// BOOTSTRAP COMPONENTS
import { Form } from 'react-bootstrap';

// STYLES
import styles from './input.module.scss';

// MAIN COMPONENT
const Input = compose(
  inputFocus,
  inputAppend,
  inputGroup,
  infoButton,
  clearButton,
  inputGroupAddons,
  forwardRef
)(({
  id,
  as,
  className,
  type = 'text',
  schema,
  name,
  value = '',
  placeholder = PLACEHOLDERS.input,
  onBlur,
  onChange,
  onClick,
  onFocus,
  onKeyDown,
  required,
  readOnly,
  disabled,
  plaintext,
  inline,
  size,
  rows,
  htmlSize,
  autoComplete,
  autoFocus,
  tabindex,
  input = {}
}, ref) => as === 'span' || input.as === 'span' ? (
  <span
    className={clsx(
      'form-control',
      styles.control,
      styles.text,
      size === 'sm' && styles.small,
      !value && !!placeholder && styles.placeholder,
      className
    )}
    onBlur={onBlur}
    onClick={onFocus}
    onFocus={onFocus}
  >
    {value || placeholder}
  </span>
) : (
  <Form.Control
    id={id}
    className={clsx(
      styles.control,
      size === 'sm' && styles.small,
      className
    )}
    type={type}
    as={as}
    name={plaintext ? undefined : name}
    value={value}
    placeholder={!!plaintext ? '-' : !!disabled || !!readOnly ? undefined : placeholder}
    onBlur={onBlur}
    onChange={onChange}
    onClick={onClick}
    onFocus={onFocus}
    onKeyDown={onKeyDown}
    required={required}
    readOnly={readOnly || plaintext}
    disabled={disabled}
    plaintext={plaintext}
    size={size}
    htmlSize={htmlSize}
    rows={rows}
    autoComplete={autoComplete === true ? 'on' : autoComplete || 'off'}
    autoFocus={!!autoFocus}
    tabIndex={readOnly || disabled || plaintext ? -1 : tabindex}
    ref={ref}
    {...input}
  />
))

// EXPORT
export default Input;
