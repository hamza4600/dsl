import React, { useState } from 'react';

// DEPENDENCIES
import queryString from 'query-string';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';
import { DELIVERY_METHOD, SHORT_TITLE } from 'globals.js';
import { AUTHENTICATION } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { logOut, makePath } from 'functions.js';

// BOOTSTRAP COMPONENTS
import { Col, Row } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import Page from '../parts/Page';

// MAIN COMPONENT
const RequestCode = compose(
  withRouter,
  connect(
    ({ user }) => ({ user })
  )
)(({
  history,
  user: {
    cell_phone_number = '',
    email_address = ''
  }
}) => {

  // METHOD STATE
  const [ deliveryMethod, setMethod ] = useState(undefined);

  // RENDER
  return (
    <Page
      title="One-time security code"
      message={`Select a delivery method for your one-time security code to access ${SHORT_TITLE}.`}
      back={{
        onClick: logOut
      }}
      args={{
        endpoint: ENDPOINTS.session.requestCode,
        onSuccess: () => history.push({
          pathname: makePath(AUTHENTICATION.enterCode),
          search: '?' + queryString.stringify({
            delivery_method: deliveryMethod
          })
        }),
        loadingMessage: 'Requesting one-time security code',
        errorMessage: 'Unable to request one-time security code.'
      }}
    >
      <Form.Body.Vertical>
        <Form.Checklist
          type="radio"
          name="delivery_method"
          options={[
            {
              value: DELIVERY_METHOD.text,
              label: `Text me at ${cell_phone_number.substring(0, cell_phone_number.length - 7)}**-****`
            },
            {
              value: DELIVERY_METHOD.email,
              label: `Email me at ${email_address.split('@')[0].substring(0, 2)}****@${email_address.split('@')[1]}`
            }
          ]}
          onChange={e => setMethod(e.target.value)}
          column
          required
        />
      </Form.Body.Vertical>
      <Page.Footer>
        <Row>
          <Col xs={24} lg={12}>
            <Button.Submit
              label="Send Security Code"
            />
          </Col>
        </Row>
      </Page.Footer>
    </Page>
  )
})

// EXPORT
export default RequestCode
