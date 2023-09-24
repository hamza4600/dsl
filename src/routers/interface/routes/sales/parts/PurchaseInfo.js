// LOCAL COMPONENTS
import Card from 'parts/card/Card';
import Form from 'core/form/Form';

// DEPENDENCIES
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { useFormikContext } from 'formik';

// LOCAL VARIABLES
import { PURCHASE_TYPES } from '../variables';

//Render
const PurchaseInfoForm = compose(withRouter)(() => {
  const { values } = useFormikContext() || {};
  const { sale_type_id } = values || {};

  const saleTypeId = +sale_type_id === 1;
  return (
    <Form.Body>
      <Form.Checklist name="sale_type_id" type="radio" label="Purchase Type:" options={PURCHASE_TYPES} required />
      <Form.Control label="Selling Price" name="selling_price" schema="dollars" required />
      {!saleTypeId && (
        <>
          <Form.Control label="Lease Rate Reserve:" name="lease_rate_reserve" schema="dollars" required />
          <Form.Control label="Warranty Reserve:" name="lease_warranty_reserve" schema="dollars" required />
          <Form.Control label="Lease Split (F&I %):" name="lease_gross_split" schema="percent" required />
        </>
      )}
    </Form.Body>
  );
});

export default function PurchaseInfo(props) {
  return <Card title="Purchase Info" body={<PurchaseInfoForm {...props} />} />;
}
