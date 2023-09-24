import React, { useContext, useEffect } from 'react';

// DEPENDENCIES
import { useFormikContext } from 'formik';

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
const AccountingInvoiceSA3Form = () => {
  // const { isAdd, isView } = useRecordView();
  const { completed, setCompleted } = useDetail();

  const { values } = useFormikContext() || {};

  useEffect(() => {
    setCompleted('AccountingInvoiceSA3', values?.documentAttachment?.ebos?.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values?.documentAttachment?.ebos]);

  return (
    <Form.Body className="mb-2">
      <FileUpload
        label="Accounting Invoice / Bill of Sale (SA3)"
        name="documentAttachment.ebos"
        documentType={FILE_TYPE_IDS.ACCOUNTING_INVOICE_BILL_OF_SALE_SA2}
        disabled={!completed.ExecutedDealPackageSA2}
      />
    </Form.Body>
  );
};

// EXPORT
export default function AccountingInvoiceSA3(props) {
  const { completed } = useDetail();
  const { record: initialValues = {} } = useContext(RecordContext) || {};

  return (
    <Card
      number={9}
      title="Accounting Invoice / Bill of Sale (SA3)"
      completed={completed.AccountingInvoiceSA3}
      body={
        <Form initialValues={initialValues}>
          <AccountingInvoiceSA3Form {...props} />
        </Form>
      }
    />
  );
}
