import React from 'react';

// GLOBAL CONSTANTS
import { ENDPOINTS } from 'endpoints';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Button from 'core/tools/Button';

// GLOBAL FUNCTIONS
import { apiFetch, makePath, modalFunctions } from 'functions';

const DailySalesAdd = ({ isNew: new_used, showResponse }) => {
  const handleFormSubmit = async ({ stockNo }, { method, endpoint, errorMessage, loadingMessage, successMessage }) =>
    await apiFetch({
      method,
      endpoint: makePath(endpoint, stockNo),
      params: {
        new_used: new_used,
        search_which: 'stock_num'
      },
      successMessage,
      loadingMessage,
      errorMessage,
      onError: result => {
        modalFunctions.clear();
        return showResponse(result, stockNo, new_used);
      },
      onSuccess: result => {
        return showResponse(result, stockNo, new_used);
      }
    });

  return (
    <Form
      onSubmit={handleFormSubmit}
      endpoint={ENDPOINTS.dailySales.listByStockNumber}
      loadingMessage="Searching vehicle"
      errorMessage="There are no vehicles found with the given Stock#"
      successMessage="Vehicle found"
      method="GET"
    >
      <Form.Body.Inline>
        <Form.Control name="stockNo" placeholder="Stock #" size="sm" />
        <Form.Col xs={4}>
          <Button.Add type="submit" outline size="sm" />
        </Form.Col>
      </Form.Body.Inline>
    </Form>
  );
};

export default DailySalesAdd;
