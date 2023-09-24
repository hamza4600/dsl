import React, { forwardRef, useEffect, useMemo } from 'react';

// DEPENDENCIES
import isNil from 'lodash/isNil';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// MAIN COMPONENT
export const selectedOption = Component => {
  return forwardRef((props, ref) => {

    // PROPS
    const {
      name,
      value = '',
      options,
      allowCustom,
      // FORMIK BAG
      form: {
        setFieldValue
      } = {}
    } = props;

    // MEMOS
    const selection = useMemo(
      () => {
        if (!Array.isArray(options)) return;
        return options[options.findIndex(
          o => !isNil(o.value) && o.value.toString() === value.toString() 
        )];
      },
      [value, options]
    )

    // EFFECTS
    useEffect(
      () => {
        if (!selection && !allowCustom) doCallback(setFieldValue, name, "")
      },
      [name, allowCustom, setFieldValue, selection]
    )

    // RENDER
    return <Component
      {...props}
      selection={selection}
      ref={ref}
    />
  })
}
