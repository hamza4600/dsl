import React from 'react';

// DEPENDENCIES
import { withRouter } from 'react-router';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { AUTHENTICATION } from 'pathnames';

// GLOBAL FUNCTIONS
import { makePath } from 'functions';


// LOCAL COMPONENTS
import Page from '../parts/Page';

// BOOTSTRAP COMPONENTS
import { Col, Row } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';


// MAIN COMPONENT
const ForgotPasswordSent = compose(withRouter)(({ history }) => {
  const { state } = history.location;

  return (
    <Page
      title="Password Reset Email Sent"
      message={[
        `An email has been sent${!!state.email
          ? ` to ${state.email}`
          : ''
        }.`,
        'Follow the directions in the email to reset your password.',
        "If you don't receive an email, please check your Spam or Bulk Mail folders.",
      ]}
      back={{
        to: makePath(AUTHENTICATION.login)
      }}
    >
      <Row>
        <Col xs={24} lg={12}>
          <Button
            to={makePath(AUTHENTICATION.login)}
            label="Done"
            icon="checkmark"
          />
        </Col>
      </Row>
    </Page>
  )
});

// EXPORT
export default ForgotPasswordSent;
