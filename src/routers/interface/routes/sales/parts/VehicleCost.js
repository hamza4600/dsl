import React, { useState } from 'react';

// DEPENDENCIES
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { useFormikContext } from 'formik';
import isUndefined from 'lodash/isUndefined';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Card from 'parts/card/Card';
import Button from 'core/tools/Button';

// GLOBAL VARIABLES
import { NEW_USED } from 'codes';

// LOCAL COMPONENTS
import TableArray from './TableArray';
import { OWE_ITEM_COLUMNS, BANK_FEE_COLUMNS, OTHER_ITEM_COLUMNS } from '../variables';

//Render
const VehicleCostForm = compose(withRouter)(() => {
  const { values } = useFormikContext() || {};
  const { new_used, aryOweItem, aryBankFee, aryOtherItem } = values || {};
  const isNew = new_used === NEW_USED.new.numeric;
  const type = !isUndefined(new_used) ? (isNew ? 'Factory Invoice' : 'ACV') : '';
  const [isUpdate, setIsUpdate] = useState(false);

  const addOweItem = () => {
    let item = {
      item_price: '',
      item_name: '',
      item_add_as_task: false
    };
    setIsUpdate(!isUpdate);
    aryOweItem.push(item);
  };

  const addOtherItem = () => {
    let item = {
      other_item: '',
      other_item_cost: '',
      item_add_as_task: false
    };
    setIsUpdate(!isUpdate);
    aryOtherItem.push(item);
  };

  const bankFeeItem = () => {
    let item = {
      item_Amount: '',
      item_name: '',
      item_add_as_task: false
    };
    setIsUpdate(!isUpdate);
    aryBankFee.push(item);
  };

  const removeOweItem = index => {
    if (index !== -1) {
      aryOweItem.splice(index, 1);
      setIsUpdate(!isUpdate);
    }
  };

  const removeOtherItem = index => {
    if (index !== -1) {
      aryOtherItem.splice(index, 1);
      setIsUpdate(!isUpdate);
    }
  };

  const removeBankItem = index => {
    if (index !== -1) {
      aryBankFee.splice(index, 1);
      setIsUpdate(!isUpdate);
    }
  };

  const handleOwe = (e, index) => {
    const { value, checked } = e.target;
    const { id } = e.currentTarget;

    if (id === 'item_price') {
      aryOweItem[index].item_price = value;
    } else if (id === 'item_name') {
      aryOweItem[index].item_name = value;
    } else if (id === 'item_add_as_task') {
      aryOweItem[index].item_add_as_task = checked;
    }
    setIsUpdate(!isUpdate);
  };

  const handleOther = (e, index) => {
    const { value, checked } = e.target;
    const { id } = e.currentTarget;

    if (id === 'other_item_cost') {
      aryOtherItem[index].other_item_cost = value;
    } else if (id === 'other_item') {
      aryOtherItem[index].other_item = value;
    } else if (id === 'item_add_as_task') {
      aryOtherItem[index].item_add_as_task = checked;
    }
    setIsUpdate(!isUpdate);
  };

  const handleBank = (e, index) => {
    const { value, checked } = e.target;
    const { id } = e.currentTarget;

    if (id === 'item_Amount') {
      aryBankFee[index].item_Amount = value;
    } else if (id === 'item_name') {
      aryBankFee[index].item_name = value;
    } else if (id === 'item_add_as_task') {
      aryBankFee[index].item_add_as_task = checked;
    }
    setIsUpdate(!isUpdate);
  };

  return (
    <Form.Body>
      <Form.Control label={`${type} Cost`} name="invoice_cost" schema="dollars" plaintext />
      <Form.Control
        label={`${type} with Inventory Pack Total`}
        name="invoice_cost_with_inventory_pack"
        schema="dollars"
        plaintext
      />
      <Form.Control label="DMS Cost" name="dms_invoice_price" schema="dollars" plaintext />
      <Form.Control label="Cost" name="cost" schema="dollars" required />

      {
        <div className="w-100">
          <hr />
          <Form.Label className="m-0 p-1 text-dark">We Owe</Form.Label>
          <Button.Add className="m-3" size="sm" fullWidth={false} onClick={addOweItem} />
          <TableArray
            keys={[{ key: 'item_price', size: 3 }, { key: 'item_name', size: 10 }, { key: 'item_add_as_task' }]}
            columns={OWE_ITEM_COLUMNS}
            array={Array.isArray(aryOweItem) ? aryOweItem : []}
            onRemoveClick={index => removeOweItem(index)}
            onHandleChange={(e, index) => handleOwe(e, index)}
          />
        </div>
      }

      {
        <div className="w-100">
          <hr />
          <Form.Label className="m-0 p-1 text-dark">Other Items</Form.Label>
          <Button.Add className="m-3" size="sm" fullWidth={false} onClick={addOtherItem} />
          <TableArray
            keys={[{ key: 'other_item_cost', size: 3 }, { key: 'other_item', size: 10 }, { key: 'item_add_as_task' }]}
            columns={OTHER_ITEM_COLUMNS}
            array={Array.isArray(aryOtherItem) ? aryOtherItem : []}
            onRemoveClick={index => removeOtherItem(index)}
            onHandleChange={(e, index) => handleOther(e, index)}
          />
        </div>
      }

      {
        <div className="w-100">
          <hr />
          <Form.Label className="m-0 p-1 text-dark">Bank Fee</Form.Label>
          <Button.Add className="m-3" size="sm" fullWidth={false} onClick={bankFeeItem} />
          <TableArray
            keys={[{ key: 'item_Amount', size: 3 }, { key: 'item_name', size: 10 }, { key: 'item_add_as_task' }]}
            columns={BANK_FEE_COLUMNS}
            array={Array.isArray(aryBankFee) ? aryBankFee : []}
            onRemoveClick={index => removeBankItem(index)}
            onHandleChange={(e, index) => handleBank(e, index)}
          />
        </div>
      }
    </Form.Body>
  );
});

export default function VehicleCost(props) {
  return <Card title="Vehicle Cost" body={<VehicleCostForm {...props} />} />;
}
