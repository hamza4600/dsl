import React, { forwardRef } from 'react';

// DEPENDENCIES
import { FieldArray } from 'formik';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// MAIN COMPONENT
export const formikFieldArray = Component => {
  const WrappedComponent = ({
    type,
    name,
    value,
    onBlur,
    forwardChange,
    forwardedRef,
    ...props
  }) => type === 'radio' ? <Component {...props} type={type} name={name} value={value} /> : (
    <FieldArray
      name={name}
    >{({ push, remove, replace }) => (
      <Component
        {...props}
        type={type}
        name={name}
        value={Array.isArray(value) ? value : [value]}
        onChange={e => {
          doCallback(forwardChange, e);
          if (e.target.checked) push(e.target.value);
          else remove(value.indexOf(e.target.value))
        }}
        ref={forwardedRef}
      />
    )}</FieldArray>
  );

  return forwardRef((props, ref) => <WrappedComponent {...props} forwardedRef={ref} />);
}
