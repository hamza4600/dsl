import React, { useContext, useEffect, useState } from 'react';

// DEPENDENCIES
// import { useParams } from 'react-router-dom';
// import { useFormikContext } from 'formik';

// GLOBAL VARIABLES
// import { ENDPOINTS } from 'endpoints.js';

// HELPERS
// import useRecordView from 'helpers/getRecordView';
import { RecordContext } from 'helpers/getRecordData';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import Card from '../parts/Card';
// import SaveField from '../../../tools/SaveField';

// MAIN COMPONENT
const ProofDMSPostingForm = ({ completed, onCompleted }) => {
  // const { isAdd, isView } = useRecordView();

  // const { recordID } = useParams();
  const { record: initialValues = {} } = useContext(RecordContext) || {};
  // const { values } = useFormikContext() || {};

  useEffect(() => {
    onCompleted(false);
  }, [onCompleted, initialValues]);

  return (
    <Form.Body>
      <div />
    </Form.Body>
  );
};

// EXPORT
export default function ProofDMSPosting(props) {
  const [completed, setCompleted] = useState(false);
  const { record: initialValues = {} } = useContext(RecordContext) || {};

  return (
    <Card
      number={10}
      title="Proof DMS Posting"
      completed={completed}
      body={
        <Form initialValues={initialValues}>
          <ProofDMSPostingForm {...props} completed={completed} onCompleted={setCompleted} />
        </Form>
      }
    />
  );
}
