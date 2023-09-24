import React, { useEffect, useMemo } from 'react';

// DEPENDENCIES
import { findIndex } from 'lodash';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// MAIN COMPONENT
export const checkRoute = (Component, args = {}) => compose(
  withRouter
)(({
  // REACT ROUTER
  history,
  location,
  match,
  staticContext,
  // REST
  ...props
}) => {

  // MEMOS
  const pathname = useMemo(
    () => !location.pathname.search(args.subpath) ? makePath(location.pathname, args.subpath) : location.pathname,
    [location.pathname]
  )
  const search = useMemo(
    () => {
      const {
        defaults,
        allowed
      } = args.search || {};
      let search = queryString.parse(location.search);
      if (allowed) Object.keys(search).forEach(key => {
        const allowedKeys = Array.isArray(allowed) ? allowed : Object.keys(allowed);
        if (findIndex(allowedKeys, k => k === key) < 0) delete search[key];
        if (Array.isArray(allowed[key]) && findIndex(allowed[key], k => k === search[key]) < 0) delete search[key];
      })
      if (defaults) search = Object.assign(defaults, search);
      return search
    },
    [location.search]
  )

  // EFFECTS
  useEffect(
    () => {
      history.replace({
        pathname,
        search: '?' + queryString.stringify(search)
      })
    },
    [history, pathname, search]
  )

  return  <Component {...props} />;
})
