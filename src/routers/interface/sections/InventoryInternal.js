import React, { useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import isUndefined from 'lodash/isUndefined';
import sumBy from 'lodash/sumBy';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { useFormikContext } from 'formik';

// GLOBAL VARIABLES
import { NEW_USED } from 'codes';

// GLOBAL HELPERS/FUNCTIONS
import { FORMAT_PRICE } from 'helpers/format';
import useRecordView from 'helpers/getRecordView';

// GLOBAL COMPONENTS
import Card from 'parts/card/Card';
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import FormFieldText from './parts/FormFieldText';
import RepairInvoice from './parts/RepairInvoice';

// STYLE
import styles from './inventoryInternal.module.scss';

// MAIN COMPONENT
const InventoryInternalForm = compose(withRouter)(() => {
  const { isAdd, isView } = useRecordView();
  const { values } = useFormikContext() || {};

  const {
    aryInventoryDealerPack = [],
    aryRepairInvoice = [],
    invoice_cost,
    invoice_cost_with_inventory_pack,
    invoice_cost_with_repair_invoice,
    date_created,
    dmsinvoice,
    dms_invoice_price,
    new_used
  } = values || {};

  const isNew = new_used === NEW_USED.new.numeric;

  const updateOnValue = dmsinvoice ? dmsinvoice.split(' : ')[1] : '';

  const type = !isUndefined(new_used) ? (isNew ? 'Factory Invoice' : 'ACV') : '';

  const inventoryPackTotal = useMemo(() => {
    return sumBy(aryInventoryDealerPack, 'item_amount');
  }, [aryInventoryDealerPack]);

  const invoiceCostWithInventoryPack = useMemo(() => {
    return +inventoryPackTotal + +(invoice_cost || 0);
  }, [inventoryPackTotal, invoice_cost]);

  const repairInvoiceTotal = useMemo(() => {
    return sumBy(aryRepairInvoice, 'invoice_amount');
  }, [aryRepairInvoice]);

  const invoiceCostWithRepairInvoice = useMemo(() => {
    return +repairInvoiceTotal + invoiceCostWithInventoryPack;
  }, [repairInvoiceTotal, invoiceCostWithInventoryPack]);

  return (
    <Form.Body plaintext>
      <FormFieldText
        label={`${type} Cost`}
        labelClassName={clsx(isView && styles.bold)}
        value={invoice_cost}
        schema="dollars"
        text={
        !isAdd
          ? [ null,
            isView
              ? { label:'Account to Credit', className: styles.bold }
              : 'Account to Credit' ]
          : undefined }
      />
      {!isAdd
        ? aryInventoryDealerPack.map((v, i) => (
            <FormFieldText
              key={v.inventory_dealer_pack_id}
              label={`Inventory Pack ${i + 1}`}
              value={v.item_amount}
              schema="dollars"
              text={[v.item_name, v.item_account_to_credit]}
            />
          ))
        : null}
      {inventoryPackTotal || invoice_cost ? (
        <FormFieldText
          label="Inventory Pack Total"
          labelClassName={clsx(isView && styles.bold)}
          value={inventoryPackTotal}
          schema="dollars"
        />
      ) : null}
      <FormFieldText
        label={`${type} with Inventory Pack Total`}
        labelClassName={clsx(isView && styles.bold)}
        value={invoiceCostWithInventoryPack || invoice_cost_with_inventory_pack || invoice_cost}
        schema="dollars"
      />
      {!isAdd ? <RepairInvoice /> : null}
      {!isAdd ? (
        <FormFieldText
          label={`${type} with Repair Invoices`}
          labelClassName={clsx(isView && styles.bold)}
          value={invoiceCostWithRepairInvoice || invoice_cost_with_repair_invoice || 0}
          schema="dollars"
        />
      ) : null}

      {isView && <Form.Control label="DMS Cost"
                               value={dms_invoice_price ? `${FORMAT_PRICE(dms_invoice_price || 0)} as of ${date_created} : ${updateOnValue}` : dmsinvoice}/>}
    </Form.Body>
  );
});

// EXPORT
export default function InventoryInternal(props) {
  return <Card title="Inventory Internal" body={<InventoryInternalForm {...props} />} />;
}
