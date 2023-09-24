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
const RenderDealerPackForm = compose(withRouter)(() => {
  const { values } = useFormikContext() || {};
  const { aryDealerPack } = values || {};

  return (
    <Form.Body plaintext>
      {Array.isArray(aryDealerPack)
        ? aryDealerPack.map((v, i) => (
            <FormFieldText
              key={v.sales_dealer_pack_id}
              label={`Dealer Pack ${i + 1}`}
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

export default function DealerPackInfo(props) {
  return <Card title="Dealer Pack" body={<RenderDealerPackForm {...props} />} />;
}
