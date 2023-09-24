import React, { forwardRef } from 'react';

// DEPENDENCIES
import { Formik } from 'formik';

// MAIN COMPONENT
export const formik = Component => forwardRef(({
  initialValues = {},
  onSubmit,
  ...props
}, ref) => (
  <Formik
    enableReinitialize
    initialValues={initialValues}
    onSubmit={onSubmit}
    innerRef={ref}
    validateOnBlur={false}
    validateOnChange={false}
  >{(form) => (
    <Component form={form} {...props} />
  )}</Formik>
))
