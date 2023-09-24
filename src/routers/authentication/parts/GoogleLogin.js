import React from 'react';

// DEPENDENCIES
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import queryString from 'query-string';
import urljoin from 'urljoin';

// ACTIONS
import { sessionActions } from 'actions.js';

// FUNCTIONS
import { alertFunctions } from 'functions.js';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// IMAGES
import { ReactComponent as GoogleGraphic } from 'img/google.svg';

// STYLES
import styles from './googleLogin.module.scss';

const GOOGLE_CONFIGURATION =
  'https://accounts.google.com/.well-known/openid-configuration';

export default function GoogleLogin({ loginHint }) {
  const { google_oauth_client_id } =
    useSelector((state) => state.configuration) || {};
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    try {
      const googleConfigResponse = await fetch(GOOGLE_CONFIGURATION);
      const googleConfig = await googleConfigResponse.json();

      const { authorization_endpoint } = googleConfig;

      const csrfToken = uuidv4();
      const nonce = uuidv4();

      const params = {
        response_type: 'id_token',
        client_id: google_oauth_client_id,
        scope: 'openid email',
        redirect_uri: urljoin(window.location.origin, 'login-verify'),
        state: `csrf_token=${csrfToken}`,
        login_hint: loginHint,
        nonce,
      };

      dispatch(sessionActions.setCsrfTokens({ csrfToken, nonce }));

      window.location.href = `${authorization_endpoint}?${queryString.stringify(
        params
      )}`;
    } catch (err) {
      alertFunctions.error('Unable to sign in. Please try again.');
      console.error(err);
    }
  };

  return (
    <Button
      type='button'
      variant='secondary'
      label={
        <>
          <GoogleGraphic className='mr-2' />
          Sign in with Google
        </>
      }
      fullWidth
      className={styles.google}
      onClick={handleGoogleClick}
    />
  );
}
