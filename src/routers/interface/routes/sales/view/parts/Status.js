import React, { useEffect, useState } from 'react';

// DEPENDENCIES
import moment from 'moment';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { useFormikContext } from 'formik';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// GLOBAL FUNCTIONS
import { modalFunctions } from 'functions.js';

// GLOBAL HELPERS
import { TODAY } from 'timeFormats.js';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Card from 'parts/card/Card';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// Styles
import styles from './status.module.scss';

const RenderStatusForm = compose(withRouter)(({ match }) => {
  const { recordID } = match.params;
  const { values } = useFormikContext() || {};

  const { sale_status_log } = values || {};

  const date = moment().format('MM.DD.YYYY');
  const [backoutDate, setBackoutDate] = useState(date);
  const [soldDate, setSoldDate] = useState('');
  const [soldName, setSoldName] = useState('');

  useEffect(() => {
    if (sale_status_log) {
      const sold = sale_status_log.find(status => status.status_name === 'Sold');
      const soldDate = moment(sold.sales_time, 'MM/DD/YYYY H:mm');
      const soldName = sold.created_by;
      setSoldDate(soldDate);
      setSoldName(soldName);
    }
  }, [sale_status_log]);

  useEffect(() => {
    if (sale_status_log) {
      const backout = sale_status_log.find(status => status.status_name === 'Backout');
      if (backout) {
        const date = moment(backout.sales_time, 'MM/DD/YYYY H:mm').format('MM.DD.YYYY');
        setBackoutDate(date);
      }
    }
  }, [sale_status_log]);

  const handleChange = data => {
    const date = moment(data.value, 'MM/DD/YYYY H:mm').format('MM.DD.YYYY');
    setBackoutDate(date);
  };

  const backoutDateModal = {
    type: 'form',
    title: 'Select Date',
    initialValues: {
      backout_sales_date: backoutDate
    },
    args: {
      method: 'PUT',
      endpoint: makePath(ENDPOINTS.sales.getSales, recordID),
      onSuccess: 'Backout date updated!',
      errorMessage: 'Unable to update backout date.'
    },
    submitButton: {
      label: 'Save'
    },
    fields: [
      <Form.Date
        maxDate={TODAY}
        name="backout_sales_date"
        currentDate={backoutDate}
        value={backoutDate}
        onDateValueChange={handleChange}
      />
    ]
  };

  const SalesForm = () => {
    return sale_status_log
      ? sale_status_log.map(({ created_by, date_created, status_name, sales_time }) => {
          const salesTime = moment(sales_time, 'MM/DD/YYYY H:mm');
          const createdBy = moment(date_created, 'MM/DD/YYYY H:mm');
          return (
            <>
              <Form.Body plaintext>
                {status_name === 'Backout' && (
                  <Form.Control
                    label={status_name}
                    className={styles['text--titleR']}
                    as="span"
                    value={
                      <>
                        <label
                          className={styles['text--descriptionB']}
                          onClick={() => modalFunctions.add(backoutDateModal)}
                        >
                          {backoutDate} at {salesTime.format('h:mm A')}
                        </label>
                        <label className={styles.text}>&nbsp;by {created_by}</label>
                      </>
                    }
                    plaintext
                  />
                )}
                {sales_time !== date_created && (
                  <Form.Control
                    label=" "
                    className={styles['text--descriptionL']}
                    value={`${createdBy.format('MM.DD.YYYY')} at ${createdBy.format('h:mm A')} (Timestamp)`}
                  />
                )}
                {status_name !== 'Backout' && (
                  <Form.Control
                    label={status_name}
                    value={`${salesTime.format('MM.DD.YYYY')} at ${salesTime.format('h:mm A')} by ${created_by}`}
                  />
                )}
              </Form.Body>
            </>
          );
        })
      : null;
  };

  return (
    <Form>
      <Form.Body plaintext>
        <Form.Control
          label="Date Entered"
          value={`${moment(soldDate).format('MM.DD.YYYY')} at ${moment(soldDate).format('h:mm A')} by ${soldName}`}
        />
      </Form.Body>
      <SalesForm />
    </Form>
  );
});

export default function StatusInfo(props) {
  return <Card title="Status" body={<RenderStatusForm {...props} />} />;
}
