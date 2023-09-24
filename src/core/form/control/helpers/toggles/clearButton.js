import React, { forwardRef, useCallback, useRef } from 'react';

// DEPENDENCIES
import { isFunction } from 'lodash';

// GLOBAL VARIABLES
import { APPEND } from 'defaults.js';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// STYLES
import styles from './clearButton.module.scss';

// MAIN COMPONENT
export const clearButton = Component => forwardRef(({
  clearButton,
  onClear,
  ...props
}, ref) => {

  // PROPS
  const {
    name,
    value,
    append,
    form: {
      setFieldValue,
      setFieldTouched
    } = {}
  } = props;

  // REFS
  const input = useRef(ref);

  // CALLBACKS
  const handleClick = useCallback(
    () => {
      doCallback(onClear);
      doCallback(setFieldTouched, name, true);
      doCallback(setFieldValue, name, undefined);
      if (input.current && isFunction(input.current.focus)) input.current.focus();
    },
    [name, onClear, setFieldValue, setFieldTouched, input]
  )

  // RENDER
  return !clearButton ? <Component {...props} ref={ref} /> : (
    <Component
      {...props}
      append={value ? {
        ...APPEND.clearButton,
        className: styles.append,
        onClick: handleClick
      } : append}
      ref={input}
    />
  )
})
