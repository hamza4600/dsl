import React, { useContext, useEffect } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { useFormikContext } from 'formik';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// HELPERS
// import useRecordView from 'helpers/getRecordView';
import { RecordContext } from 'helpers/getRecordData';
import { useDetail } from '../helpers/DetailProvider';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import Card from '../parts/Card';
import SaveField from '../tools/SaveField';

// STYLES
import styles from './dealDetails.module.scss';

// MAIN COMPONENT
const DealDetailsForm = () => {
  // const { isAdd, isView } = useRecordView();
  const { completed, setCompleted } = useDetail();

  const { record: initialValues = {}, refetchRecord } = useContext(RecordContext) || {};
  const { values } = useFormikContext() || {};

  useEffect(() => {
    const { sales_id, deal_number, customer_number, tag_state_code } = initialValues;
    setCompleted('DealDetails', !!sales_id && !!deal_number && !!customer_number && !!tag_state_code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  const { sales_id, deal_number, customer_number, tag_state_code } = values;

  const isDisabled = !completed.AMFIProducts;

  return (
    <Form.Body>
      <SaveField
        useButton
        endpoint={ENDPOINTS.amFinance.dealDetails.save}
        params={{
          sales_id,
          deal_number,
          customer_number,
          tag_state_code
        }}
        label="Deal Details"
        onSuccess={refetchRecord}
      >
        <Form.Control name="customer_number" label="Customer Number" disabled={isDisabled} />
        <Form.Select
          name="tag_state_code"
          label="Tag State"
          lookup="states"
          optionKeys={{
            label: 'state_name',
            value: 'state_code'
          }}
          useBlank
          dropdown={{
            maxHeight: '30rem'
          }}
          disabled={isDisabled}
        />
        <RegistrationAddress {...values} />
        <Form.Control name="deal_number" label="Deal Number" disabled={isDisabled} />
      </SaveField>
    </Form.Body>
  );
};

// EXPORT
export default function DealDetails(props) {
  const { completed } = useDetail();
  const { record: initialValues = {} } = useContext(RecordContext) || {};

  return (
    <Card
      number={4}
      title="Deal Details"
      completed={completed.DealDetails}
      body={
        <Form initialValues={initialValues}>
          <DealDetailsForm {...props} />
        </Form>
      }
    />
  );
}

function RegistrationAddress({
  registration_address1,
  registration_city,
  registration_state,
  registration_zip_code,
  registration_county
}) {
  return (
    <Form.Row className={styles.row}>
      <Form.Col cols={{ xs: 24, lg: 8 }} className={styles.label}>
        <Form.Label>Registration Address</Form.Label>
      </Form.Col>
      <Form.Col className={clsx(styles.address, 'd-flex flex-column justify-content-center pl-lg-4 large')}>
        <div>{registration_address1}</div>
        <div>
          {registration_city}, {registration_state} {registration_zip_code}
        </div>
        <div>{registration_county}</div>
      </Form.Col>
    </Form.Row>
  );
}
