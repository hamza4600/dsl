import React, { useCallback, useState } from 'react';

// DEPENDENCIES
import { useFormikContext } from 'formik';

// GLOBAL VARIABLES
import { TODAY } from 'timeFormats.js';

// GLOBAL FUNCTIONS
import { formatDate } from 'functions.js';

// BOOTSTRAP COMPONENTS
import { Col, Row } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import Card from 'parts/card/Card';
import Main from 'parts/main/Main';
import Form from 'core/form/Form';
import Module from 'parts/module/Module';

// VARIABLES
const INITIAL_VALUES = {
  input: 'Text goes here',
  date: formatDate(TODAY, 4, true),
  select: 2,
  custom_select: 'Custom Value',
  check_list: [1, 3],
  radio_list: 2,
  text_area: 'Lorem ipsum dolor sit amet...'
}

// MAIN COMPONENT
const FormElements = () => {

  // STATE
  const [ disabled, disable ] = useState(false)
  const [ cleared, clear ] = useState(false)

  // CALLBACKS
  const disableToggle = useCallback(
    () => {
      disable(!disabled);
    },
    [disabled, disable]
  )
  const clearToggle = useCallback(
    () => {
      clear(!cleared);
    },
    [cleared, clear]
  )

  // RENDER
  return (
    <Main>
      <Form
        initialValues={cleared ? undefined : INITIAL_VALUES}
      >
        <InlineForm />
        <Card>
          <Module>
            <Row>
              <Col>
                <FormFields />
              </Col>
              <Col>
                <OutPut />
              </Col>
            </Row>
          </Module>
        </Card>
        <Row>
          <Col>
            <Button
              label={disabled ? 'Enable Inputs' : 'Disable Inputs'}
              onClick={disableToggle}
              outline
              fullWidth
            />
          </Col>
          <Col>
            <Button
              label={cleared ? 'Initialize Form' : 'Clear Form'}
              onClick={clearToggle}
              outline
              fullWidth
            />
          </Col>
          <Col>
            <Button
              type="submit"
              label="Submit Form"
              fullWidth
            />
          </Col>
        </Row>
      </Form>
    </Main>
  )
}

const OutPut = () => {

  // FORMIK CONTEXT
  const { values } = useFormikContext() || {};

  // RENDER
  return Object.keys(values).map((key, i) => (
    <p><strong>{key}:</strong> {JSON.stringify(values[key])}</p>
  ))
}

const InlineForm = props => (
  <Form.Inline size="sm">
    <Form.Label>Inline Form</Form.Label>
    <Form.Control
      name="input1"
      placeholder="Type Here"
      required
    />
    <Form.Group>
      <Form.Control
        name="input2"
        placeholder="Type Here"
        required
      />
      <Form.Select
        name="select"
        options={[
          {
            label: 'Option One',
            value: 1
          },
          {
            label: 'Option Two',
            value: 2
          },
          {
            label: 'Option Three',
            value: 3
          },
        ]}
        useBlank
        required
      />
    </Form.Group>
    <Form.Date
      name="date"
      useOptions
      range
    />
    <Form.Checklist
      name="checkbox"
      options={[
        {
          label: 'Check Here',
          value: 1
        }
      ]}
    />
  </Form.Inline>
)

const FormFields = props => (
  <Form.Body>
    <Form.Control
      name="input"
      label="Text Input"
      required
    />
    <Form.Control
      name="dollar"
      label="Dollar Input"
      schema="dollars"
      required
    />
    <Form.Textarea
      name="text_area"
      label="Text Area"
      required
    />
    <Form.Select
      name="select"
      label="Select"
      options={[
        {
          label: 'Option One',
          value: 1
        },
        {
          label: 'Option Two',
          value: 2
        },
        {
          label: 'Option Three',
          value: 3
        },
      ]}
      useBlank
      required
    />
    <Form.Select
      name="custom_select"
      label="Custom Select"
      options={[
        {
          label: 'Option One',
          value: 1
        },
        {
          label: 'Option Two',
          value: 2
        },
        {
          label: 'Option Three',
          value: 3
        },
      ]}
      filterOptions
      required
    />
    <Form.Checklist
      name="check_box"
      label="Check Box"
      options={[
        {
          label: 'Check Here',
          value: 1
        }
      ]}
    />
    <Form.YesNo
      name="yes_no"
      label="Yes/No"
    />
    <Form.Checklist
      name="check_list"
      label="Check List"
      options={[
        {
          label: 'Option One',
          value: 1
        },
        {
          label: 'Option Two',
          value: 2
        },
        {
          label: 'Option Three',
          value: 3
        },
      ]}
      required
    />
    <Form.Checklist
      name="radio_list"
      label="Radio Buttons"
      type="radio"
      options={[
        {
          label: 'Option One',
          value: 1
        },
        {
          label: 'Option Two',
          value: 2
        },
        {
          label: 'Option Three',
          value: 3
        },
      ]}
      required
    />
    <Form.Date
      name="date"
      label="Date"
      required
    />
    <Form.Date
      name="date_options"
      label="Date (with options)"
      useOptions
    />
    <Form.Date
      name="manual_date_range"
      label="Date Range"
      range
    />
    <Form.Date
      name="date_range"
      label="Date Range (with options)"
      range
      useOptions
    />
    <Form.Date
      name={['start_date', 'end_date']}
      label="Date Range (with separate values)"
      useOptions
    />
  </Form.Body>
)

// EXPORT
export default FormElements;
