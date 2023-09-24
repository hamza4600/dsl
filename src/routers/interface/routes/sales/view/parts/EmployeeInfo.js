// DEPENDENCIES
import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { useFormikContext } from 'formik';

// GLOBAL COMPONENTS
import CountBadge from 'parts/menu/tools/CountBadge';
import Form from 'core/form/Form';
import Card from 'parts/card/Card';

// STYLE
import styles from './employeeInfo.module.scss';

//Render
const RenderEmployeeForm = compose(withRouter)(() => {
  const { values } = useFormikContext() || {};
  const {
    number_of_time_sales_person_1_updated,
    number_of_time_sales_manager_1_updated,
    number_of_times_fm_assingment_manager_updated,
    number_of_times_am_assingment_manager_updated,
    fm_days_diff_between_sales_update,
    am_days_diff_between_sales_update
  } = values || {};

  return (
    <Form.Body plaintext>
      <Form.Control
        name="salesman1"
        label="Salesperson 1:"
        input={{
          append: (
            <>
              <label className={styles.text}>Changes:</label>
              <CountBadge className={styles.badge} count={number_of_time_sales_person_1_updated || 0} />
            </>
          )
        }}
      />
      <Form.Control
        name="salesmanager1"
        label="Sales Manager 1:"
        input={{
          append: (
            <>
              <label className={styles.text}>Changes:</label>
              <CountBadge className={styles.badge} count={number_of_time_sales_manager_1_updated || 0} />
            </>
          )
        }}
      />

      <Form.Control
        name="am_assignment_user_full_name"
        label="AM Manager:"
        input={{
          append: (
            <>
              <label className={styles.text}>Changes:</label>
              <CountBadge
                className={styles.badge}
                count={number_of_times_am_assingment_manager_updated || 0}
                color="red"
              />
              <label className={styles.text}>Days:</label>
              <CountBadge className={styles.badge} count={am_days_diff_between_sales_update || 0} color="red" />
            </>
          )
        }}
      />

      <Form.Control
        name="fm_assignment_user_full_name"
        label="F&I Manager:"
        input={{
          append: (
            <>
              <label className={styles.text}>Changes:</label>
              <CountBadge
                className={styles.badge}
                count={number_of_times_fm_assingment_manager_updated || 0}
                color="red"
              />
              <label className={styles.text}>Days:</label>
              <CountBadge className={styles.badge} count={fm_days_diff_between_sales_update || 0} color="red" />
            </>
          )
        }}
      />
    </Form.Body>
  );
});

export default function EmployeeInfo(props) {
  return <Card title="Employee Info" body={<RenderEmployeeForm {...props} />} />;
}
