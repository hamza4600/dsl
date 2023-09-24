import React, { forwardRef, useCallback, useContext, useMemo, useEffect } from 'react';

// DEPENDENCIES
import { compact, get, isArray } from 'lodash';
import { compose } from 'redux';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// CONTEXT
import { UploadContext } from './uploadContext';

export const uploadFormik = Component => compose(
  forwardRef
)((props, ref) => {

  // PROPS
  const {
    name,
    multiple,
    disabled,
    uploadMeta,
    // FORMIK BAG
    form: {
      setFieldValue,
      initialValues,
    } = {}
  } = props;

  // CONTEXT
  const {
    uploads,
    setUploads
  } = useContext(UploadContext) || {};

  // INITIALIZE CONTEXT
  const initialValue = useMemo( // get initial value form Formik form
    () => get(initialValues, name),
    [name, initialValues]
  )
  useEffect( // add uploads from initial value
    () => {
      if (!initialValue) return;
      let uploads = isArray(initialValue) ? initialValue : [initialValue];
      
      if (uploadMeta) {
        uploads = uploads.map(file => ({ ...file, meta: doCallback(uploadMeta, file) })) 
      }   
      setUploads(uploads)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [initialValue, setUploads]
  )

  // UPDATE FORMIK
  const fieldValueElement = useCallback( // format fieldValue element (i.e. as object or string)
    ({ fieldValue, success } = {}) => success ? fieldValue : undefined,
    []
  )
  const fieldValue = useMemo( // check/update fieldValue when uploads change
    () => multiple ? compact(uploads.map(upload => fieldValueElement(upload))) : fieldValueElement(uploads[0]),
    [uploads, multiple, fieldValueElement]
  )
  useEffect( // update Formik when fieldValue changes
    () => {
      if (name) doCallback(setFieldValue, name, fieldValue);
    },
    [name, fieldValue, setFieldValue]
  )

  // RESETTING
  useEffect( // clear uploads when disabling
    () => {
      if (disabled) setUploads([]);
    },
    [disabled, setUploads]
  )

  // RENDER
  return <Component {...props} ref={ref} />;
})
