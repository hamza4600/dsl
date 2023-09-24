import React from 'react';

// DEPENDENCIES
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// GLOBAL FUNCTIONS
import { apiFetch, makePath } from 'functions.js';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './formButtons.module.scss';


// MAIN COMPONENT
const FormButtons = compose(
  withRouter
)(({
  backPathname,
  enableDelete = false,
  label,
  recordID,
  remove,
  // REACT ROUTER
  history
}) => (
  <div className={styles.buttons}>
    <Button.Save
      size="sm"
    />
    <Button.Cancel
      onClick={() => {
        backPathname ? history.push(backPathname) : history.goBack()
      }}
      size="sm"
    />
    {enableDelete ? (
      <Button.Delete
        size="sm"
        onClick={() => {
          apiFetch({
            method: 'DELETE',
            endpoint: makePath(remove, recordID),
            loadingMessage: `Deleting ${label.toLowerCase()}`,
            successMessage: `${label} deleted`,
            errorMessage: `Could not delete ${label.toLowerCase()}`
          })
          backPathname ? history.push(backPathname) : history.goBack();
        }}
      />
    ) : null}
  </div>
))

// EXPORT
export default FormButtons;
