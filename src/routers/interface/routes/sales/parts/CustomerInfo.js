// DEPENDENCIES
import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { useFormikContext } from 'formik';

// LOCAL VARIABLES
import { CUSTOMER_TYPES, CUSTOMER_IS_EMPLOYEE } from '../variables';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Card from 'parts/card/Card';

const CustomerInfoForm = compose(withRouter)(() => {
  const { values } = useFormikContext() || {};
  const { customer_type_id, customer_is_employee } = values || {};

  const customerTypeId = +customer_type_id === 1;
  const customerIsEmployee = customer_is_employee === 'true';

  return (
    <Form.Body>
      <Form.Checklist name="customer_type_id" type="radio" label="Customer Type" options={CUSTOMER_TYPES} required />
      {customerTypeId ? (
        <>
          <Form.Control name="customer_first_name" label="First Name" required />
          <Form.Control name="customer_last_name" label="Last Name" required />
        </>
      ) : (
        <Form.Control name="organization" label="Organization" required />
      )}

      <Form.Control name="customer_email_address" label="Email Address" type="email" />
      <Form.Control name="customer_mobile_phone_number" label="Mobile Phone #" schema="tel" />
      <Form.Control name="customer2_first_name" label="Customer 2 First Name" />
      <Form.Control name="customer2_last_name" label="Customer 2 Last Name" />
      <Form.Control name="customer2_email_address" label="Customer 2 Email Address" type="email" />
      <Form.Checklist
        name="customer_is_employee"
        type="radio"
        label="Is this Customer/Buyer an Employee"
        options={CUSTOMER_IS_EMPLOYEE}
      />
      {customerIsEmployee ? (
        <>
          <Form.Control name="employee_employer_name" label="Where Does the Employee Work?" required />
          <Form.Control name="employee_work_id" label="Employee's Work ID#" required />
        </>
      ) : null}
    </Form.Body>
  );
});

// EXPORT
export default function CustomerInfo(props) {
  return <Card title="Customer Info" body={<CustomerInfoForm {...props} />} />;
}
