import React, { useMemo } from 'react';

// DEPENDENCIES
import isUndefined from 'lodash/isUndefined';
import sumBy from 'lodash/sumBy';
import moment from 'moment';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { useFormikContext } from 'formik';

// GLOBAL VARIABLES
import { NEW_USED } from 'codes';
import { FORMAT_PRICE } from 'helpers/format';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Sprite from 'core/tools/Sprite';
import Tooltip from 'core/tools/Tooltip';
import Card from 'parts/card/Card';

// LOCAL COMPONENTS
import FormFieldText from '../../../sections/parts/FormFieldText';

//STYLES
import styles from './inventoryInternal.module.scss';

const InventoryInternalForm = compose(withRouter)(() => {
  const { values } = useFormikContext() || {};
  const {
    new_used,
    invoice_cost,
    dms_invoice_price,
    aryInventoryDealerPack,
    date_dms_sync,
    dmsinvoice,
  } = values || {};

  const isNew = new_used === NEW_USED.new.numeric;
  const type = !isUndefined(new_used) ? (isNew ? 'Factory Invoice' : 'ACV') : '';

  const DmsTooltip = () => {
    return (
      <Tooltip className={styles.tooltip} tip="DMS Sync Occurs every 3 hours.">
        <Sprite className={styles.info} use="info" fill="primary-extra-light" />
      </Tooltip>
    );
  };

  return (
    <Form.Body plaintext>
      <FormFieldText
        label={`${type} Cost`}
        name="invoice_cost"
        value={invoice_cost}
        schema="dollars"
        className={styles.field}
        text={[null, 'Account to Credit']}
      />

      {Array.isArray(aryInventoryDealerPack)
        ? aryInventoryDealerPack.map((v, i) => (
            <FormFieldText
              key={v.inventory_dealer_pack_id}
              label={`Inventory Pack ${i + 1}`}
              value={v.item_amount}
              schema="dollars"
              className={styles.field}
              text={[v.item_name, v.item_account_to_credit]}
            />
          ))
        : null}

      <Form.Control label="Inventory Pack Total:" name="inventory_pack_total" schema="dollars" />
      <Form.Control
        label={`${type} with Inventory Pack Total`}
        name="invoice_cost_with_inventory_pack"
        schema="dollars"
      />
      <Form.Control
        fullWidth
        label="DMS Cost:"
        suffix={<DmsTooltip />}
        value={`${dms_invoice_price ? FORMAT_PRICE(dms_invoice_price) : 'Not available'} as of ${moment(
          date_dms_sync
        ).format('MM/DD/YYYY')} at ${moment(date_dms_sync).format('h:mm A')}: ${dmsinvoice}`}
      />
      <Form.Control
        label={`${type} with Inventory Pack Total vs. DMS Cost Difference`}
        name="invoice_cost_with_inventory_pack_dms_invoice_difference"
        schema="dollars"
      />
    </Form.Body>
  );
});

// EXPORT
export default function InventoryInternalInfo(props) {
  return <Card title="Inventory - Internal" body={<InventoryInternalForm {...props} />} />;
}
