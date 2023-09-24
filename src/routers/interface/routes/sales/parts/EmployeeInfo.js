// DEPENDENCIES
import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { useFormikContext } from 'formik';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Card from 'parts/card/Card';
import CountBadge from 'parts/menu/tools/CountBadge';

// STYLE
import styles from '../view/parts/employeeInfo.module.scss';

const EmployeeInfoForm = compose(withRouter)(() => {
  const { values } = useFormikContext() || {};
  const {
    number_of_time_sales_person_1_updated,
    number_of_time_sales_person_2_updated,
    number_of_time_sales_manager_1_updated,
    number_of_time_sales_manager_2_updated
  } = values || {};

  return (
    <Form.Body>
      <Form.Select
        name="salesman1_site_user_id"
        label="Salesperson #1"
        lookup="salesStaff"
        lookupParams={{
          char_key: 'SLSSTF'
        }}
        optionKeys={{
          label: 'name',
          value: 'site_user_id'
        }}
        useBlank
        dropdown={{
          maxHeight: '30rem'
        }}
        required
        input={{
          append: (
            <>
              <label className="mx-4">Changes:</label>
              <CountBadge className={styles.badge} count={number_of_time_sales_person_1_updated} />
            </>
          )
        }}
      />
      <Form.Select
        name="salesman2_site_user_id"
        label="Salesperson #2"
        lookup="salesStaff"
        lookupParams={{
          char_key: 'SLSSTF'
        }}
        optionKeys={{
          label: 'name',
          value: 'site_user_id'
        }}
        useBlank
        dropdown={{
          maxHeight: '30rem'
        }}
        input={{
          append: (
            <>
              <label className="mx-4">Changes:</label>
              <CountBadge className={styles.badge} count={number_of_time_sales_person_2_updated} />
            </>
          )
        }}
      />
      <Form.Select
        name="salesmanager1_site_user_id"
        label="Sales Manager #1"
        lookup="salesManagers"
        lookupParams={{
          char_key: 'SLSMGR'
        }}
        optionKeys={{
          label: 'name',
          value: 'site_user_id'
        }}
        useBlank
        dropdown={{
          maxHeight: '30rem'
        }}
        required
        input={{
          append: (
            <>
              <label className="mx-4">Changes:</label>
              <CountBadge className={styles.badge} count={number_of_time_sales_manager_1_updated} />
            </>
          )
        }}
      />
      <Form.Select
        name="salesmanager2_site_user_id"
        label="Sales Manager #2"
        lookup="salesManagers"
        lookupParams={{
          char_key: 'SLSMGR'
        }}
        optionKeys={{
          label: 'name',
          value: 'site_user_id'
        }}
        useBlank
        dropdown={{
          maxHeight: '30rem'
        }}
        input={{
          append: (
            <>
              <label className="mx-4">Changes:</label>
              <CountBadge className={styles.badge} count={number_of_time_sales_manager_2_updated} />
            </>
          )
        }}
      />
    </Form.Body>
  );
});

// EXPORT
export default function EmployeeInfo(props) {
  return <Card title="Employee Info" body={<EmployeeInfoForm {...props} />} />;
}
