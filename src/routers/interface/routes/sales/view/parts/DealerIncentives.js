import React from 'react';

// DEPENDENCIES
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { useFormikContext } from 'formik';

// LOCAL COMPONENTS
import Card from 'parts/card/Card';
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import FormFieldText from '../../../../sections/parts/FormFieldText';

//STYLES
import styles from './inventoryInternal.module.scss';

//Render
const RenderDealerIncentivesForm = compose(withRouter)(() => {
  const { values } = useFormikContext() || {};
  const { aryDealerIncentive } = values || {};

  return (
    <Form.Body plaintext>
      {Array.isArray(aryDealerIncentive)
        ? aryDealerIncentive.map((v, i) => (
            <FormFieldText
              key={v.sales_dealer_incentive_id}
              label={`Dealer Incentives ${i + 1}`}
              value={v.item_Amount}
              schema="dollars"
              className={styles.field}
              text={[v.item_name]}
            />
          ))
        : null}
    </Form.Body>
  );
});

export default function DealerIncentivesInfo(props) {
  return <Card title="Dealer Incentives" body={<RenderDealerIncentivesForm {...props} />} />;
}
