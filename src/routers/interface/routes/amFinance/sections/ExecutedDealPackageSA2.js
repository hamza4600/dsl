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
const ExecutedDealPackageSA2Form = () => {
  // const { isAdd, isView } = useRecordView();
  const { completed, setCompleted } = useDetail();

  const { values } = useFormikContext() || {};

  const isRetail = values?.inventory?.new_used === RETAIL_WHOLESALE.label;

  useEffect(() => {
    setCompleted('ExecutedDealPackageSA2', values?.documentAttachment?.edp?.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values?.documentAttachment?.edp]);

  const { EXECUTED_DEAL_PACKAGE_SA2_RETAIL, EXECUTED_DEAL_PACKAGE_SA2_WHOLESALE } = FILE_TYPE_IDS;

  return (
    <Form.Body className="mb-2">
      <FileUpload
        label="Executed Deal Package (SA2)"
        name="documentAttachment.edp"
        documentType={isRetail ? EXECUTED_DEAL_PACKAGE_SA2_RETAIL : EXECUTED_DEAL_PACKAGE_SA2_WHOLESALE}
        disabled={!completed.InvoiceSA1}
      />
    </Form.Body>
  );
};

// EXPORT
export default function ExecutedDealPackageSA2(props) {
  const { completed } = useDetail();
  const { record: initialValues = {} } = useContext(RecordContext) || {};

  return (
    <Card
      number={7}
      title="Executed Deal Package (SA2)"
      completed={completed.ExecutedDealPackageSA2}
      body={
        <Form initialValues={initialValues}>
          <ExecutedDealPackageSA2Form {...props} />
        </Form>
      }
    />
  );
}
