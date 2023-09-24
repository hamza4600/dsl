import React, { useCallback } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './toggleButton.module.scss';

// MAIN COMPONENT
const ToggleButton = ({
  className,
  name,
  value,
  active,
  onClick,
  // FORMIK
  form: {
    setFieldValue,
    setFieldTouched
  } = {},
  // REST
  ...props
}) => {

  // CHECK STATE
  const handleClick = useCallback(
    () => {
      doCallback(onClick, value, name);
      doCallback(setFieldTouched, name, true);
      doCallback(setFieldValue, name, value);
    },
    [name, value, onClick, setFieldValue, setFieldTouched]
  )

  // RETURN
  return (
    <Button
      className={clsx(
        styles.button,
        !!active && styles.active,
        className
      )}
      variant={active ? 'primary' : 'custom'}
      onClick={handleClick}
      outline={!active}
      disabled={active}
      {...props}
    />
  )
}

// EXPORT
export default ToggleButton;
