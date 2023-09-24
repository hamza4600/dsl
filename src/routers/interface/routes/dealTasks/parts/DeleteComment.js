import React from 'react';

// GLOBAL FUNCTIONS
import clsx from 'clsx';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// GLOBAL FUNCTIONS
import { apiFetch, doCallback, modalFunctions } from 'functions.js';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './tasks.module.scss';

// MAIN COMPONENT
const DeleteComment = ({ commentId, reloadTasks }) => {
  const handleDeleteComment = id => {
    apiFetch({
      method: 'DELETE',
      endpoint: `${ENDPOINTS.dealTasks.comment.delete}/${id}`,
      loadingMessage: 'Deleting comment',
      errorMessage: 'Unable to delete comment.',
      onSuccess: () => doCallback(reloadTasks)
    });
  };

  return (
    <Button.Link
      icon={{
        use: 'delete',
        size: 'md'
      }}
      className={clsx('ml-auto', styles.delete)}
      onClick={() =>
        modalFunctions.add({
          type: 'confirmation',
          title: 'Confirm Delete',
          body: 'Are you sure you want to delete this comment?',
          closeButton: false,
          continueButton: {
            label: 'Confirm',
            onClick: () => handleDeleteComment(commentId)
          }
        })
      }
    />
  );
};

// EXPORT
export default DeleteComment;
