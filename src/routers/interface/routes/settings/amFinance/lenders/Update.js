import React, { useContext } from 'react';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints';
import { INTERFACE, SETTINGS, AM_FINANCE } from 'pathnames';

// GLOBAL FUNCTIONS
import { makePath } from 'functions';

// GLOBAL HELPERS
import { RecordContext } from 'helpers/getRecordData';

// GLOBAL COMPONENTS
import Card from 'parts/card/Card';
import Form from 'core/form/Form';
import Record from 'parts/record/Record';

// MAIN COMPONENT
const LenderUpdate = () => {
  return (
    <Record.Update
      title="Lender"
      label="Lender"
      endpoints={{
        single: ENDPOINTS.admin.amFinance.lenders
      }}
      backPathname={makePath(INTERFACE.settings, SETTINGS.amFinance, AM_FINANCE.lenders)}
      initialValues={{
        is_active: 1,
      }}
    >
      <Card
        body={<FormBody/>}
      />
    </Record.Update>
  )
};

const FormBody = () => {
  // CONTEXT
  const { record } = useContext(RecordContext) || {};

  return (
    <Form.Body>
      <Form.YesNo
        name='is_active'
        label='Active'
        required
      />
      <Form.Control
        name='lender_name'
        label='Lender Name'
        required
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
};

// EXPORT
export default LenderUpdate;
