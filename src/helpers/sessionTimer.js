import React, { useCallback, useEffect, useRef } from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';

// GLOBAL FUNCTIONS
import { sessionActions } from 'actions.js';
import { apiFetch, logOut, modalFunctions, timeExpired } from 'functions.js';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';
import { MODAL_PRIORITY, TIMES } from 'globals.js';

// VARIABLES
const LOGOUT_PAYLOAD =  {
  automatic: {
    alerts: [
      {
        variant: 'warning',
        message: 'You have been automatically signed out.'
      }
    ]
  },
  error: {
    alerts: [
      {
        variant: 'danger',
        message: 'Unable to extend session.'
      }
    ]
  }
}

// MAIN COMPONENT
export const sessionTimer = Component => connect(
  ({ tokenExp }) => ({ tokenExp }),
  { ...sessionActions }
)(({
  tokenExp,
  extendSession,
  ...props
}) => {

  // EXTEND SESSION FETCH
  const handleContinue = useCallback(
    () => {
      apiFetch({
        endpoint: ENDPOINTS.session.extendSession,
        method: 'POST',
        onSuccess: extendSession,
        onError: () => logOut(LOGOUT_PAYLOAD.error),
        errorMessage: 'Unable to extend session.'
      })
    },
    [extendSession]
  )

  // MODAL FUNCTION
  const showModal = useCallback(
    () => {
      modalFunctions.add({
        type: 'session',
        body: tokenExp,
        cancelButton: {
          onClick: logOut
        },
        continueButton: {
          onClick: handleContinue
        },
        priority: MODAL_PRIORITY.high
      })
    },
    [tokenExp, handleContinue]
  )

  // REFS
  let sessionTimerID = useRef(null);

  // CLEAR TIMER
  const clearSessionTimer = useCallback(
    () => {
      if (sessionTimerID.current) clearTimeout(sessionTimerID.current);
      sessionTimerID.current = null;
    },
    [sessionTimerID]
  )

  // CHECK TIMER
  const checkSessionTimer = useCallback(
    () => {
      if (!tokenExp || timeExpired(tokenExp)) {
        logOut(LOGOUT_PAYLOAD.automatic, false);
        return;
      }
      const warningTime = new Date(new Date(tokenExp).getTime() - TIMES.reauthWarningTime * 60000);
      if (warningTime && timeExpired(warningTime)) showModal();
      setSessionTimer(tokenExp);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tokenExp, showModal]
  )

  // SET TIMER
  const setSessionTimer = useCallback(
    () => {
      clearSessionTimer()
      sessionTimerID.current = setTimeout(checkSessionTimer, TIMES.sessionTimerLength * 1000, tokenExp);
    },
    [tokenExp, sessionTimerID, clearSessionTimer, checkSessionTimer]
  )

  // MOUNT LISTENER
  useEffect(
    () => {
      if (!sessionTimerID.current) setSessionTimer();
      return () => clearSessionTimer();
    },
    [setSessionTimer, clearSessionTimer]
  )

  // WINDOW LISTENER
  useEffect(
    () => {
      window.addEventListener('beforeunload', clearSessionTimer);
      return () => window.removeEventListener('beforeunload', clearSessionTimer);
    },
    [clearSessionTimer]
  )

  // RENDER
  return <Component {...props} />
})
