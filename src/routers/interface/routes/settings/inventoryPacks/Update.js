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
import Card from 'parts/card/Card';
import Form from 'core/form/Form';
import Record from 'parts/record/Record';

// STYLES
import styles from './update.module.scss';

// MAIN COMPONENT
const InventoryPackUpdate = () => (
  <Record.Update
    title="Inventory Pack"
    label="Inventory Pack"
    endpoints={{
      single: ENDPOINTS.admin.inventoryPacks.single
    }}
    backPathname={makePath(INTERFACE.settings, SETTINGS.inventoryPacks)}
    enableDelete
    initialValues={{
      is_active: 1,
      new_used: 1,
      pack_amount: 0,
      pack_title: '',
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
  const newUsed = record ? record.new_used : parseInt(params.get('new_used'));
  const newUsedLabel = NEW_USED_TYPES[newUsed]

  return (
    <Form.Body>
      <Form.Control
        name='inventoryPackId'
        required
        hidden
      />
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
      <Form.Control
        name='pack_account_to_credit'
        label='Account to Credit'
      />
      <Form.Textarea
        name='pack_description'
        label='Description'
      />
      <Form.MultipleChoice
        name='inventory_source_id'
        lookup="inventorySource"
        lookupParams={{
          new_used: newUsed
        }}
        optionKeys={{
          label: 'inventory_source',
          value: 'inventory_source_id'
        }}
        useBlank
        label='Apply To'
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
export default InventoryPackUpdate;
