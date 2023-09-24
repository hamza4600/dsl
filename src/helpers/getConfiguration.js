import React, { useCallback, useEffect, useRef } from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';
import { MODAL_PRIORITY, TIMES, VERSION } from 'globals.js';

// GLOBAL FUNCTIONS
import { configurationActions } from 'actions.js';
import { alertFunctions, apiFetch, modalFunctions } from 'functions.js';

// MAIN COMPONENT
export const getConfiguration = Component => {
  return compose(
    connect(
      ({ configuration }) => ({ configuration }),
      { ...configurationActions }
    )
  )(({
    // REDUX STATE
    configuration,
    // REDUX DISPATCH
    setConfiguration,
    clearConfiguration,
    // REST
    ...props
  }) => {

    // API FETCH
    const getConfiguration = useCallback(
      () => {
        apiFetch({
          endpoint: ENDPOINTS.session.getConfiguration,
          onSuccess: setConfiguration,
          loadingMessage: 'Configuring application',
          errorMessage: 'Unable to configure application.',
          messageFunctions: alertFunctions
        })
      },
      [setConfiguration]
    )

    // REFS
    let configurationTimerID = useRef(null);

    // CLEAR TIMER
    const clearConfigurationTimer = useCallback(
      () => {
        if (configurationTimerID.current) clearTimeout(configurationTimerID.current);
        configurationTimerID.current = null;
      },
      [configurationTimerID]
    )

    // SET TIMER
    const setConfigurationTimer = useCallback(
      () => {
        clearConfigurationTimer();
        configurationTimerID.current = setTimeout(() => {
          getConfiguration();
          setConfigurationTimer();
        }, TIMES.configurationTimerLength * 60 * 60 * 1000);
      },
      [getConfiguration, configurationTimerID, clearConfigurationTimer]
    )

    // MOUNT LISTENER
    useEffect(
      () => {
        getConfiguration();
      },
      [getConfiguration]
    )
    useEffect(
      () => {
        if (!configurationTimerID.current) setConfigurationTimer();
        return () => clearConfigurationTimer();
      },
      [getConfiguration, setConfigurationTimer, clearConfigurationTimer]
    )

    // VERSION LISTENER
    useEffect(
      () => {
        if (!!configuration && configuration.version && configuration.version !== VERSION)
          modalFunctions.add({
            type: 'confirmation',
            priority: MODAL_PRIORITY.high,
            title: 'New Update Available',
            body: `Version ${configuration.version} is now available. Please refresh the application to load updates.`,
            closeButton: false,
            cancelButton: {
              as: null
            },
            continueButton: {
              label: 'Refresh Application',
              onClick: () => window.location.reload(true)
            }
          })
      },
      [configuration]
    )

    return <Component {...props} />;
  })
}
