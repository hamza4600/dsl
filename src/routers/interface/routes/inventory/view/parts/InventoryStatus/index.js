import React from 'react';

// DEPENDENCIES
import moment from 'moment';
import { useFormikContext } from 'formik';

// GLOBAL COMPONENTS
import Card from 'parts/card/Card';
import Form from 'core/form/Form';

// MAIN COMPONENT
const InventoryStatusBody = () => {
  const {values} = useFormikContext() || {};

  const renderedStatusLog = values.dummy?.aryStatusLog?.map(
    ({created_by, inventory_status_time, status_name}, index) => {
      const createdTime = moment(inventory_status_time);

      return <Form.Control key={`${inventory_status_time}-${index}`}
                           label={status_name}
                           value={`${createdTime.format('MM/DD/YYYY')} at ${createdTime.format('h:mm A')} by ${created_by}`}
      />;
    }
  )

  // RENDER
  return (<Form.Body plaintext>
    {renderedStatusLog}
    <Form.Control name="inventory_status_name" label="Current Status" />
  </Form.Body>)
};

// EXPORT
export default function InventoryStatus(props) {
  return <Card title='Status' body={<InventoryStatusBody {...props} />} />;
};
