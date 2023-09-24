import React, { useContext, useCallback } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { isFunction } from 'lodash';

// GLOBAL VARIABLES
import { BUTTON, UPLOAD } from 'defaults.js';

// GLOBAL FUNCTIONS
import { apiFetch, doCallback } from 'functions.js';

// CONTEXT
import { UploadContext } from '../helpers/uploadContext';

// CORE COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './deleteButton.module.scss';

// MAIN COMPONENT
const DeleteButton = ({
  className,
  uploadID,
  file,
  meta,
  fieldValue,
  success,
  deleteArgs = {},
  endpoints = UPLOAD.endpoints || {},
  endpoint = endpoints.delete,
  disabled,
  readonly,
  allowDelete = UPLOAD.allowDelete,
  onDelete,
  debug
}) => {

  // CONTEXT
  const {
    processing,
    setDeleting,
    setError,
    removeUpload
  } = useContext(UploadContext) || {};

  // CALLBACKS
  const handleClick = useCallback(
    () => {
      const { onFetch, onSuccess, onError, ...args } = isFunction(deleteArgs) ? deleteArgs(uploadID, file, meta, fieldValue) : deleteArgs;

      if ((endpoint || args.endpoint) && success) {
        apiFetch({
          method: 'POST',
          endpoint,
          errorMessage: 'Unable to delete upload.',
          onFetch: () => {
            setDeleting(uploadID);
            doCallback(onFetch);
          },
          onSuccess: data => {
            removeUpload(uploadID);
            doCallback(onSuccess, data);
            doCallback(onDelete, uploadID, file, meta, fieldValue);
          },
          onError: error => {
            setError(uploadID);
            doCallback(onError, error);
          },
          debug,
          ...args
        })
      } else {
        removeUpload(uploadID);
        doCallback(onDelete, uploadID, file, meta, fieldValue);
      }

    },
    [uploadID, file, meta, fieldValue, success, deleteArgs, endpoint, onDelete, setDeleting, setError, removeUpload, debug]
  )

  // RENDER
  return disabled || (readonly && !allowDelete) ? null : (
    <Button.Link
      className={clsx(
        className,
        styles.button
      )}
      icon={BUTTON.delete.icon}
      onClick={handleClick}
      disabled={processing}
    />
  )
}

export default DeleteButton;
