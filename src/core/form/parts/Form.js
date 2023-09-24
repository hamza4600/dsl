import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { isFunction } from 'lodash';
import { compose } from 'redux';

// LOCAL HELPERS
import { formik } from '../helpers/formik';
import { formError } from '../helpers/formError';
import { formSubmit } from '../helpers/formSubmit';

// FORMIK COMPONENTS
import { Form as FormikForm } from 'formik';

// STYLES
import styles from './form.module.scss';

// MAIN COMPONENT
const Form = compose(
  formSubmit,
  formik,
  formError
)(({
  children,
  className,
  id,
  name,
  form
}) => (
  <FormikForm
    className={clsx(
      styles.form,
      className
    )}
    id={id}
    name={name}
    noValidate
  >
    {isFunction(children) ? children(form) : children}
  </FormikForm>
))

// EXPORT
export default Form;
