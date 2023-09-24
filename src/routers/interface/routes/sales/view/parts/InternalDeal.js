import React from 'react';

// DEPENDENCIES
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { useFormikContext } from 'formik';

// LOCAL COMPONENTS
import Card from 'parts/card/Card';
import Form from 'core/form/Form';
import FormFieldText from '../../../../sections/parts/FormFieldText';

//Render
const RenderInternalDeal = compose(withRouter)(() => {
  const { values } = useFormikContext() || {};
  const {
    aryRebate,
    aryDealerIncentive,
    aryDealerPack,
    aryOtherItem,
    aryOweItem,
    aryTrade,
    total_cash,
    total_check,
    total_credit_card,
    total_wire,
    total_product_cancellation_funds,
    total_promissory_note,
    total_dp,
    sale_type_name
  } = values || {};

  return (
    <Form.Body plaintext>
      <Form.Control label="Purchase Type" name="sale_type_name" />
      <Form.Control label="Selling Price" name="selling_price" schema="dollars" />
      {sale_type_name == 'Lease' && (
        <>
          <Form.Control plaintext label="Lease Rate Reserve" name="lease_rate_reserve" schema="dollars" />
          <Form.Control plaintext label="Lease Warranty Reserve" name="lease_warranty_reserve" schema="dollars" />
        </>
      )}

      {Array.isArray(aryTrade) &&
        aryTrade.map((v, i) => (
          <>
            <Form.Control key={v.trade_id} label={`Trade ACV(s) ${i + 1}`} value={v.acv} plaintext schema="dollars" />
            <Form.Control
              key={v.trade_id}
              label={`Trade Allowance(s) ${i + 1}`}
              value={v.trade_in_allowance}
              plaintext
              schema="dollars"
            />
          </>
        ))}

      {Array.isArray(aryRebate) &&
        aryRebate.map((v, i) => (
          <FormFieldText
            key={v.sales_rebate_id}
            label={`Rebate Pack ${i + 1}`}
            value={v.item_Amount}
            schema="dollars"
            text={[v.item_name, v.item_code]}
          />
        ))}

      <Form.Control label="Cost" name="cost" schema="dollars" />

      {Array.isArray(aryOtherItem) &&
        aryOtherItem.map((v, i) => (
          <FormFieldText
            key={v.sales_other_id}
            label={`Other Pack ${i + 1}`}
            value={v.other_item_cost}
            schema="dollars"
            text={v.other_item}
          />
        ))}

      {Array.isArray(aryOweItem) &&
        aryOweItem.map((v, i) => (
          <FormFieldText
            key={v.owe_item_id}
            label={`We Owe Pack ${i + 1}`}
            value={v.item_price}
            schema="dollars"
            text={v.item_name}
          />
        ))}

      {Array.isArray(aryDealerIncentive) &&
        aryDealerIncentive.map((v, i) => (
          <FormFieldText
            key={v.sales_dealer_incentive_id}
            label={`Dealer Incentive ${i + 1}`}
            value={v.item_Amount}
            schema="dollars"
            text={[v.item_name, v.item_code]}
          />
        ))}

      <Form.Control label="Frontend Gross Before Pack" name="frontend_gross_before_pack" schema="dollars" />
      {sale_type_name === 'Lease' && (
        <>
          <Form.Control plaintext label="Lease Split (F&I %)" name="lease_gross_split" schema="percent" />
          <Form.Control
            plaintext
            label="Frontend Gross BP After Lease Split"
            name="frontend_gross_after_lease_split"
            schema="dollars"
          />
        </>
      )}

      {Array.isArray(aryDealerPack) &&
        aryDealerPack.map((v, i) => (
          <FormFieldText
            key={v.sales_dealer_pack_id}
            label={`FE Dealer Pack ${i + 1}`}
            value={v.item_Amount}
            schema="dollars"
            text={[v.item_name, v.item_code]}
          />
        ))}

      {total_credit_card && <Form.Control label="Total Credit Card" name="total_credit_card" schema="dollars" />}

      {total_cash && <Form.Control label="Total Cash" name="total_cash" schema="dollars" />}

      {total_check && <Form.Control label="Total Check" name="total_check" schema="dollars" />}

      {total_wire && <Form.Control label="Total Wire" name="total_wire" schema="dollars" />}

      {total_promissory_note && (
        <Form.Control label="Total Promissory Note" name="total_promissory_note" schema="dollars" />
      )}

      {total_product_cancellation_funds && (
        <Form.Control
          label="Total Product Cancellation Funds"
          name="total_product_cancellation_funds"
          schema="dollars"
        />
      )}

      {total_dp && <Form.Control label="Grand Total DP" name="total_dp" schema="dollars" />}

      <Form.Control label="Frontend Gross After Pack" name="frontend_gross_after_pack" schema="dollars" />
      <Form.Control label="AM Gross" name="am_gross" schema="dollars" />
      {sale_type_name === 'Lease' && (
        <Form.Control
          plaintext
          label="F&I Gross (Lease Split)"
          name="frontend_gross_after_lease_split"
          schema="dollars"
        />
      )}
      <Form.Control label="Total F&I Gross" name="total_fi_gross" schema="dollars" />
      <Form.Control label="Total Backend Gross(AM + F&I)" name="total_backend_gross_amfi" schema="dollars" />
      <Form.Control label="Total FE & BE Gross Before Pack" name="total_fe_be_gross_before_pack" schema="dollars" />
      <Form.Control label="Total FE & BE Gross After Pack" name="total_fe_be_gross_after_pack" schema="dollars" />
    </Form.Body>
  );
});

export default function InternalDeal(props) {
  return <Card title="Internal Deal Recap" body={<RenderInternalDeal {...props} />} />;
}
