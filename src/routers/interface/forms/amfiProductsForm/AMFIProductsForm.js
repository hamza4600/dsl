import React, { useEffect, useMemo } from 'react';

// DEPENDENCIES
import sortBy from 'lodash/sortBy';
import partition from 'lodash/partition';
import sumBy from 'lodash/sumBy';
import { useFormikContext } from 'formik';

// HELPERS
// import useRecordView from 'helpers/getRecordView';

// FUNCTIONS
import { dollarsToNumber } from 'functions.js';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import FormRow from '../parts/FormRow';
import PlainText from '../parts/PlainText';

// MAIN COMPONENT
const AMFIProductsForm = () => {
  // const { isAdd, isView } = useRecordView();

  const { initialValues, values, setFieldValue } = useFormikContext() || {};

  const { aryDealerAMFinance: initialData } = initialValues || {};

  // Order so we can partition and use in two separate form areas
  useEffect(() => {
    const cleansed = (initialData || []).map(d => ({ ...d, is_checked: d.is_checked === 1 ? true : false }));
    const sorted = sortBy(cleansed, 'product_type');
    setFieldValue('aryDealerAMFinance', sorted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  const { aryDealerAMFinance } = values || {};

  const [amProducts = [], fiProducts = []] = useMemo(
    () => partition(aryDealerAMFinance || [], { product_type: 0 }),
    [aryDealerAMFinance]
  );

  const amProductsTotalGross = useMemo(() => {
    return sumBy(amProducts || [], p => +p?.item_gross);
  }, [amProducts]);

  const fiProductsTotalGross = useMemo(() => {
    return sumBy(fiProducts || [], p => +p?.item_selling_price);
  }, [fiProducts]);

  const totalBackendGross = useMemo(() => {
    return amProductsTotalGross + fiProductsTotalGross;
  }, [amProductsTotalGross, fiProductsTotalGross]);

  return (
    <>
      <FormRow
        className="d-none d-lg-flex"
        col1="Product Name"
        col2="Code"
        col4="Selling Price"
        col5="Cost"
        col6="Gross"
      />

      {/* AM Products */}
      {amProducts.length
        ? amProducts.map(({ item_name, item_code, item_selling_price, item_cost, lock_cost, item_gross }, i) => {
            const isCostLocked = +lock_cost === 1;
            const isDisabled = !aryDealerAMFinance?.[i]?.is_checked;
            const itemSellingPrice = aryDealerAMFinance?.[i]?.item_selling_price || 0;
            const productCost = aryDealerAMFinance?.[i]?.item_cost || 0;
            return (
              <FormRow
                key={i}
                label={item_name}
                col2={item_code}
                col3={
                  <Form.Checkbox
                    name={`aryDealerAMFinance[${i}].is_checked`}
                    checked={aryDealerAMFinance?.[i]?.is_checked}
                    containerClassName="align-items-start mt-3"
                    onChange={({ target: { checked } }) => {
                      setFieldValue(`aryDealerAMFinance[${i}].is_checked`, checked);
                      if (checked)
                        setFieldValue(`aryDealerAMFinance[${i}].item_gross`, +itemSellingPrice - +productCost);
                      else setFieldValue(`aryDealerAMFinance[${i}].item_gross`, 0);
                    }}
                  />
                }
                col4={
                  <Form.Control
                    name={`aryDealerAMFinance[${i}].item_selling_price`}
                    schema="dollars"
                    defaultValue={item_selling_price}
                    onChange={({ target: { value } }) => {
                      setFieldValue(`aryDealerAMFinance[${i}].item_gross`, dollarsToNumber(value) - +productCost);
                    }}
                    disabled={isDisabled}
                    required={!isDisabled}
                  />
                }
                col5={
                  <Form.Control
                    name={`aryDealerAMFinance[${i}].item_cost`}
                    schema="dollars"
                    defaultValue={item_cost}
                    onChange={({ target: { value } }) => {
                      setFieldValue(`aryDealerAMFinance[${i}].item_gross`, +itemSellingPrice - dollarsToNumber(value));
                    }}
                    disabled={isDisabled}
                    readOnly={isCostLocked}
                    append={{
                      use: isCostLocked && 'lock-solid'
                    }}
                    required={!isCostLocked && !isDisabled}
                  />
                }
                col6={
                  <PlainText name={`aryDealerAMFinance[${i}].item_gross`} schema="dollars" defaultValue={item_gross} />
                }
              />
            );
          })
        : null}
      <FormRow label="Total AM Gross" col4={<PlainText schema="dollars" value={amProductsTotalGross} />} />
      <FormRow label="Time AM Gross Entered" col4={<PlainText name="am_gross_time" />} />

      {/* F&I Products */}
      {fiProducts.length
        ? fiProducts.map(({ item_name, item_selling_price }, fiProductsIndex) => {
            const i = fiProductsIndex + amProducts.length;
            const isDisabled = !aryDealerAMFinance?.[i]?.is_checked;
            return (
              <FormRow
                key={i}
                label={item_name}
                col3={
                  <Form.Checkbox
                    name={`aryDealerAMFinance[${i}].is_checked`}
                    checked={aryDealerAMFinance?.[i]?.is_checked}
                    containerClassName="align-items-start mt-3"
                    onChange={({ target: { checked } }) =>
                      setFieldValue(`aryDealerAMFinance[${i}].is_checked`, checked)
                    }
                  />
                }
                col4={
                  <Form.Control
                    name={`aryDealerAMFinance[${i}].item_selling_price`}
                    schema="dollars"
                    defaultValue={item_selling_price}
                    disabled={isDisabled}
                    required={!isDisabled}
                  />
                }
              />
            );
          })
        : null}
      <FormRow label="Total F&amp;I Gross" col4={<PlainText schema="dollars" value={fiProductsTotalGross} />} />
      <FormRow label="Time F&amp;I Gross Entered" col4={<PlainText name="fm_gross_time" />} />

      {/* Total Backend Gross */}
      <FormRow label="Total Backend Gross" col4={<PlainText schema="dollars" value={totalBackendGross} />} />
      <FormRow col4={<Button.Submit variant="success" label="Save" className="w-auto" />} className="mb-4" />
    </>
  );
};

// EXPORT
export default AMFIProductsForm;
