import React, { useCallback, useEffect } from 'react';

// DEPENDENCIESE
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// BOOTSTRAP COMPONENTS
import { Col, Row } from "react-bootstrap";

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// GLOBAL FUNCTIONS
import { apiFetch, makePath } from 'functions.js';

// GLOBAL COMPONENTS
import Button from "core/tools/Button";
import Form from "core/form/Form";

// LOCAL COMPONENTS
import Page from '../parts/Page';
import { AUTHENTICATION } from 'pathnames';

const ResetPassword = compose(withRouter)(({ history, match }) => {
  const { tokenId: token } = match.params;

  const checkToken = useCallback(
    () => apiFetch({
      method: 'POST',
      endpoint: ENDPOINTS.session.checkToken,
      params: { token },
      onError: () => history.push({
        pathname: makePath(AUTHENTICATION.resetPasswordExpired)
      }),
      loadingMessage: 'Checking the reset password token',
      errorMessage: 'The provided token has expired'
    }),
    [token, history]
  )

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  return <Page title="Reset Your Password"
    back={{ to: makePath(AUTHENTICATION.login) }}
    args={{
      endpoint: ENDPOINTS.session.resetPassword,
      initialValues: { token },
      onSuccess: () => history.push({ pathname: makePath(AUTHENTICATION.resetPasswordSuccess) }),
      onError: () => history.push({ pathname: makePath(AUTHENTICATION.resetPasswordExpired) }),
      loadingMessage: 'Updating your password',
      errorMessage: 'An error has occured',
    }}>
    <Form.Body.Vertical>
      <Form.Control
        required
        confirmed
        type='password'
        name='newPassword'
        label='Password'
        schema='passkey'
        autoComplete={true}
      />
      <Form.Text>
        <div className='text-secondary'>
          <p>The password must meet the following requirements:</p>
          <ul>
            <li>Minimum 8 characters.</li>
            <li>At least one capitalized alphabetical character.</li>
            <li>At least one non-capitalized alphabetical character.</li>
            <li>At least one numerical character.</li>
            <li>At least one special character.</li>
          </ul>
        </div>
      </Form.Text>
    </Form.Body.Vertical>
    <Page.Footer>

      <Row>
        <Col xs={24} lg={12}>
          <Button.Submit label='Submit' />
        </Col>
      </Row>
    </Page.Footer>
  </Page>;
})

// EXPORT
export default ResetPassword;
