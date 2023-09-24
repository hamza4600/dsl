import React from 'react';

// DEPENDENCIES
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { useFormikContext } from 'formik';

// GLOBAL VARIABLES
import { NEW_USED } from 'codes';

// LOCAL VARIABLES
import { FILE_TYPE_IDS, INVENTORY_SOURCE_IDS } from './variables';

// GLOBAL COMPONENTS
import Card from 'parts/card/Card';
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import FileUpload from '../tools/FileUpload';

// MAIN COMPONENT
const InventoryAttachmentsForm = compose(withRouter)(({ location: { search } }) => {
  const { values } = useFormikContext() || {};
  const { new_used, inventory_source_id } = values || {};

  const params = new URLSearchParams(search);
  const newUsed = parseInt(params.get('new_used')) || new_used;
  const isNew = newUsed === NEW_USED.new.numeric;
  const isManufacturer = inventory_source_id === INVENTORY_SOURCE_IDS.MANUFACTURER;
  const isDealerDX = inventory_source_id === INVENTORY_SOURCE_IDS.DEALER_DX;

  return (
    <Form.Body>
      <FileUpload
        label="Other"
        name="documentAttachment.other"
        documentType={isNew ? FILE_TYPE_IDS.OTHER_NEW : FILE_TYPE_IDS.OTHER_USED}
      />
      {isDealerDX ? (
        <FileUpload
          label="DX Documents"
          name="documentAttachment.dx"
          documentType={isNew ? FILE_TYPE_IDS.BILL_OF_LADING_NEW : FILE_TYPE_IDS.BILL_OF_LADING_USED}
        />
      ) : null}
      {isManufacturer ? (
        <FileUpload
          label="Bill of Lading"
          name="documentAttachment.bol"
          documentType={isNew ? FILE_TYPE_IDS.DX_DOCUMENTS_NEW : FILE_TYPE_IDS.DX_DOCUMENTS_USED}
        />
      ) : null}
    </Form.Body>
  );
});

// EXPORT
export default function InventoryAttachments(props) {
  return <Card title="Inventory Attachments" body={<InventoryAttachmentsForm {...props} />} />;
}
