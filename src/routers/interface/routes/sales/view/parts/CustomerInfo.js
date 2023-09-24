// DEPENDENCIES
import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { useFormikContext } from 'formik';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Card from 'parts/card/Card';

const CustomerInfoForm = compose(withRouter)(() => {
  const { values } = useFormikContext() || {};
  const {
    customer_type_id,
    customer_first_name,
    customer_last_name,
    customer2_first_name,
    customer2_last_name,
    customer_is_employee
  } = values || {};

  const customerTypeId = +customer_type_id === 1;
  const customerIsEmployee = customer_is_employee === 'true' ? 'Yes' : 'No';

  return (
    <Form.Body plaintext>
      <Form.Control label="Customer Type" name="customer_type" />
      {customerTypeId ? (
        <Form.Control label="Customer 1" value={`${customer_first_name} ${customer_last_name}`} />
      ) : (
        <Form.Control name="organization" label="Organization" />
      )}
      <Form.Control label="Mobile Phone #" name="customer_mobile_phone_number" schema="tel" />
      <Form.Control label="Email Address" name="customer_email_address" />
      <Form.Control label="Customer 2" value={`${customer2_first_name} ${customer2_last_name}`} />
      <Form.Control label="Is this Customer/Buyer an Emplyee?" value={customerIsEmployee} />
      {customer_is_employee === 'true' && (
        <>
          <Form.Control plaintext name="employee_employer_name" label="Where Does the Employee Work?" />
          <Form.Control plaintext name="employee_work_id" label="Employee's Work ID#" />
        </>
      )}
    </Form.Body>
  );
});
// EXPORT
export default function CustomerInfo(props) {
  return <Card title="Customer Info" body={<CustomerInfoForm {...props} />} />;
}
