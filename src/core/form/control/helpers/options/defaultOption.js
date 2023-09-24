import React, { forwardRef, useEffect, useMemo } from 'react';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// MAIN COMPONENT
export const defaultOption = Component => {
  return forwardRef(({
    useDefault,
    ...props
  }, ref) => {

    // PROPS
    const {
      name,
      options,
      selection,
      form: {
        setFieldValue
      } = {}
    } = props;

    // MEMOS
    const defaultOption = useMemo(
      () => Array.isArray(options) && useDefault ? options[0] : undefined,
      [options, useDefault]
    )

    // INITIALIZE VALUE
    useEffect(
      () => {
        if (defaultOption && !selection) {
          // This is a hacky method of waiting to call setFieldValue after Formik mounts
          setTimeout(() => doCallback(setFieldValue, name, defaultOption.value), 1)
        }
      },
      [name, selection, setFieldValue, defaultOption]
    )

    // RENDER
    return <Component {...props} ref={ref} />
  })
}
