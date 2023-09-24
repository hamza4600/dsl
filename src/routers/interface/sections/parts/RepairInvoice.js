import React, { Fragment, useCallback, useContext } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import { useFormikContext } from 'formik';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints';
import { NEW_USED } from 'codes';

// GLOBAL HELPERS/FUNCTIONS
import { RecordContext } from 'helpers/getRecordData';
import { apiFetch, documentFetch, modalFunctions } from 'functions.js';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import AddRepairInvoice from './AddRepairInvoice';
import FormFieldText from './FormFieldText';
import UploadItem from '../../tools/UploadItem';

// STYLES
import styles from './repairInvoice.module.scss';

// MAIN COMPONENT
const RepairInvoice = () => {
  const { recordID } = useParams();
  const { values } = useFormikContext() || {};
  const { refetchRecord } = useContext(RecordContext) || {};

  const { aryRepairInvoice = [], new_used } = values || {};

  const isNew = new_used === NEW_USED.new.numeric;

  const handleDelete = useCallback(
    fileId => {
      modalFunctions.add({
        type: 'confirmation',
        title: 'Confirm Delete',
        body: 'Are you sure you want to delete this attachment?',
        closeButton: false,
        continueButton: {
          label: 'Confirm',
          onClick: () => {
            apiFetch({
              method: 'DELETE',
              endpoint: ENDPOINTS.inventory.repair.deleteAttachment(recordID, fileId),
              loadingMessage: 'Deleting attachment',
              errorMessage: 'Unable to delete attachment.',
              onSuccess: () => refetchRecord()
            });
          }
        }
      });
    },
    [refetchRecord, recordID]
  );

  const handleDownload = useCallback(
    (fileId, fileName) => {
      documentFetch({
        endpoint: ENDPOINTS.inventory.repair.viewAttachment(recordID, fileId),
        loadingMessage: 'Downloading attachment',
        errorMessage: 'Unable to download attachment.',
        onSuccess: url => {
          const a = document.createElement('a');
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      });
    },
    [recordID]
  );

  return (
    <>
      {aryRepairInvoice.map((v, i) => {
        const {
          inventoryattachment_filename,
          inventoryattachment_id,
          created_by,
          date_created,
          updated_by,
          date_updated
        } = v.documentAttachment || {};
        return (
          <Fragment key={i}>
            <FormFieldText
              label={v.vendor_name}
              value={v.invoice_amount}
              schema="dollars"
              text={[null, v.comments]}
              className="mb-0"
              plaintext
            />
            {v.documentAttachment && inventoryattachment_filename ? (
              <Form.Row className={clsx('w-100', styles.row)}>
                <Form.Col cols={{ xs: 24, lg: 8 }} className={clsx('d-none d-lg-block', styles.label)} />
                <Form.Col cols={{ xs: 24, lg: 16 }} className={clsx('mt-n4 px-0 px-lg-4 pt-0', styles.col)}>
                  <UploadItem
                    {...v.documentAttachment}
                    meta={{
                      fileName: inventoryattachment_filename,
                      fileId: inventoryattachment_id,
                      uploadedBy: updated_by || created_by,
                      uploadedOn: date_updated || date_created
                    }}
                    onDelete={handleDelete}
                    onDownload={handleDownload}
                  />
                </Form.Col>
              </Form.Row>
            ) : null}
          </Fragment>
        );
      })}
      <AddRepairInvoice isNew={isNew} className="mb-3 mb-lg-0" />
    </>
  );
};

// EXPORT
export default RepairInvoice;
