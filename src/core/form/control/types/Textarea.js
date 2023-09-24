import React, { forwardRef } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { PLACEHOLDERS } from 'defaults.js';

// LOCAL HELPERS
import { inputValidation } from '../helpers/state/inputValidation';

// LOCAL COMPONENTS
import Control from '../Control';

// STYLES
import styles from './textarea.module.scss';

// MAIN COMPONENT
const Textarea = compose(
  inputValidation,
  forwardRef
)(({
  className,
  placeholder = PLACEHOLDERS.textarea,
  size,
  ...props
}, ref) => (
  <Control
    className={clsx(
      styles.textarea,
      styles[size],
      className,
      props.disabled && styles.disabled
    )}
    as={props.plaintext ? ({ className, value }) => <span className={className}>{value}</span> : 'textarea'}
    placeholder={placeholder}
    {...props}
  />
))

// EXPORT
export default Textarea;
