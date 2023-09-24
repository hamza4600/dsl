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
const ResetPasswordSuccess = compose(withRouter)(() => (
  <Page
    title="Password Reset Successful"
    message="Your password has been successfully reset."
    back={{
      to: makePath(AUTHENTICATION.login)
    }}
  >
    <Row>
      <Col xs={24} lg={12}>
        <Button
          to={makePath(AUTHENTICATION.login)}
          label="Return to login"
        />
      </Col>
    </Row>
  </Page>
)
);

// EXPORT
export default ResetPasswordSuccess;
