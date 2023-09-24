// LOCAL COMPONENTS
import Card from 'parts/card/Card';
import Form from 'core/form/Form';

// DEPENDENCIES
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { useFormikContext } from 'formik';

//Render
const RenderDealerForm = compose(withRouter)(() => {
  const { values } = useFormikContext() || {};
  const {
    make_dealer_id,
    dealer_name
  } = values || {};
return(
  <Form.Control plaintext label='Dealer' value={"ID#" + make_dealer_id + " " + dealer_name} />
  )});

  export default function DealerInfo(props) {
    return <Card title="Dealer" body={<RenderDealerForm {...props} />} />;
  }