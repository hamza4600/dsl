import React, { useContext, useEffect } from 'react';

// DEPENDENCIES
import { useFormikContext } from 'formik';

// GLOBAL VARIABLES
import { NEW_USED } from 'codes';

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
import Preloader from 'parts/preloader/Preloader';

// MAIN COMPONENT
const InvoiceSA1Form = () => {
  // const { isAdd, isView } = useRecordView();
  const { completed, setCompleted } = useDetail();

  const { values } = useFormikContext() || {};

  const isNew = values?.inventory?.new_used === NEW_USED.new.numeric;

  // TODO: Implement Retail/Wholesale logic
  // const isRetail = values?.inventory?.new_used === RETAIL_WHOLESALE.label;

  useEffect(() => {
    setCompleted('InvoiceSA1', values?.documentAttachment?.invoice?.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values?.documentAttachment?.invoice]);

  const { FACTORY_INVOICE_SA1_RETAIL, PURCHASE_INVOICE_SA1_RETAIL } = FILE_TYPE_IDS;

  return (
    <Form.Body className="mb-2">
      <FileUpload
        label={isNew ? 'Factory Invoice' : 'Purchase Invoice'}
        name="documentAttachment.invoice"
        documentType={isNew ? FACTORY_INVOICE_SA1_RETAIL : PURCHASE_INVOICE_SA1_RETAIL}
        disabled={!completed.DealCompletionChecklist}
      />
    </Form.Body>
  );
};

// EXPORT
export default function InvoiceSA1(props) {
  const { completed } = useDetail();
  const { record: initialValues = {}, loading } = useContext(RecordContext) || {};

  const isNew = initialValues?.inventory?.new_used === NEW_USED.new.numeric;

  return (
    <Preloader loading={loading}>
      <Card
        number={7}
        title={isNew ? 'Factory Invoice (SA1)' : 'Purchase Invoice (SA1)'}
        completed={completed.InvoiceSA1}
        body={
          <Form initialValues={initialValues}>
            <InvoiceSA1Form {...props} />
          </Form>
        }
      />
    </Preloader>
  );
}
