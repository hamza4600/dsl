import React, { forwardRef } from 'react';

// DEPENDENCIES
import isFunction from 'lodash/isFunction';

// GLOBAL FUNCTIONS
import { apiFetch, bugLog } from 'functions.js';

// MAIN COMPONENT
export const formSubmit = Component => forwardRef(({
  onSubmit,
  method = 'POST',
  endpoint,
  onFetch,
  onResponse,
  onSuccess,
  onError,
  loadingMessage,
  successMessage,
  errorMessage,
  messageFunctions,
  forwardedRef,
  formatParams,
  resetOnSubmit = false,
  ...props
}, ref) => {

  // SUBMIT HANDLER
  const handleSubmit = (values, formikProps) => {
    const {
      debugOnly,
      debug
    } = props;

    bugLog(values, debug);

    const params = isFunction(formatParams) ? formatParams(values) : values;

    const args = {
      method,
      endpoint,
      onFetch,
      onResponse,
      onSuccess,
      onError,
      loadingMessage,
      successMessage,
      errorMessage,
      messageFunctions,
      debugOnly,
      debug
    }

    if (onSubmit) onSubmit(params, args);
    else apiFetch({
      params,
      ...args
    })

    if (resetOnSubmit) formikProps.resetForm();
  }

  // RENDER
  return <Component {...props} ref={forwardedRef} onSubmit={handleSubmit} messageFunctions={messageFunctions} />;
})
