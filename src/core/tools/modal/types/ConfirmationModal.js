import React from 'react';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// LOCAL COMPONENTS
import DialogModal from './DialogModal';

// MAIN COMPONENT
const ConfirmationModal = ({
  cancelButton: {
    as: CancelButton = Button.Cancel,
    ...cancelButton
  } = {},
  continueButton: {
    as: ContinueButton = Button,
    ...continueButton
  } = {
    label: 'Continue'
  },
  ...props
}) => (
  <DialogModal
    {...props}
    buttons={[
      CancelButton === null ? null : (
        <CancelButton {...cancelButton} />
      ),
      ContinueButton === null ? null : (
        <ContinueButton {...continueButton} />
      )
    ]}
  />
)

// EXPORT
export default ConfirmationModal;
