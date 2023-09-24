import React, { forwardRef, useEffect, useRef } from 'react';

// DEPENDENCIES
import { useFormikContext } from 'formik';
import { isEmpty } from 'lodash';

// GLOBAL FUNCTIONS
import { doCallback, modalFunctions } from 'functions.js';

// MAIN FUNCTIONS
export const formError = Component => forwardRef(({
  messageFunctions = modalFunctions,
  forwardedRef,
  ...props
}, ref) => {

  // FORMIK CONTEXT
  const { errors, submitCount, isSubmitting } = useFormikContext() || {};

  // REFS
  const prevCount = useRef(0);

  // MESSAGE EFFECT
  useEffect(
    () => {
      if (submitCount === prevCount.current) return; // No new submit
      if (isSubmitting) return; // Submission still in progress
      prevCount.current = submitCount; // Track new submit
      if (isEmpty(errors)) return; // No errors
      const removeError = messageFunctions.error('Check invalid fields.');
      return () => doCallback(removeError);
    },
    [errors, submitCount, prevCount, isSubmitting, messageFunctions]
  )

  // RENDER
  return <Component {...props} ref={ref} />;
})
