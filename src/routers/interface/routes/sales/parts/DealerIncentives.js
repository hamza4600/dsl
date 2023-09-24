import React, { useState } from 'react';

// DEPENDENCIES
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { useFormikContext } from 'formik';

// LOCAL COMPONENTS
import Card from 'parts/card/Card';
import Form from 'core/form/Form';
import Button from 'core/tools/Button';
import TableArray from './TableArray';
import { TRUE_FALSE, DEALER_INCENTIVE_COLUMNS } from '../variables';


//Render
const RenderDealerIncentivesForm = compose(withRouter)(() => {
  const { values } = useFormikContext() || {};
  const { aryDealerIncentive, has_dealer_incentive } = values || {};
  const hasDealerIncentive = has_dealer_incentive === 'true';
  const [isUpdate, setIsUpdate] = useState(false);

  const addItem = () => {
    let item = {
      item_Amount: '',
      item_name: '',
      item_add_as_task: false,
      is_admin_incentive: false,
    };
    setIsUpdate(!isUpdate);
    aryDealerIncentive.push(item);
  };

  const removeItem = index => {
    if (index !== -1) {
      aryDealerIncentive.splice(index, 1);
      setIsUpdate(!isUpdate);
    }
  };

  const handleItem = (e, index) => {
    const { value, checked } = e.target;
    const { id } = e.currentTarget;

    if (id === 'item_Amount') {
      aryDealerIncentive[index].item_Amount = value;
    } else if (id === 'item_name') {
      aryDealerIncentive[index].item_name = value;
    } else if (id === 'item_add_as_task') {
      aryDealerIncentive[index].item_add_as_task = checked;
    }
    setIsUpdate(!isUpdate);
  };

  return (
    <Form.Body>
      <Form.Checklist
        label="Incentive to add?"
        name="has_dealer_incentive"
        type="radio"
        options={TRUE_FALSE}
        required
      />
      {hasDealerIncentive ? (
        <div className="w-100">
          <Button.Add className="m-3" size="sm" label="Add Dealer Incentive" fullWidth={false} onClick={addItem} />
          <TableArray
            keys={[{ key: 'item_Amount', size: 3 }, { key: 'item_name', size: 10 }, { key: 'item_add_as_task' }]}
            columns={DEALER_INCENTIVE_COLUMNS}
            array={Array.isArray(aryDealerIncentive) ? aryDealerIncentive : []}
            onRemoveClick={index => removeItem(index)}
            onHandleChange={(e, index) => handleItem(e, index)}
          />
        </div>
      ) : null}
    </Form.Body>
  );
});

export default function DealerIncentivesInfo(props) {
  return <Card title="Dealer Incentives" body={<RenderDealerIncentivesForm {...props} />} />;
}
