import React, { useContext, useEffect } from 'react';

// DEPENDENCIES
import format from 'date-fns/format';
import { useParams } from 'react-router-dom';
import { useFormikContext } from 'formik';

// GLOBAL VARIABLES
import { DATE_FORMATS } from 'globals.js';
import { ENDPOINTS } from 'endpoints.js';

// HELPERS
// import useRecordView from 'helpers/getRecordView';
import { RecordContext } from 'helpers/getRecordData';
import { useDetail } from '../../helpers/DetailProvider';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import Card from '../../parts/Card';
import Changes from './parts/Changes';
import SaveField from '../../tools/SaveField';

// MAIN COMPONENT
const FMAssignmentForm = () => {
  // const { isAdd, isView } = useRecordView();
  const { setCompleted } = useDetail();

  const { recordID } = useParams();
  const { record: initialValues = {}, refetchRecord } = useContext(RecordContext) || {};
  const { values = {} } = useFormikContext() || {};

  // Set completed
  useEffect(() => {
    setCompleted('FMAssignment', initialValues.fm_assignment_user_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues.fm_assignment_user_id]);

  const { fm_assignment_user_id } = values;

  return (
    <Form.Body>
      <SaveField
        useButton
        endpoint={ENDPOINTS.amFinance.assignment.save}
        params={{
          salesId: recordID,
          fmAssignmentUserId: fm_assignment_user_id
        }}
        onSuccess={refetchRecord}
      >
        <Form.Select
          name="fm_assignment_user_id"
          label="FM Assignment"
          lookup="financeStaff"
          optionKeys={{
            label: 'full_name',
            value: 'site_user_id'
          }}
          useBlank
          dropdown={{
            maxHeight: '30rem'
          }}
        />
      </SaveField>
      <Form.Control name="fm_assignment_user_full_name" label="FM Assigned" input={{ append: <Changes /> }} plaintext />
      <Form.Control name="fm_assignment_time" label="FM Time Assigned" plaintext />
    </Form.Body>
  );
};

// EXPORT
export default function FMAssignment(props) {
  const { completed } = useDetail();
  const { record: { fm_assignment_time, ...record } = {} } = useContext(RecordContext) || {};

  const initialValues = {
    ...record,
    fm_assignment_time: fm_assignment_time ? format(new Date(fm_assignment_time), DATE_FORMATS.dateTime) : ''
  };

  return (
    <Card
      number={1}
      title="FM Assignment"
      completed={completed.FMAssignment}
      body={
        <Form initialValues={initialValues}>
          <FMAssignmentForm {...props} />
        </Form>
      }
    />
  );
}
