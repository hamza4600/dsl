import React from 'react';

// PRIMARY TYPES
import AlertModal from './AlertModal';
import DialogModal from './DialogModal';

// SECONDARY TYPES
import ConfirmationModal from './ConfirmationModal';
import DeleteModal from './DeleteModal';
import FormModal from './FormModal';
import SessionModal from './SessionModal';

// EXPORT
export const TYPES = {
  Alert        : AlertModal,
  Loading      : props => <AlertModal {...props} type="loading" dismissible={'false'} duration={false} />,
  Dialog       : DialogModal,
  Confirmation : ConfirmationModal,
  Delete       : DeleteModal,
  Form         : FormModal,
  Session      : SessionModal
}

// SUB COMPONENTS
