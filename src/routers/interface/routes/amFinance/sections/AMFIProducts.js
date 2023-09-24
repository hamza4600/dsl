import React, { useContext, useEffect } from 'react';

// DEPENDENCIES
import { useParams } from 'react-router-dom';
import { useFormikContext } from 'formik';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// HELPERS
// import useRecordView from 'helpers/getRecordView';
import { RecordContext } from 'helpers/getRecordData';
import { useDetail } from '../helpers/DetailProvider';

// FUNCTIONS
import { apiFetch, modalFunctions } from 'functions.js';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import Card from '../parts/Card';
import AMFIProductsForm from '../../../forms/amfiProductsForm/AMFIProductsForm';

// FORM
const AMFIProductsComponent = () => {
  // const { isAdd, isView } = useRecordView();
  const { completed, setCompleted } = useDetail();

  const { recordID } = useParams();
  const { record: initialValues = {} } = useContext(RecordContext) || {};
  const { values, setFieldValue } = useFormikContext() || {};

  // Set completed
  useEffect(() => {
    setCompleted('AMFIProducts', !!initialValues.add_amfi_product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  const handleAdd = v => {
    apiFetch({
      method: 'PUT',
      endpoint: ENDPOINTS.amFinance.products.save(recordID),
      params: {
        add_amfi_product: v
      },
      loadingMessage: 'Saving AM/F&I Products',
      errorMessage: 'Unable to save'
    });
  };

  return (
    <Form.Body>
      <Form.YesNo
        name="add_amfi_product"
        label="Do you have a product or reserve to add?"
        className="mt-0"
        numeric={false}
        onChange={({ target: { value } }) => {
          if (['false', false].includes(value)) {
            modalFunctions.add({
              type: 'confirmation',
              body: 'Are you sure you do not have a product or reserve to add?',
              cancelButton: {
                onClick: () => {
                  setFieldValue('add_amfi_product', true);
                }
              },
              continueButton: {
                label: 'Confirm',
                onClick: () => handleAdd(value)
              }
            });
          } else {
            handleAdd(value);
          }
        }}
        disabled={!completed.FundingSource}
      />
      {/* TODO: Get api to return boolean instead of string */}
      {['true', true].includes(values.add_amfi_product) ? <AMFIProductsForm /> : null}
    </Form.Body>
  );
};

// MAIN COMPONENT
export default function AMFIProducts(props) {
  const { recordID } = useParams();
  const { record: initialValues, refetchRecord } = useContext(RecordContext) || {};
  const { completed } = useDetail();

  return (
    <Form
      method="PUT"
      endpoint={ENDPOINTS.amFinance.products.update(recordID)}
      formatParams={({ aryDealerAMFinance }) => ({
        aryDealerAMFinance: aryDealerAMFinance.map(a => ({
          dealer_amfinance_id: a.dealer_amfinance_id,
          item_gross: a.item_gross,
          item_selling_price: a.item_selling_price,
          item_cost: a.item_cost,
          is_checked: !!a.is_checked
        }))
      })}
      initialValues={initialValues}
      loadingMessage="Saving AM/F&amp;I Products"
      successMessage="AM/F&amp;I Products saved."
      onSuccess={refetchRecord}
    >
      <Card
        number={3}
        title="AM/F&amp;I Products"
        completed={completed.AMFIProducts}
        body={<AMFIProductsComponent {...props} />}
      />
    </Form>
  );
}
