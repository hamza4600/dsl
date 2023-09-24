import React, { forwardRef, useCallback, useMemo } from 'react';

// DEPENDENCIES
import NumberFormat from 'react-number-format';

// GLOBAL VARIABLES
import { NUMBER_FORMATS } from 'numberFormats.js';

// GLOBAL FUNCTIONS
import { bugLog, doCallback } from 'functions.js';

// MAIN COMPONENT
export const numberFormat = Component => forwardRef(({
  onValueChange,
  numberFormat,
  // REST
  ...props
}, ref) => {

  // PROPS
  const {
    name,
    type,
    schema,
    value,
    disabled,
    plaintext,
    useHidden,
    input,
    debug,
    form: {
      setFieldValue
    } = {}
  } = props;

  // PROPS
  let { useFormattedValue, ...format } = numberFormat || NUMBER_FORMATS[schema] || NUMBER_FORMATS[type] || {};

  // CALLBACKS
  const handleValueChange = useCallback(
    ({ value, formattedValue }) => {
      doCallback(setFieldValue, name, useFormattedValue ? formattedValue : value);
      doCallback(onValueChange, { name, value, formattedValue })
      bugLog('set raw value', debug, name, value);
    },
    [name, onValueChange, useFormattedValue, debug, setFieldValue]
  )

  // MEMOS
  format = useMemo(
    () => {
      if (!Object.keys(format).length) return;
      const object = Object.assign({
        defaultValue: value,
        onValueChange: handleValueChange,
        displayType: plaintext ? 'text' : 'input',
        getInputRef: ref
      }, format)
      if (disabled) object.placeholder = undefined;
      return object;
    },
    [value, disabled, plaintext, ref, format, handleValueChange]
  )

  // RENDER
  return !!format ? (<>
    {(!plaintext || useHidden) &&
      <input
        type="hidden"
        name={name}
        value={value}
      />
    }
    <Component
      {...props}
      name={name ? `dummy.${name}` : undefined}
      input={{
        as: NumberFormat,
        ...input,
        ...format
      }}
    />
  </>) : (
    <Component
      {...props}
      ref={ref}
    />
  )
})
