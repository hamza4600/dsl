import React, { forwardRef, useCallback, useEffect, useMemo } from 'react';

// DEPENDENCIES
import { isString } from 'lodash';

// GLOBAL FUNCTIONS
import { bugLog, doCallback } from 'functions.js';

// MAIN COMPONENT
export const inputState = Component => forwardRef(({
  value,
  defaultValue = '',
  onValueChange,
  ...props
}, ref) => {

  // PROPS
  let {
    name,
    disabled,
    debug,
    form: {
      setFieldValue,
      setFieldError,
      validateField
    } = {}
  } = props;

  // MEMOS
  value = useMemo(
    () => {
      return value !== null && value !== undefined ? value : defaultValue
    },
    [value, defaultValue]
  )

  // CALLBACKS
  const initValue = useCallback(
    () => {
      if (!isString(name)) return;
      bugLog('init value', debug, name, value);
      doCallback(setFieldValue, name, value);
    },
    [name, value, debug, setFieldValue]
  )
  const clearValue = useCallback(
    () => {
      if (!isString(name)) return;
      bugLog('clear value', debug, name);
      doCallback(setFieldValue, name, undefined);
    },
    [name, debug, setFieldValue]
  )
  const clearErrors = useCallback(
    () => {
      if (!isString(name)) return;
      bugLog('clear errors', debug, name);
      doCallback(setFieldError, name, undefined);
    },
    [name, debug, setFieldError]
  )

  // LISTENERS
  useEffect(
    () => {
      initValue();
      return clearValue;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  useEffect(
    () => {
      bugLog('value', debug, name, value === '' ? 'BLANK' : value);
      doCallback(onValueChange, {
        name,
        value
      })
      doCallback(validateField, name);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value]
  )
  useEffect(
    () => {
      if (disabled) clearValue();
      if (disabled) clearErrors();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabled]
  )


  // RENDER
  return <Component {...props} value={value} ref={ref} />
})
