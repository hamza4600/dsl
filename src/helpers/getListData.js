import React, { createContext, useCallback, useEffect, useReducer, useState} from 'react';

// DEPENDENCIES
import _ from 'lodash';
//import queryString from 'query-string';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { TABLE_ROWS } from 'globals.js';

// GLOBAL FUNCTIONS
import { preferenceActions } from 'actions.js';
import { apiFetch } from 'functions.js';

// CONTEXT
export const ListContext = createContext(null);

// INIT/REDUCER
const init = () => ({
  settings: Object.assign({
      pageIndex: 0,
      lazyLoad: true
  }),
  data: {},
  result: []
});
const reducer = (state, { type, ...action }) => {

  const numRows = TABLE_ROWS.default
  const { pageIndex, lazyLoad} = state.settings || {};

  // RECORDS
  switch (type) {
    // DATA
    case 'loadData': // load all data
      const { result = [], ...data } = action || {};

      const settings = {
        ...state.settings,
        pageLoaded: pageIndex,
        reload: false
      };
      if (result.length < numRows) settings.lazyLoad = false;

      return pageIndex > 0
        ? {
            ...state,
            settings,
            data,
            result: [...state.result, ...result]
          }
        : {
            ...state,
            settings,
            data,
            result
          };

    // FILTERS
    case 'updateSettings': // update filter parameters
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action
        }
      };

    // PAGINATION
    case 'paginate': // update filter parameters
      if (!lazyLoad) return state; // if lazyload is disabled, do not paginate

      return {
        ...state,
        settings: {
          ...state.settings,
          pageIndex: pageIndex + 1
        }
      };
    case 'resetPagination': // update filter parameters
      return {
        ...state,
        settings: {
          ...state.settings,
          pageIndex: 0,
          lazyLoad: true,
          reload: true
        }
      };

    // DEFAULT
    default:
      throw new Error();
  }
};

// MAIN COMPONENT
export const getListData = (Component, { key, fetchArgs = {}, columns, actions, defaults } = {}) =>
compose(
  connect(
    ({ preferences }) => ({ preferences }),
    { ...preferenceActions }
  ),
  withRouter
)(({
  // REDUX STATE
  preferences: { [key]: preferences = {} },
  // REDUX DISPATCH
  setPreference,
  updatePreference,
  clearPreference,
  // REACT ROUTER
  history,
  location,
  match,
  staticContext,
  // REST
  ...props
}) => {

  // PROPS
  const { filters, showColumns } = preferences;

  // STATE
  const [context, updateContext] = useReducer(reducer, {}, init);
  const [close, setClose] = useState(false);
  const { settings } = context;

  // RECORD FETCH
  const fetchRecords = useCallback(
    ({ params, ...args } = {}) => {
      apiFetch(
        Object.assign(
          _.cloneDeep(fetchArgs),
          {
            params: Object.assign(_.cloneDeep(args.state? { ...args.state} : fetchArgs.params || {}), params),
            loadingMessage: 'Loading records',
            errorMessage: 'Unable to load records.',
            onSuccess: data =>{
              if (close) return
              updateContext({
                type: 'loadData',
                ...data
              })
            }
          },
          args
        )
      )
    },
    [updateContext]
  );
  // FETCH SEARCH RESULTS
  useEffect(() => {
    const { pageIndex = 0, pageLoaded, lazyLoad, reload } = settings || {};
    const { startRow = 1, numRows = TABLE_ROWS.default } = filters || {};
    if (pageIndex > 0 && !lazyLoad) return; // not first page and lazyloading disabled, so ignore

    if(location?.state){
      fetchRecords({
      params: {
        ...filters,
        startRow: numRows * pageIndex + startRow
      },
      state: location?.state
    })
    }
  }, [filters, fetchRecords, location?.state])
  
  // FETCH PATH/DEPENDENCY LISTENER
  useEffect(() => {
if(!location.state)
    {
      if (!filters) return; // wait for filters to initialize before fetching
    const { pageIndex = 0, pageLoaded, lazyLoad, reload } = settings || {};
    const { startRow = 1, numRows = TABLE_ROWS.default } = filters || {};

    if (pageIndex === pageLoaded && !reload) return; // same page, no need to load data
    if (pageIndex > 0 && !lazyLoad) return; // not first page and lazyloading disabled, so ignore
    
    fetchRecords({
      params: {
        ...filters,
        startRow: numRows * pageIndex + startRow
      }
    })
    return () => setClose(true)
  }
  }, [settings, filters, fetchRecords]);

  // FILTERS
  /*
  useEffect(() => {
    history.push({
      search: '?' + queryString.stringify(filters) // search params are updated when filters are toggled
    });
  }, [history, filters]);
  */
  const updateFilters = useCallback(
    filters => {
      updatePreference(key, {filters});
      updateContext({
        type: 'resetPagination'
      })
    },
    [updatePreference]
  )
  const updateFilter = useCallback(
    (update = {}) => {
      if (
        Object.keys(update).find(key => (update[key] || filters[key]) && (update[key] !== filters[key]))
      )
      updateFilters(Object.assign({}, filters, update))
    },
    [filters, updateFilters]
  )
  useEffect(
    () => {
      if (!filters) updatePreference(key, {
        filters: defaults || {}
      })
    },
    [filters, updatePreference]
  )

  // COLUMNS
  const updateColumns = useCallback(
    showColumns => {
      updatePreference(key, {showColumns})
    },
    [updatePreference]
  )
  useEffect(
    () => {
      if (!showColumns) updatePreference(key, {
        showColumns: columns.map(({ key }) => key)
      })
    },
    [showColumns, updatePreference]
  )

  // RENDER
  return (
    <ListContext.Provider
      value={{
        columns,
        actions,
        preferences,
        updateFilters,
        updateFilter,
        updateColumns,
        ...context,
        updateContext
      }}
    >
      <Component {...props} />
    </ListContext.Provider>
  );
})
