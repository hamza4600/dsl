import React, { useState } from 'react';

// DEPENDENCIES
import { compose } from 'redux';
import { useParams, withRouter } from 'react-router-dom';
import { useFormikContext } from 'formik';

// LOCAL COMPONENTS
import Card from 'parts/card/Card';
import Form from 'core/form/Form';
import Button from 'core/tools/Button';
import TableArray from './TableArray';
import { DEALER_PACK_COLUMNS } from '../variables';

//Render
const RenderDealerPackForm = compose(withRouter)(() => {
  const { values } = useFormikContext() || {};
  const { aryDealerPack } = values || {};
  const [isUpdate, setIsUpdate] = useState(false);

  const addItem = () => {
    let item = {
      item_Amount: '',
      item_name: '',
      item_add_as_task: false,
      is_admin_pack: false
    };
    setIsUpdate(!isUpdate);
    aryDealerPack.push(item);
  };

  const removeItem = index => {
    if (index !== -1) {
      aryDealerPack.splice(index, 1);
      setIsUpdate(!isUpdate);
    }
  };

  const handleItem = (e, index) => {
    const { value, checked } = e.target;
    const { id } = e.currentTarget;

    if (id === 'item_Amount') {
      aryDealerPack[index].item_Amount = value;
    } else if (id === 'item_name') {
      aryDealerPack[index].item_name = value;
    } else if (id === 'item_add_as_task') {
      aryDealerPack[index].item_add_as_task = checked;
    }
    setIsUpdate(!isUpdate);
  };

  return (
    <Form.Body>
      <div className="w-100">
        <Button.Add className="m-3" size="sm" label="Add Dealer Pack" fullWidth={false} onClick={addItem} />
        <TableArray
          keys={[{ key: 'item_Amount', size: 3 }, { key: 'item_name', size: 10 }, { key: 'item_add_as_task' }]}
          columns={DEALER_PACK_COLUMNS}
          array={Array.isArray(aryDealerPack) ? aryDealerPack : []}
          onRemoveClick={index => removeItem(index)}
          onHandleChange={(e, index) => handleItem(e, index)}
        />
      </div>
    </Form.Body>
  );
});

export default function DealerPackInfo(props) {
  return <Card title="Dealer Pack" body={<RenderDealerPackForm {...props} />} />;
}
