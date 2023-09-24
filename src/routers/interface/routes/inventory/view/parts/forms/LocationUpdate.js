import React from 'react';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Button from 'core/tools/Button';
import { makePath } from 'functions.js';
import { ENDPOINTS } from 'endpoints.js';

//LOCAL COMPONENTS
import FileUpload from '../../../../../tools/FileUpload';

// LOCAL VARIABLES
import { FILE_TYPE_IDS } from '../../../variables';

// MAIN COMPONENT
/**
 *
 * @param {Object} props
 * @param {boolean} props.isNew
 * @param {boolean} props.isArrived
 * @param {string} props.vehicle
 * @param {Function} props.onCancel
 * @param {Function} props.onSuccess
 */
const LocationUpdate = props => {
  const { isNew, isArrived, vehicle, onCancel, onSuccess, dailySalesInventoryId, values } = props;
  const isOrder = +values.is_order === 1;

  // RENDER
  return (
    <Form
      method="PUT"
      endpoint={makePath(ENDPOINTS.inventory.single, dailySalesInventoryId)}
      loadingMessage={`Updating location for stock# ${values.stock_num}`}
      successMessage={`Location updated for stock# ${values.stock_num}`}
      errorMessage={`Failed to update the location for stock# ${values.stock_num}`}
      onSuccess={onSuccess}
      initialValues={values}
      formatParams={v => {
        return {
          ...v,
          located_at_dealership: isArrived ? 0 : 1,
          location_type_id: isArrived ? v.location_type_id[0] : 3
        };
      }}
    >
      <Form.Body>
        {isArrived ? (
          <>
            <Form.Checklist
              lookup="inventoryLocations"
              type="radio"
              name="location_type_id"
              label="Location"
              optionKeys={{ label: 'inventorylocation_type_name', value: 'inventorylocation_type_id' }}
              lookupParams={{ newUsed: isNew, vehicleAtDealership: 0 }}
              useBlank
              required
              onChange={e => {
                console.log(e.target.value);
              }}
            />
            <Form.Date name="location_arrival_date" label="Estimated Date of Arrival for Physical Check-in" required />
            <Form.Textarea name="location_comments" label="Location Comments" required />
          </>
        ) : (
          <>
            <span>
              You are confirming that {vehicle} is now physically at the dealership and an E-Post email will be sent to
              accounting.
            </span>
            <Form.Control
              name="retail_price"
              label={isNew ? 'MSRP' : 'Retail Price'}
              schema="dollars"
              required={isNew}
            />
            {isNew ? (
              <FileUpload
                label="MSRP Sticker"
                name="documentAttachment.msrp"
                documentType={FILE_TYPE_IDS.MSRP_STICKER_NEW}
              />
            ) : null}
            <Form.Control name="internet_price" label="Internet Price" schema="dollars" />
            <Form.Control
              name="invoice_cost"
              label={isNew ? 'Factory Invoice Cost' : 'ACV'}
              schema="dollars"
              required
            />
            <FileUpload
              label={isNew ? 'Factory Invoice' : 'Purchase Invoice'}
              name="documentAttachment.invoice"
              documentType={isNew ? FILE_TYPE_IDS.FACTORY_INVOICE_NEW : FILE_TYPE_IDS.PURCHASE_INVOICE_USED}
              required={!isOrder}
            />
          </>
        )}
        <Form.Row xs={24}>
          <Form.Col xs={10}>
            <Button.Submit variant="success" size="sm" />
          </Form.Col>
          <Form.Col xs={6}>
            <Button.Cancel
              type="button"
              icon={{ use: 'cancel', order: 2 }}
              label="Cancel"
              onClick={() => onCancel()}
              size="sm"
            />
          </Form.Col>
        </Form.Row>
      </Form.Body>
    </Form>
  );
};

// EXPORT
export default LocationUpdate;
