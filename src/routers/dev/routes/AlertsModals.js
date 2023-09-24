import React, { useCallback } from 'react';

// GLOBAL VARIABLES
import { MODAL_PRIORITY } from 'globals.js';

// GLOBAL FUNCTIONS
import { alertFunctions, modalFunctions } from 'functions.js'

// BOOTSTRAP COMPONENTS
import { Col, Row } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import Card from 'parts/card/Card';
import Main from 'parts/main/Main';
import Form from 'core/form/Form';
import Module from 'parts/module/Module';
import Alert from 'core/tools/alert/Alert';
import Modal from 'core/tools/modal/Modal';

// VARIABLES
const INITIAL_VALUES = {
}

// MAIN COMPONENT
const AlertsModals = () => {

  // CALLBACKS
  const handleSubmit = useCallback(
    form => {
      modalFunctions.add({
        type: 'session',
        body: new Date(new Date().getTime() + 120000),
        cancelButton: {
          onClick: () => console.log('Log Out')
        },
        continueButton: {
          onClick: () => console.log('Extend Session')
        },
        priority: MODAL_PRIORITY.high
      });
    },
    []
  )

  // RENDER
  return (
    <Main>
      <Card>
        <Module>
          <Alert.Router />
          <Form
            initialValues={INITIAL_VALUES}
            onSubmit={handleSubmit}
          >
            <Form.Group>
              <Row>
                <Col xs={24} lg={8}>
                </Col>
                <Col xs={24} lg={16}>
                  <Row>
                    <Col>
                      <Button
                        outline
                        fullWidth
                      />
                    </Col>
                    <Col>
                      <Button
                        outline
                        fullWidth
                      />
                    </Col>
                    <Col>
                      <Button
                        label="Show Alert/Modal"
                        onClick={handleSubmit}
                        fullWidth
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Module>
      </Card>
      <Modal.Router />
    </Main>
  )
}

// EXPORT
export default AlertsModals;
