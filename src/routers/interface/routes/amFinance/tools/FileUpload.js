import React, { useEffect } from 'react';

// DEPENDENCIES
import { useFormikContext } from 'formik';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// LOCAL COMPONENTS
import FileUploadComponent from '../../../tools/FileUpload';

// MAIN COMPONENT
const FileUpload = ({ label, name, documentType, disabled, ...props }) => {
  const { values, setFieldValue } = useFormikContext() || {};

  useEffect(() => {
    setFieldValue('stock_num', values?.inventory?.stock_num);
    setFieldValue('vin_num', values?.inventory?.vin_num);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FileUploadComponent
      label={label}
      name={name}
      documentType={documentType}
      uploadArgs={(_uploadID, file) => ({
        endpoint: ENDPOINTS.uploads.amFinance.temp,
        params: {
          salesId: values.sales_id,
          documentType,
          fileName: file.name
        }
      })}
      deleteArgs={{}}
      text={undefined}
      disabled={disabled}
    />
  );
};

// EXPORT
export default FileUpload;
