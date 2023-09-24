import React, { createContext, forwardRef, useMemo, useReducer } from 'react';

// DEPENDENCIES
import { findIndex } from 'lodash';
import { compose } from 'redux';

// GLOBAL FUNCTIONS
import { doCallback, randomID } from 'functions.js';

// CONTEXT EXPORT
export const UploadContext = createContext(null);

// REDUCER
const reducer = (state, { type, uploads, upload, ...action }) => {

  const newState = [...state];
  const uploadIndex = findIndex(newState, ({ uploadID }) => uploadID === action.uploadID);

  switch (type) {

    case 'setUploads':
      return uploads;

    case 'addUpload':
      if (!action.multiple) return [{
        ...upload,
        uploading: true
      }]
      const count = newState.filter(({ meta: { fileName } }) => fileName === upload.meta.fileName).length;
      newState.push({
        ...upload,
        meta: {
          ...upload.meta,
          fileName: count ? `${upload.fileName} (${count})` : upload.meta.fileName
        },
        uploading: true
      })
      return newState;

    case 'removeUpload':
      if (uploadIndex < 0) return state;
      newState.splice(uploadIndex, 1);
      return newState;

    case 'updateUpload':
      if (uploadIndex < 0) return state;
      const oldUpload = newState[uploadIndex];
      newState[uploadIndex] = {
        ...oldUpload,
        ...action,
        meta: {
          ...oldUpload.meta,
          ...action.meta,
        }
      }
      return newState;

    default:
      throw new Error();
  }
}

// MAIN COMPONENET
export const uploadContext = Component => compose(
  forwardRef
)(({
  processUpload,
  ...props
}, ref) => {

  // PROPS
  const { multiple } = props;

  // STATE
  const [ uploads, updateContext ] = useReducer(reducer, []);

  // MEMOS
  const processing = useMemo(
    () => {
      uploads.forEach(({ uploading, deleting }) => {
        if (uploading || deleting) return true;
      })
    },
    [uploads]
  )

  // REDUCERS
  const reducers = useMemo(
    () => ({
      setUploads: uploads => updateContext({
        type: 'setUploads',
        uploads: uploads.map(upload => {
          const { meta = {} } = upload;
          return Object.assign({
            uploadID: randomID(),
            meta: {
              ...meta,
              fileName: meta.fileName || upload.fileName,
            },
            fieldValue: Object.assign({}, upload),
            success: true
          }, doCallback(processUpload, upload));
        })
      }),
      addUpload: upload => updateContext({
        type: 'addUpload',
        upload,
        multiple
      }),
      removeUpload: uploadID => updateContext({
        type: 'removeUpload',
        uploadID
      }),
      setDeleting: uploadID => updateContext({
        type: 'updateUpload',
        uploadID,
        deleting: true
      }),
      setError: uploadID => updateContext({
        type: 'updateUpload',
        uploadID,
        uploading: false,
        error: true
      }),
      setSuccess: (uploadID, file, meta = {}, fieldValue) => updateContext({
        type: 'updateUpload',
        uploadID,
        file,
        meta: { ...meta, fileName: meta.fileName || file.name },
        fieldValue,
        uploading: false,
        success: true
      })
    }),
    [updateContext, processUpload, multiple]
  )

  // RENDER
  return (
    <UploadContext.Provider value={{
      uploads,
      processing,
      ...reducers
    }}>
      <Component {...props} ref={ref} />
    </UploadContext.Provider>
  )
})
