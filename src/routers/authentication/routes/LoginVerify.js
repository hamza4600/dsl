import React, { useEffect } from 'react';

// DEPENDENCIES
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// ACTIONS
import { sessionActions } from 'actions.js';

// FUNCTIONS
import { apiFetch, modalFunctions } from 'functions.js';

// GLOBAL COMPONENTS
import Loader from 'parts/loader/Loader';

const LoginVerify = () => {
  const location = useLocation();
  const history = useHistory();

  const { csrfToken, nonce } = useSelector((state) => state.csrfTokens) || {};
  const dispatch = useDispatch();

  const params = queryString.parse(location?.hash);
  const state = queryString.parse(params?.state);

  // Only once on mount
  useEffect(() => {
    const errorMessage = 'Unable to sign in. Please try again.';

    if (!csrfToken || csrfToken !== state?.csrf_token) {
      modalFunctions.error(errorMessage);
      history.push('/login/');
      return;
    }

    const args = {
      method: 'POST',
      endpoint: ENDPOINTS.session.googleSso,
      params: {
        google_oauth_token: params?.id_token,
        nonce,
      },
      onSuccess: (response) => {
        response.result.verified = true;
        dispatch(sessionActions.login(response));
        history.push('/');
      },
      onError: () => {
        history.push('/login/');
      },
      errorMessage,
    };

    apiFetch(args);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  dispatch(sessionActions.clearCsrfTokens());

  return <Loader loading label='Redirecting...' />;
};

// EXPORT
export default LoginVerify;
