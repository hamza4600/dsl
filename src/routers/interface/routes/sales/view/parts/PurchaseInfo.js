// LOCAL COMPONENTS
import Card from 'parts/card/Card';
import Form from 'core/form/Form';

// DEPENDENCIES
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { useFormikContext } from 'formik';

//Render
const RenderPurchaseInfoForm = compose(withRouter)(() => {
  const { values } = useFormikContext() || {};
  const { sale_type_name } = values || {};
  return (
    <Form.Body plaintext>
      <Form.Control label="Purchase Type:" name="sale_type_name" />
      <Form.Control label="Selling Price" name="selling_price" schema="dollars" />
      {sale_type_name === 'Lease' && (
        <>
          <Form.Control plaintext label="Lease Rate Reserve:" name="lease_rate_reserve" schema="dollars" />
          <Form.Control plaintext label="Warranty Reserve:" name="lease_warranty_reserve" schema="dollars" />
          <Form.Control plaintext label="Lease Split (F&I %):" name="lease_gross_split" schema="percent" />
        </>
      )}
    </Form.Body>
  );
});

export default function PurchaseInfo(props) {
  return <Card title="Purchase Info" body={<RenderPurchaseInfoForm {...props} />} />;
}
