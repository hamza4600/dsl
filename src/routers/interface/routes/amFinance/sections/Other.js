import React, { useContext, useEffect } from 'react';

// DEPENDENCIES
import { useFormikContext } from 'formik';

// GLOBAL VARIABLES
import { RETAIL_WHOLESALE } from 'codes';

// LOCAL VARIABLES
import { FILE_TYPE_IDS } from './variables';

// HELPERS
// import useRecordView from 'helpers/getRecordView';
import { RecordContext } from 'helpers/getRecordData';
import { useDetail } from '../helpers/DetailProvider';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import Card from '../parts/Card';
import FileUpload from '../tools/FileUpload';

// MAIN COMPONENT
const OtherForm = () => {
  // const { isAdd, isView } = useRecordView();
  const { completed, setCompleted } = useDetail();

  const { values } = useFormikContext() || {};

  const isRetail = values?.inventory?.new_used === RETAIL_WHOLESALE.label;

  useEffect(() => {
    setCompleted('Other', values?.documentAttachment?.other?.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values?.documentAttachment?.other]);

  const { OTHER_RETAIL, OTHER_WHOLESALE } = FILE_TYPE_IDS;

  return (
    <Form.Body className="mb-2">
      <FileUpload
        label="Other"
        name="documentAttachment.other"
        documentType={isRetail ? OTHER_RETAIL : OTHER_WHOLESALE}
        disabled={!completed.ExecutedDealPackageSA2}
      />
    </Form.Body>
  );
};

// EXPORT
export default function Other(props) {
  const { completed } = useDetail();
  const { record: initialValues = {} } = useContext(RecordContext) || {};

  return (
    <Card
      number={9}
      title="Accounting Invoice / Bill of Sale (SA3)"
      completed={completed.Other}
      body={
        <Form initialValues={initialValues}>
          <OtherForm {...props} />
        </Form>
      }
    />
  );
}
