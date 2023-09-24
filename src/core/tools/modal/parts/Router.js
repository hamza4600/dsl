import React, { useCallback, useEffect, useMemo } from 'react';

// DEPENDENCIES
import { startCase } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL FUNCTIONS
import { doCallback, modalFunctions } from 'functions.js';

// LOCAL COMPONENTS
import { TYPES } from '../types/types';

// MAIN COMPONENT
const Router = compose(
  connect(
    ({
      modals: [ modal = {} ]
    }) => ({
      ...modal // Return the props of the first modal in the queue
    })
  )
)(({
  type,
  onExited,
  ...props
}) => {

  // WINDOW LOAD/UNLOAD LISTENER
  useEffect(
    () => {
      window.addEventListener('beforeunload', modalFunctions.clear)

      return () => {
        modalFunctions.clear();
        window.removeEventListener('beforeunload', modalFunctions.clear)
      }
    },
    []
  )

  // CALLBACKS
  const handleExited = useCallback(
    () => {
      doCallback(onExited);
      modalFunctions.increment();
    },
    [onExited]
  )

  // CHILD COMPONENT
  const Child = useMemo(
    () => TYPES[startCase(type)],
    [type]
  )

  // RENDER
  return !Child ? null : (
    <Child
      {...props}
      onExited={handleExited}
    />
  )
})

// EXPORT
export default Router;
