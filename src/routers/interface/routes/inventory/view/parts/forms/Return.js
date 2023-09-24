import React from 'react';

// GLOBAL VARIABLES
import { TODAY } from 'timeFormats.js';
import { ENDPOINTS } from 'endpoints';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Button from 'core/tools/Button';
import { formatDate } from 'functions';

// MAIN COMPONENT
/**
 *
 * @param {Object} props
 * @param {number} props.inventoryId
 * @param {string} props.stockNo
 * @param {Function} props.onCancel
 */
const Return = (props) => {
  const { inventoryId, stockNo ,onCancel, handleSuccess } = props;
  const handleCancel = () => onCancel();
const currentDate=formatDate(TODAY)
  // RENDER
  return (
    <Form
      method="PUT"
      endpoint={ENDPOINTS.inventory.return}
      initialValues={{dailysalesinventoryid: inventoryId}}
      onSuccess={handleSuccess}
      loadingMessage={`Returning stock # ${stockNo}`}
      successMessage={`Stock # ${stockNo} has been successfully returned`}
      errorMessage={`Failed to return stock # ${stockNo}`}
    >
      <Form.Body>
        <span>You are returning the vehicle to the original source and this vehicle will be removed from the inventory. Please provide the reason for return under comments.</span>
        <Form.Date
          name="dateReturned"
          label="Date Returned"
          value={currentDate}
          maxDate={TODAY}
        />
        <Form.Textarea required label='Comments' name='returnedComment' />
      </Form.Body>
      <Form.Row xs={24}>
        <Form.Col xs={10}>
          <Button.Submit variant="success" size="sm" disabled={false} />
        </Form.Col>
        <Form.Col xs={10}>
          <Button.Cancel
            type="button"
            icon={{ use: 'cancel' ,order: 2 }}
            label="Cancel"
            onClick={handleCancel}
            size="sm"
          />
        </Form.Col>
      </Form.Row>
    </Form>);
};

// EXPORT
export default Return;
