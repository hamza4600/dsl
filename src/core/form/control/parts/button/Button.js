import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { compose } from 'redux';

// LOCAL HELPERS
import { formGroup } from '../../helpers/layout/formGroup';
import { inputLabel } from '../../helpers/layout/inputLabel';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './button.module.scss';

// MAIN COMPONENT
const FormButton = compose(
  formGroup,
  inputLabel
)(({
  className,
  text,
  ...props
}) => (
  <Button
    className={clsx(
      'form-button',
      styles.button,
      className,
    )}
    label={text}
    {...props}
  />
))

// EXPORT
export default FormButton;
