import React from 'react';

// GLOBAL FUNCTIONS
import omit from 'lodash/omit';

// DEPENDENCIES
import { useSelector } from 'react-redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// GLOBAL FUNCTIONS
import { apiFetch } from 'functions.js';

// GLOBAL COMPONENTS
import Form from 'core/form/Form.js';

// MAIN COMPONENT
const CompleteTask = ({ completed, rowIndex, setCompleted, taskId, updateList }) => {
  const { first_name, last_name } = useSelector(state => state.user) || {};

  const handleComplete = (taskId, isCompleted) => {
    apiFetch({
      method: 'PUT',
      endpoint: ENDPOINTS.dealTasks.complete,
      params: {
        task_id: taskId,
        is_completed: isCompleted ? 1 : 0
      },
      loadingMessage: `${isCompleted ? 'Completing' : 'Opening'} task`,
      errorMessage: `Unable to ${isCompleted ? 'complete' : 'open'} comment.`,
      onSuccess: () => {
        if (isCompleted) {
          setCompleted(s => ({ ...s, [taskId]: { by: [first_name, last_name].join(' '), on: new Date() } }));
        } else {
          setCompleted(omit(completed, taskId));
        }

        // Updating row task_cnt without reloading the list
        updateList(list => {
          const d = list[rowIndex];
          return Object.assign([], list, {
            [rowIndex]: {
              ...list[rowIndex],
              task_cnt: isCompleted ? +d.task_cnt - 1 : +d.task_cnt + 1
            }
          });
        });
      }
    });
  };

  const checked = !!completed[taskId];

  return (
    <Form.Checkbox
      name={`completed-${taskId}`}
      onChange={e => handleComplete(taskId, e.target.checked)}
      className="mt-n1 mr-4"
      containerClassName="h-auto"
      checked={checked}
      value={checked}
    />
  );
};

// EXPORT
export default CompleteTask;
