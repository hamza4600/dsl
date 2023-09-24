import React, { useMemo } from 'react';

// DEPENDENCIES
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { findKey } from 'lodash';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';
import { DELIVERY_METHOD } from 'globals.js';
import { AUTHENTICATION } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { sessionActions } from 'actions.js';
import { alertFunctions, apiFetch, makePath } from 'functions.js';

// BOOTSTRAP COMPONENTS
import { Col, Row } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import Page from '../parts/Page';

// STYLES
import styles from '../parts/page.module.scss';

// MAIN COMPONENT
const EnterCode = compose(
  withRouter,
  connect(({ user }) => ({ user }), { ...sessionActions })
)(({ history, location, user, setVerification }) => {
  // MEMOS
  const contactMethod = useMemo(
    () => findKey(DELIVERY_METHOD, el => el === queryString.parse(location.search).delivery_method),
    [location.search]
  );
  const contactInfo = useMemo(() => {
    if (!contactMethod) return '';
    const contactInfo = {
      text: `${user.cell_phone_number.substring(0, user.cell_phone_number.length - 7)}**-****`,
      email: `${user.email_address.split('@')[0].substring(0, 2)}****@${user.email_address.split('@')[1]}`
    };
    return contactInfo[contactMethod];
  }, [contactMethod, user]);

  // RENDER
  return (
    <Page
      title="One-time security code"
      message={[
        `We have sent ${
          contactMethod === 'email' ? 'an' : 'a'
        } ${contactMethod} with one-time security code to ${contactInfo}. Once you receive the message, enter the security code and click “Submit”.`,
        `Please note that the ${contactMethod} can take a few minutes to be received.`
      ]}
      back={{
        to: makePath(AUTHENTICATION.login)
      }}
      args={{
        endpoint: ENDPOINTS.session.enterCode,
        onSuccess: setVerification,
        loadingMessage: 'Submitting one-time security code',
        errorMessage: 'Could not authenticate one-time security code.'
      }}
    >
      <Form.Body.Vertical>
        <Form.Control
          type="password"
          name="security_code"
          label="Security Code"
          append={{
            use: 'lock'
          }}
          autoFocus={true}
          required
        />
      </Form.Body.Vertical>
      <Page.Footer>
        <Row>
          <Col xs={24} lg={12}>
            <Button.Submit />
          </Col>
          <Col xs={24} lg={12} className={styles.btnRight}>
            <Button.Link
              label={
                <>
                  Re-send one-time <br className="d-none d-lg-block" />
                  security code
                </>
              }
              icon="refresh"
              onClick={() => {
                apiFetch({
                  method: 'POST',
                  endpoint: ENDPOINTS.session.requestCode,
                  params: {
                    deliveryMethod: queryString.parse(location.search).delivery_method
                  },
                  loadingMessage: 'Requesting one-time security code',
                  successMessage: 'One-time security code re-sent.',
                  errorMessage: 'Could not request one-time security code.',
                  messageFunctions: alertFunctions
                });
              }}
            />
          </Col>
        </Row>
      </Page.Footer>
    </Page>
  );
});

// EXPORT
export default EnterCode;
