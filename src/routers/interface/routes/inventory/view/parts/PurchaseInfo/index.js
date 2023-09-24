import React, {useEffect, useState} from 'react';

// DEPENDENCIES
import { useFormikContext } from 'formik';
import moment from 'moment';

// GLOBAL VARIABLES
import { INVENTORY_STATUS } from 'codes';

// GLOBAL COMPONENTS
import Card from 'parts/card/Card';
import Form from 'core/form/Form';

// MAIN COMPONENT
const PurchaseInfoBody = () => {
  const {values} = useFormikContext() || {};
  const {
    age_of_vehicle,
    inventory_source_method_name,
    purchase_date,
    inventory_status_name
  } = values;

  const [inventoryCode, setInventoryCode] = useState('S');

  useEffect(() => {
    const inventory = Object.keys(INVENTORY_STATUS)
      .map(e => INVENTORY_STATUS[e])
      .find(({ label }) => label === inventory_status_name);

    setInventoryCode(inventory ? inventory.code : 'S');
  }, [values])

  //RENDER
  return <Form.Body plaintext>
    <Form.Control name="date_created"
                  label="Date Added"
    />
    <Form.Control name="created_by"
                  label="Added By"
    />
    <Form.Control name="purchase_date"
                  label="Purchase Date"
                  text="* Must be the date on the Seller's Bill of Sale"
    />
    <Form.Control name="acquired_salesperson_name"
                  label="Acquired By"
                  hidden={['S', 'PS', 'I'].includes(inventoryCode)}
    />
    <Form.Control name="appraised_by"
                  label="Appraised By"
                  hidden={['S', 'PS', 'O', 'I', 'F', 'B'].includes(inventoryCode)}
    />
    <Form.Control label="Age"
                  value={`${age_of_vehicle || 0} days`}
    />
    <Form.Control label="Source Method"
                  value={`${inventory_source_method_name} : ${moment(purchase_date).format('MM/DD/YYYY')} at ${moment(purchase_date).format('hh:mm A')}`}
    />
    <Form.Control name="inventory_source"
                  label="Source"
    />
    <Form.Control name="source_name"
                  label="Source Name"
    />
  </Form.Body>
};

// EXPORT
export default function PurchaseInfo(props) {
  return <Card title="Purchase Info" body={<PurchaseInfoBody {...props} />} />;
};