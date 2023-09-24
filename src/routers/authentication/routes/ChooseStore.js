import React from 'react';

// DEPENDENCIES
import { compose } from 'redux';
import { connect } from 'react-redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// GLOBAL FUNCTIONS
import { sessionActions } from 'actions.js';
import { logOut } from 'functions.js';

// BOOTSTRAP COMPONENTS
import { Col, Row } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import Page from '../parts/Page';

// MAIN COMPONENT
const ChooseStore = compose(
  connect(
    ({ user }) => ({ user }),
    { ...sessionActions }
  )
)(({
  user: {
    stores = []
  },
  setStore
}) => (
  <Page
    title="Choose a store"
    message="Please choose a store you would like to access."
    back={{
      onClick: logOut
    }}
    args={{
      endpoint: ENDPOINTS.session.chooseStore,
      onSuccess: setStore,
      loadingMessage: 'Submitting dealership choice',
      errorMessage: 'Unable to submit dealership choice.'
    }}
  >
    <Form.Body.Vertical>
      <Form.Select
        name="make_dealer_id"
        label="Store"
        options={stores.map(({
          make_dealer_id,
          dealer_name
        }) => ({
          label: dealer_name,
          value: make_dealer_id
        }))}
        required
        fullWidth
      />
    </Form.Body.Vertical>
    <Page.Footer>
      <Row>
        <Col xs={24} lg={12}>
          <Button.Submit
            label="Enter"
          />
        </Col>
      </Row>
    </Page.Footer>
  </Page>
))

// EXPORT
export default ChooseStore
