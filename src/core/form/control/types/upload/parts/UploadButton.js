import React, { useCallback, useContext } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { isFunction } from 'lodash';
import { useDropzone } from 'react-dropzone';

// GLOBAL VARIABLES
import { UPLOAD } from 'defaults.js';

// GLOBAL FUNCTIONS
import { apiFetch, doCallback, randomID } from 'functions.js';

// CONTEXT
import { UploadContext } from '../helpers/uploadContext';

// CORE COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './uploadButton.module.scss';

// MAIN COMPONENT
const UploadButton = ({
  name,
  button = {},
  uploadArgs = {},
  endpoints = UPLOAD.endpoints || {},
  endpoint = endpoints.upload,
  accept = UPLOAD.accept,
  multiple = UPLOAD.multple,
  uploadFieldValue,
  uploadMeta,
  onUpload,
  disabled,
  readonly,
  debug,
  // FORMIK BAG
  form: {
    setFieldTouched
  } = {},
}) => {

  // CONTEXT
  const {
    processing,
    uploads,
    addUpload,
    setSuccess,
    setError
  } = useContext(UploadContext) || {};

  // CALLBACKS
  const uploadFile = useCallback(
    file => {
      const uploadID = randomID();
      const { onFetch, onSuccess, onError, ...args } = isFunction(uploadArgs) ? uploadArgs(uploadID, file) : uploadArgs;

      apiFetch({
        method: 'POST',
        endpoint,
        headers: {
          'Content-Type': file.type,
          'Content-Length': file.size
        },
        body: file,
        useQueryString: true,
        errorMessage: 'Unable to upload file.',
        onFetch: () => {
          addUpload({
            uploadID,
            meta: {
              fileName: file.name
            }
          });
          doCallback(onFetch)
        },
        onSuccess: data => {
          const fieldValue = doCallback(uploadFieldValue, data, file);
          const meta = doCallback(uploadMeta, data, file);
          setSuccess(uploadID, file, meta, fieldValue);
          doCallback(onSuccess, data);
          doCallback(onUpload, uploadID, file, meta, fieldValue);
        },
        onError: error => {
          setError(uploadID);
          doCallback(onError, error);
        },
        debug,
        ...args,
      })
    },
    [uploadArgs, endpoint, addUpload, setSuccess, setError, debug, uploadFieldValue, uploadMeta, onUpload ]
  )

  // DROPZONE
   const handleDrop = useCallback(
    files => {
      doCallback(setFieldTouched, name, true);
      files.forEach(file => uploadFile(file));
    },
    [name, setFieldTouched, uploadFile]
  )
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop: handleDrop,
    disabled
  })
  const handleClick = useCallback(
    e => {
      e.stopPropagation();
      open(e);
    },
    [open]
  )
 
  // RENDER
  return (uploads.length > 0 && !multiple) || readonly ? null : (
    <div
      className={clsx(
        styles.container,
        isDragActive && styles.active,
        disabled && styles.disabled
      )}
      {...getRootProps()}
    >
      <input
        {...getInputProps({
          multiple,
          accept
        })}
      />
      <Button
        className={styles.button}
        variant={UPLOAD.variant}
        label="Upload"
        icon="upload"
        onClick={handleClick}
        fullWidth={UPLOAD.fullWidth}
        disabled={disabled || processing}
        {...button}
      />
    </div>
  )
}

export default UploadButton;
