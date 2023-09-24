import React from "react";

// DEPENDENCIES
import { withRouter } from "react-router-dom";
import { compose } from "redux";

// GLOBAL VARIABLES
import { ENDPOINTS } from "endpoints.js";
import { AUTHENTICATION } from "pathnames.js";

// GLOBAL FUNCTIONS
import { alertFunctions, makePath } from "functions.js";

// BOOTSTRAP COMPONENTS
import { Col, Row } from "react-bootstrap";

// GLOBAL COMPONENTS
import Button from "core/tools/Button";
import Form from "core/form/Form";

// LOCAL COMPONENTS
import Page from "../parts/Page";

// MAIN COMPONENT
const ForgotPassword = compose(withRouter)(({ history }) => {

  const handleFormSuccess = ({ result, success, message }) => success ?
    history.push({
      pathname: makePath(AUTHENTICATION.forgotPasswordSent),
      state: {
        email: result.email_address
      },
    }) : alertFunctions.error(message)

  return (
    <Page
      title='Forgot password?'
      message='Enter the username or email address associated with your account.'
      back={{
        to: makePath(AUTHENTICATION.login),
      }}
      args={{
        endpoint: ENDPOINTS.session.forgotPassword,
        onSuccess: handleFormSuccess,
        loadingMessage: "Requesting password...",
        errorMessage: "Unable to request password.",
      }}
    >
      <Form.Body.Vertical>
        <Form.Control
          type='text'
          name='login'
          label='Username or email address'
          required
          autoComplete={true}
          autoFocus={true}
        />
      </Form.Body.Vertical>
      <Page.Footer>
        <Row>
          <Col xs={24} lg={12}>
            <Button.Submit label='Submit' />
          </Col>
        </Row>
      </Page.Footer>
    </Page>
  )
});

// EXPORT
export default ForgotPassword;
