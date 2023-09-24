import React from 'react';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// LOCAL COMPONENTS
import ConfirmationModal from './ConfirmationModal';

// MAIN COMPONENT
const DeleteModal = ({
  label = 'entry',
  title = `Are you sure you want to delete this ${label}?`,
  body = 'This action cannot be undone.',
  cancelButton,
  continueButton,
  ...props
}) => {

  return <ConfirmationModal
    {...props}
    title={title}
    body={body}
    closeButton={false}
    continueButton={{
      as: Button.Delete,
      ...continueButton
    }}
  />
}

// EXPORT
export default DeleteModal;
