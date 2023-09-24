import React, { useContext } from 'react';

// DEPENDENCIES
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints';
import { INTERFACE, SETTINGS } from 'pathnames';
import { NEW_USED_TYPES } from 'globals.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions';

// GLOBAL HELPERS
import { RecordContext } from 'helpers/getRecordData';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Card from 'parts/card/Card';
import Record from 'parts/record/Record';

// STYLES
import styles from './update.module.scss';

// MAIN COMPONENT
const DealPackUpdate = () => (
  <Record.Update
    title="Deal Pack"
    label="Deal Pack"
    endpoints={{
      single: ENDPOINTS.admin.dealPacks.single
    }}
    backPathname={makePath(INTERFACE.settings, SETTINGS.dealPacks)}
    enableDelete
    initialValues={{
      is_active: 1,
      new_used: 1,
      pack_amount: 0,
      pack_title: '',
      pack_description: ''
    }}
  >
    <Card
      body={<FormBody/>}
    />
  </Record.Update>
)

const FormBody = compose(
  withRouter
)(({
  location: {
    search
  }
}) => {
  // CONTEXT
  const { record } = useContext(RecordContext) || {};

  const params = new URLSearchParams(search);
  const newUsed = params.get('new_used');

  const newUsedLabel = record
    ? NEW_USED_TYPES[record.new_used]
    : NEW_USED_TYPES[newUsed];

  return (
    <Form.Body>
      <Form.Control
        name='new_used'
        label='New Used'
        required
        hidden
      />
      <Form.Control
        className={styles.type}
        label='Type'
        value={newUsedLabel}
        plaintext
      />
      <Form.YesNo
        name='is_active'
        label='Active'
        required
      />
      <Form.Control
        name='pack_title'
        label='Title'
        required
      />
      <Form.Control
        name='pack_amount'
        label='Amount'
        schema='dollar'
      />
      <Form.Checklist
        className={styles.checklist}
        label='Sale Type'
        name='sale_type_category_id'
        lookup="salesTypeCategory"
        optionKeys={{
          label: 'sale_type_category_name',
          value: 'sale_type_category_id'
        }}
        useBlank
      />
      <Form.Textarea
        name='pack_description'
        label='Description'
      />
      {record && ([
        <Form.Control
          label='Created On'
          value={`${record.date_created} by ${record.updated_by}`}
          plaintext
        />,
        <Form.Control
          label='Updated On'
          value={`${record.date_updated} by ${record.updated_by}`}
          plaintext
        />
      ])}
    </Form.Body>
  )
});

// EXPORT
export default DealPackUpdate;
