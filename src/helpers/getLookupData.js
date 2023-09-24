import React, { useCallback, useMemo, useEffect } from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// FUNCTIONS
import { lookupActions } from 'actions.js';
import { apiFetch } from 'functions.js';

// MAIN COMPONENT
export const getLookupData = args => Component =>
  compose(connect(({ lookups }) => ({ lookups }), { ...lookupActions }))(
    ({
      // REDUX STATE
      lookups,
      // REDUX DISPATCH
      init,
      load,
      error,
      flush,
      // REST
      ...props
    }) => {

      // PROPS
      const { lookup, lookupParams, lookupDeps, debug } = props;

      // CALLBACKS
      const fetchLookup = useCallback(
        () => {
          if (!lookup) return;
          apiFetch({
            endpoint: ENDPOINTS.lookup[lookup],
            params: lookupParams,
            onFetch: () => init(lookup),
            onSuccess: data => load(lookup, data.result || data),
            onError: () => error(lookup),
            debug
          });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [lookup, lookupDeps, init, load, error, debug]
      )

      // MEMOS
      const lookupData = useMemo(
        () => lookups[lookup],
        [lookup, lookups]
      )

      // EFFECTS
      useEffect(
        () => {
          fetchLookup();
          return flush(lookup);
        },
        [lookup, fetchLookup, flush]
      )

      return <Component lookupData={lookupData} {...props} />;
    }
  );
