import React, { useContext } from 'react';

// DEPENDENCIES
import { compose } from 'redux';

// GLOBAL VARIABLES
import { UPLOAD } from 'defaults.js';

// HELPERS
import { mountLog } from 'helpers/mountLog';
import { uploadContext } from './helpers/uploadContext';
import { uploadFormik } from './helpers/uploadFormik';
import { formikField } from '../../helpers/formik/formikField';
import { inputState } from '../../helpers/state/inputState';
import { inputValidation } from '../../helpers/state/inputValidation';
import { formGroup } from '../../helpers/layout/formGroup';
import { inputFeedback } from '../../helpers/layout/inputFeedback';
import { inputGroup } from '../../helpers/layout/inputGroup';
import { inputLabel } from '../../helpers/layout/inputLabel';
import { inputText } from '../../helpers/layout/inputText';
import { useHidden } from '../../helpers/layout/useHidden';

// CONTEXT
import { UploadContext } from './helpers/uploadContext.js';

// LOCAL COMPONENTS
import UploadButton from './parts/UploadButton';
import UploadItem from './parts/UploadItem';

// STYLES
import styles from './upload.module.scss';

// MAIN COMPONENT
export default compose(
  mountLog,
  inputValidation,
  formikField,
  inputState,
  useHidden,
  formGroup,
  inputLabel,
  inputFeedback,
  inputText,
  inputGroup,
  uploadContext,
  uploadFormik
)(({
  buttonOrder = UPLOAD.buttonOrder,
  ...props
}) => {

  // CONTEXT
  const { uploads = [] } = useContext(UploadContext) || {};

  // RENDER
  return (
    <div className={styles.container}>
      {!buttonOrder &&
        <UploadButton {...props} />
      }
      {uploads.map((upload, i) => (
        <UploadItem
          key={i}
          {...props}
          {...upload}
        />
      ))}
      {!!buttonOrder &&
        <UploadButton {...props} />
      }
    </div>
  )
})
