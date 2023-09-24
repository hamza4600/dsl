import React from 'react';

// LOCAL COMPONENTS
import ConfirmationModal from './ConfirmationModal';

// MAIN COMPONENT
const FormModal = ({
  initialValues,
  args = {},
  fields,
  submitButton,
  ...props
}) => {
  return (
    <ConfirmationModal
      form={{
        initialValues,
        ...args
      }}
      body={fields}
      continueButton={{
        type: 'submit',
        ...submitButton
      }}
      {...props}
    />
  )
}

// EXPORT
export default FormModal;
