import React from 'react';

// DEPENDENCIES
import { useFormikContext } from 'formik';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// GLOBAL FUNCTIONS
import { apiFetch, doCallback } from 'functions.js';

// GLOBAL COMPONENTS
import Form from 'core/form/Form.js';

// MAIN COMPONENT
const CommentForm = ({ taskId, onAdded }) => {
  const { values, setValues } = useFormikContext();

  const handleAdd = () => {
    apiFetch({
      method: 'POST',
      endpoint: ENDPOINTS.dealTasks.comment.add,
      params: {
        task_id: taskId,
        comments: values.comment
      },
      loadingMessage: 'Adding comment',
      errorMessage: 'Unable to add comment.',
      onSuccess: () => {
        doCallback(onAdded)
        setValues({...values, comment:''})
      }
    });
  };

  return (
    <Form.Control
      name="comment"
      placeholder="Add Comment"
      size="sm"
      inline
      value={values.comment}
      append={{
        use: 'send',
        onClick: handleAdd
      }}
    />
  );
};

// EXPORT
export default CommentForm;
