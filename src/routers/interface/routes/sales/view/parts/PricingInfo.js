import React from 'react';

// DEPENDENCIES
import isUndefined from 'lodash/isUndefined';
import moment from 'moment';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { useFormikContext } from 'formik';

// GLOBAL VARIABLES
import { NEW_USED } from 'codes';
import { FORMAT_PRICE } from 'helpers/format';

// LOCAL COMPONENTS
import Card from 'parts/card/Card';
import Sprite from 'core/tools/Sprite';
import Tooltip from 'core/tools/Tooltip';
import Form from 'core/form/Form';

//STYLES
import styles from './inventoryInternal.module.scss';

//Render
const RenderPricingInfoForm = compose(withRouter)(() => {
  const { values } = useFormikContext() || {};
  const { new_used, dms_invoice_price, date_dms_sync } = values || {};

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
      <Form.Control label="Retail:" name="retail_price" schema="dollars" />
      {isNew ? (
        <Form.Control label={'MSRP Sticker:'} name="documentAttachment.msrp" />
      ) : (
        <Form.Control label="Purchase Invoice:" name="documentAttachment.purchase_invoice" />
      )}
      <Form.Control label="Internet:" name="internet_price" schema="dollars" />
      <Form.Control label={`${type} Cost:`} name="invoice_cost" schema="dollars" />

      {isNew ? <Form.Control label="Factory Invocie:" name="documentAttachment.factory_invoice" /> : null}

      <Form.Control
        label={`${type} with Inventory Pack Total:`}
        name="invoice_cost_with_inventory_pack"
        schema="dollars"
      />

      <Form.Control label={`${type} with Repair Invoices:`} name="invoice_cost_with_repair_invoice" schema="dollars" />

      <Form.Control
        label="DMS Cost:"
        prefix={<DmsTooltip />}
        fullWidth
        value={`${dms_invoice_price ? FORMAT_PRICE(dms_invoice_price) : 'Not available'} as of ${moment(
          date_dms_sync
        ).format('MM/DD/YYYY')} at ${moment(date_dms_sync).format('h:mm A')}`}
      />

      <Form.Control
        label="Last DMS Sync:"
        prefix={<DmsTooltip />}
        fullWidth
        value={`${moment(date_dms_sync).format('MM/DD/YYYY')} ${moment(date_dms_sync).format('h:mm A')}`}
      />
    </Form.Body>
  );
});

export default function PricingInfoForm(props) {
  return <Card title="Pricing Info" body={<RenderPricingInfoForm {...props} />} />;
}
