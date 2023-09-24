import React, { createContext, useCallback, useEffect, useReducer } from 'react';

// DEPENDENCIES
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// GLOBAL FUNCTIONS
import { apiFetch, makePath } from 'functions.js';

// CONTEXT
export const RecordContext = createContext(null);

// REDUCER
const reducer = (state, { type, ...action }) => {

  // RECORD
  switch (type) {
    case 'fetchData':

      return {
        ...state,
        loading: true,
      }

    // DATA
    case 'loadData': // load all data

      const { result } = action;

      return {
        ...state,
        loading: false,
        record: result || action
      };

    case 'fetchFailed':

      return {
        ...state,
        loading: false
      }

    // DEFAULT
    default:
      throw new Error();
  }
}

// MAIN COMPONENT
export const getRecordData = (
  Component,
  {
    label = 'record',
    fetchArgs = {}
  } = {}
) => compose(
  withRouter
)(({
  // REACT ROUTER
  history,
  location,
  match: {
    params: {
      recordID
    }
  },
  staticContext,
  // REST
  ...props
}) => {

  // PROPS
  const { endpoints = {} } = props;

  // STATE
  const [ context, updateContext ] = useReducer(reducer, {});

  // RECORD FETCH
  const fetchRecord = useCallback(
    ({ loading = true, ...args } = {}) => {

      const endpoint = fetchArgs.endpoint || endpoints.get || endpoints.single;

      if (!endpoint || !recordID)
        return;

      apiFetch({
        ...fetchArgs,
        endpoint: makePath(endpoint, recordID),
        loadingMessage: `Loading ${label}`,
        errorMessage: `Unable to load ${label}.`,
        onFetch: () => {
          if (loading) updateContext({ type: 'fetchData' })
        },
        onSuccess: data => {
          updateContext({
            type: 'loadData',
            ...data
          })
        },
        onError: () => updateContext({ type: 'fetchFailed' }),
        ...args
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [endpoints, recordID, updateContext]
  )

  // FETCH PATH/DEPENDENCY LISTENER
  useEffect(
    () => {
      fetchRecord()
    },
    [fetchRecord]
  )

  // RENDER
  return (
    <RecordContext.Provider value={{
      recordID,
      ...context,
      refetchRecord: (args = {}) => fetchRecord({ loading: false, ...args }),
      updateContext
    }}>
      <Component {...props} />
    </RecordContext.Provider>
  )
})
