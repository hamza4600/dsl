import React from 'react';

// DEPENDENCIES
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints';

// GLOBAL FUNCTIONS
import { sessionActions } from 'actions.js';

// GLOBAL COMPONENTS
import Card from 'parts/card/Card';
import Form from 'core/form/Form';
import Record from 'parts/record/Record';

// MAIN COMPONENT
const AddDealerForm = compose(
  connect(
    ({
      user
    }) => ({
      user
    }),
    { ...sessionActions }
  ),
  withRouter
)(({
  // REDUX STATE
  user: {
    stores
  },
  // REACT ROUTER
  location: {
    pathname
  }
}) => {

  const FormBody = () => (
    <Form.Body>
      <Form.YesNo
        name='is_active'
        label='Active'
      />
      <Form.Control
        name='form_department'
        label='Department'
      />
      <Form.Control
        name='form_name'
        label='Form Name'
      />
      <Form.Textarea
        name='form_description'
        label='Form Description'
      />
      <Form.Control
        name='form_instructions_url'
        label='Form Instructions Url'
      />
      <Form.Control
        name='form_link_url'
        label='Form Link Url'
      />
      <Form.YesNo
        name='is_global'
        label='Global'
      />
      <Form.MultipleChoice
        name='make_dealer_id'
        label='Store'
        presetOptions={stores.map(({
          make_dealer_id,
          dealer_name
        }) => ({
          label: dealer_name,
          value: make_dealer_id
        }))}
        required
      />
    </Form.Body>

  )

  return (
    <Record.Update
      enableDelete={pathname.includes('edit') ? true : false}
      endpoints={ENDPOINTS.admin.dealerForm}
      label="Dealer form"
      title={pathname.includes('add') ? "Add Dealer Form" : "Edit Dealer Form"}
    >
      <Card
        body={<FormBody />}
      />
    </Record.Update>
  )
})

// EXPORT
export default AddDealerForm;
