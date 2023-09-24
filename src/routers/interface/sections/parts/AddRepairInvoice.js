import React, { useContext, useEffect, useState } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

// LOCAL VARIABLES
import { FILE_TYPE_IDS } from '../variables';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints';

// GLOBAL HELPERS/FUNCTIONS
import { RecordContext } from 'helpers/getRecordData';
import { apiFetch } from 'functions.js';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import FileUpload from '../../tools/FileUpload';

// STYLES
import styles from './addRepairInvoice.module.scss';

// MAIN COMPONENT
const AddRepairInvoice = ({ className, isNew }) => {
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({});

  const { recordID } = useParams();
  const { refetchRecord } = useContext(RecordContext) || {};

  const required = ['dsl_vendor_id', 'invoice_amount', 'documentAttachment'];

  const handleClose = () => {
    setShow(false);
  };

  const handleSave = () => {
    setSubmitted(true);
    if (!required.filter(r => !values[r]).length) {
      apiFetch({
        method: 'POST',
        endpoint: ENDPOINTS.inventory.repair.save(recordID),
        params: {
          daily_sales_inventory_id: recordID,
          ...values,
          invoice_amount: +(values.invoice_amount || '').replace(/\$|,/g, '').trim()
        },
        onSuccess: () => {
          handleClose();
          refetchRecord();
        },
        loadingMessage: 'Saving repair invoice for payment',
        successMessage: 'Repair invoice for payment saved',
        errorMessage: 'Unable to save repair invoice for payment.'
      });
    }
  };

  useEffect(() => {
    if (show) {
      setSubmitted(false);
      setValues({});
    }
  }, [show]);

  return (
    <div className={clsx('w-100', className)}>
      <Form.Area
        label={{ label: 'Repair Invoice for Payment', className: 'd-flex align-items-center h-100' }}
        formGroup={{ className: 'py-2' }}
      >
        <Button.Add size="sm" outline className="w-auto" onClick={() => setShow(!show)} />
      </Form.Area>
      {show ? (
        <div className={clsx('w-100 bg-gray-000 px-3 px-lg-0 border rounded', styles.form)}>
          <Form.Select
            label="Vendor Name"
            name="aryRepairInvoice.dsl_vendor_id"
            lookup="vendor"
            optionKeys={{
              label: 'vendor_name',
              value: 'dsl_vendor_id'
            }}
            useBlank
            useFormik={false}
            value={values.dsl_vendor_id}
            onSelect={v => setValues({ ...values, dsl_vendor_id: v })}
            error={submitted && !values.dsl_vendor_id && 'Required Field'}
          />
          <Form.Control
            label="Invoice Amount to be Paid"
            name="aryRepairInvoice.invoice_amount"
            schema="dollars"
            useFormik={false}
            value={values.invoice_amount}
            onChange={e => setValues({ ...values, invoice_amount: e.target.value })}
            error={submitted && !values.invoice_amount && 'Required Field'}
          />
          <Form.Textarea
            label="Comments"
            name="aryRepairInvoice.comments"
            useFormik={false}
            value={values.comments}
            onChange={e => setValues({ ...values, comments: e.target.value })}
          />
          <FileUpload
            label="Invoice Signed by Authorized Manager"
            name="aryRepairInvoice.documentAttachment"
            documentType={isNew ? FILE_TYPE_IDS.REPAIR_INVOICE_NEW : FILE_TYPE_IDS.REPAIR_INVOICE_USED}
            useFormik={false}
            value={values.documentAttachment}
            onUpload={(_uploadID, file, _meta, v) =>
              setValues({
                ...values,
                documentAttachment: {
                  mimetype: v.mimetype,
                  timecreated: v.date_created,
                  e_filename: v.e_filename,
                  fileName: file.name,
                  e_key: v.e_key
                }
              })
            }
            error={submitted && !values.documentAttachment && 'Required Field'}
          />
          <Form.Row>
            <Form.Col cols={{ xs: 24, lg: 8 }} className={styles.label} />
            <Form.Col className="px-4">
              <Alert variant="warning" className="mb-3" style={{ maxWidth: '38rem' }}>
                Customer sensitive information such as the full Social Security number and or the full Credit / Debit
                Card information must be REDACTED before uploading.
              </Alert>
            </Form.Col>
          </Form.Row>
          <Form.Col>
            <Form.Row>
              <Form.Col cols={{ lg: 8, className: 'py-0', style: { maxWidth: '32rem' } }} />
              <Form.Col cols={{ lg: 16 }}>
                <div className="d-flex">
                  <Button.Cancel
                    label="Cancel" //
                    size="sm"
                    className="w-auto mr-4"
                    onClick={handleClose}
                  />
                  <Button
                    label="Save" //
                    size="sm"
                    className="w-auto"
                    onClick={handleSave}
                  />
                </div>
              </Form.Col>
            </Form.Row>
          </Form.Col>
        </div>
      ) : null}
    </div>
  );
};

// EXPORT
export default AddRepairInvoice;
