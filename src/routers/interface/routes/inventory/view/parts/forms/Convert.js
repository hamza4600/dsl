import React, { useState } from 'react';

// LOCAL VARIABLES
import { CONVERT_REASON } from '../../../variables';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Button from 'core/tools/Button';
import { modalFunctions } from 'functions'

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints';

// MAIN COMPONENT
/**
 *
 * @param {Object} props
 * @param {string} props.stockNo
 * @param {number} props.inventoryId
 * @param {Function} props.onCancel
 */
const Convert = props => {
  const { onCancel, inventoryId, stockNo, handleSuccess } = props;
  const [stockNum,setStockNum] = useState()

  const checkStockNo = (event) => {
    if(stockNo !== stockNum) {
      event.preventDefault()
      modalFunctions.error('Confirmed stock# is not a match')
    }
  }

  // RENDER
  return (
    <Form
      method="PUT"
      endpoint={ENDPOINTS.inventory.convert}
      initialValues={{ dailysalesinventoryid: inventoryId, convertreasonid: 1  }}
      loadingMessage={`Converting stock # ${stockNo}`}
      successMessage={`Stock # ${stockNo} has been converted`}
      errorMessage={`Failed to convert stock # ${stockNo}`}
      onSuccess={handleSuccess}
    >
      <Form.Body.Vertical fullWidth>
      <Form.Control name="dailysalesinventoryid" hidden />
        <Form.Text>
          What is the reason you're converting the vehicle?
        </Form.Text>
        <Form.Select 
          name="convertreasonid" 
          options={CONVERT_REASON} 
          required
          label="REASON"
        />
        <Form.Control label="COMMENT" name="convertreasoncomment" required />
        <Form.Label className="pb-0">STOCK#</Form.Label>
        <Form.Text>{stockNo}</Form.Text>
        <Form.Control label="CONFIRM STOCK#" name="stocknum" onChange={(event)=>setStockNum(event.target.value)} required  />
        <Form.Col>
          <Form.Row xs={24}>
            <Form.Col xs={10}>
              <Button.Submit onClick={checkStockNo} variant="success" size="sm"/>
            </Form.Col>
            <Form.Col xs={6}>
              <Button.Cancel
                type="button"
                icon={{ use: 'cancel', order: 2 }}
                label="Cancel"
                onClick={()=>onCancel()}
                size="sm"
              />
            </Form.Col>
          </Form.Row>
        </Form.Col>
      </Form.Body.Vertical>
    </Form>
  );
};

// EXPORT
export default Convert;
