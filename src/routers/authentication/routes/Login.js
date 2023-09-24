import React, { useState } from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';
import { AUTHENTICATION } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { sessionActions } from 'actions.js';
import { makePath } from 'functions.js';

// BOOTSTRAP COMPONENTS
import { Col, Row } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import Page from '../parts/Page';
import GoogleLogin from '../parts/GoogleLogin';

// STYLES
import styles from '../parts/page.module.scss';

// MAIN COMPONENT
const Login = compose(
  connect(({ configuration }) => ({ configuration }),
  { ...sessionActions })
)(
  ({
    // REDUX STATE
    configuration,
    // REDUX DISPATCH
    login,
  }) => {
    const [loginHint, setLoginHint] = useState('');
    return (
      <Page
        title='Log in to your account'
        message='Please enter your information.'
        args={{
          endpoint: ENDPOINTS.session.login,
          onSuccess: login,
          loadingMessage: 'Logging in',
          errorMessage: 'Unable to log in.',
        }}
      >
        <Form.Body.Vertical disabled={!configuration}>
          <Form.Control
            name='username'
            label='Username'
            autoComplete={true}
            autoFocus={true}
            required
            onChange={(e) => setLoginHint(e.target.value)}
          />
          <Form.Control
            type='password'
            name='password'
            label='Password'
            autoComplete='current-password'
            required
          />
          <Form.Text className='text-secondary'>
            <strong>WARNING</strong>: The information in this site is
            confidential and may be legally privileged. Do not share your login
            information. You can be personally liable for any violation of the
            company’s computer data policies.
          </Form.Text>
        </Form.Body.Vertical>
        <Page.Footer>
          <Row>
            <Col xs={24} lg={12}>
              <Button.Submit label='Log In' />
            </Col>
            <Col xs={24} lg={12} className={styles.btnRight}>
              <Button.Link
                label='Forgot Password?'
                to={makePath(AUTHENTICATION.forgotPassword)}
                variant='primary'
              />
            </Col>
          </Row>
          <div className={styles.or}>
            <hr />
            <span className='text-secondary'>or</span>
            <hr />
          </div>
          <GoogleLogin loginHint={loginHint} />
        </Page.Footer>
      </Page>
    );
  }
);

// EXPORT
export default Login;
