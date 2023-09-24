import React, { forwardRef, useCallback } from 'react';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// MAIN COMPONENT
export const handleSelect = Component => {
  return forwardRef(({
    onSelect,
    ...props
  }, ref) => {

    // PROPS
    const {
      name,
      form: {
        setFieldValue
      } = {}
    } = props;

    // CALLBACKS
    const handleSelect = useCallback(
      value => {
        doCallback(onSelect, value);
        doCallback(setFieldValue, name, value);
      },
      [name, onSelect, setFieldValue]
    )

    // RENDER
    return <Component
      {...props}
      onSelect={handleSelect}
      ref={ref}
    />
  })
}
