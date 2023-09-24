import React, { forwardRef } from 'react';

// DEPENDENCIES
import isNumber from 'lodash/isNumber';
import { Field } from 'formik';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// MAIN COMPONENT
export const formikField = Component => forwardRef(({
  validationSchema,
  onValidate,
  useFormik = true,
  // REST
  ...props
}, ref) => !!props.name && !!useFormik ? ( // eslint-disable-line
  <Field
    name={props.name}
    validate={onValidate}
  >{({ field: { value, onBlur, onChange }, form, meta }) => (
    <Component
      {...props}
      form={form}
      meta={{
        validationSchema,
        ...meta
      }}
      value={isNumber(value) ? value : (value===undefined ? props.value : value)}
      onBlur={e => {
        doCallback(props.onBlur, e);
        onBlur(e);
      }}
      onChange={e => {
        doCallback(props.onChange, e);
        onChange(e);
      }}
      forwardChange={props.onChange}
      ref={ref}
    />
  )}</Field>
) : (
  <Component
    {...props}
    ref={ref}
  />
))
