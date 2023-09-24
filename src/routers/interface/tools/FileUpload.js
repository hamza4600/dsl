import React from 'react';

// DEPENDENCIES
import { useSelector } from 'react-redux';
import { useFormikContext } from 'formik';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions';

// HELPERS
import useRecordView from 'helpers/getRecordView';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// STYLES
import styles from './fileUpload.module.scss';

const types = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/jpg',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv'
];

const FILE_NAME_MAP = {
  amFinance: 'salesattachment_pathname',
  inventory: 'inventoryattachment_filename',
  sales: 'salesattachment_pathname'
};

// MAIN COMPONENT
const FileUploadButton = ({ documentType, required, ...props }) => {
  const { isAdd, isView, view } = useRecordView();

  const user = useSelector(state => state.user);

  const { values } = useFormikContext();
  const { daily_sales_inventory_id, stock_num, vin_num } = values || {};
  const hasVinStock = !!vin_num && !!stock_num;

  const endpoints = ENDPOINTS.uploads[view];

  return (
    <Form.Upload
      label="Upload"
      button={{ className: styles.button }}
      accept={types}
      multiple
      uploadArgs={(_uploadID, file) => ({
        endpoint: isView ? endpoints.upload : endpoints.temp,
        params: {
          dailySalesInventoryId: daily_sales_inventory_id,
          documentType,
          fileName: file.name,
          stockNum: stock_num,
          vinNum: vin_num
        }
      })}
      deleteArgs={
        isView
          ? uploadID => ({
              method: 'DELETE',
              endpoint: makePath(endpoints.delete, uploadID),
              useFileID: true,
              loadingMessage: 'Removing file',
              successMessage: 'File was removed successfuly'
            })
          : {}
      }
      uploadFieldValue={data => ({
        fileId: data.fileId,
        inventoryattachment_id: data.fileId || 0,
        date_created: data.timecreated,
        created_by_id: user?.site_user_id,
        inventoryattachment_type_id: documentType,
        e_filename: data.e_filename,
        e_key: data.e_key,
        mimetype: data.mimetype
      })}
      uploadMeta={data => ({
        fileName: data[FILE_NAME_MAP[view]],
        uploadedBy: data.updated_by || data.uploadedBy,
        uploadedOn: data.date_updated || data.timecreated
      })}
      viewArgs={
        !isAdd
          ? uploadID => ({
              endpoint: makePath(endpoints.view, uploadID)
            })
          : {}
      }
      required={required}
      text={!hasVinStock ? 'VIN and Stock # are required' : undefined}
      disabled={!hasVinStock}
      {...props}
    />
  );
};

// EXPORT
export default FileUploadButton;
