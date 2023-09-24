import clsx from 'clsx';
import { ENDPOINTS } from 'endpoints';
import { apiFetch } from 'functions';
import React from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import SAStatusCell from '../../../tools/SAStatusCell';
import styles from './priceAfterAdjustment.module.scss';

const PriceAfterAdjustment = ({
  record,
  priceAdjusted,
  setIcon,
  mobileView,
  icon,
  id = record['daily_sales_inventory_id'],
}) => {
  const handleSubmit = e => {
    if(icon==='save'){
      try {
        apiFetch({
          method: 'PUT',
          endpoint: ENDPOINTS.inventory.updateAdvertisedPrice,
          body: JSON.stringify({
            daily_sales_inventory_id: id,
            price_after_adjustment: priceAdjusted
          }),
          onSuccess: response => {
            if (response.status) {
              setIcon('good')
            }
          }
        });
      } catch (e) {
        console.log('error ===>', e);
      }
    }
  };
  return (
    <div>
      <InputGroup className={clsx(styles.inputGroup, mobileView?('m-0 p-0'):('ml-3 mt-3 pt-1'))}>
        <InputGroup.Text className={clsx(styles.inputText, 'pl-1', 'p-1')}>$</InputGroup.Text>
        <FormControl
          className={styles.mainInput}
          aria-describedby="basic-addon1"
          readOnly
          value={priceAdjusted || ''}
        />
        <InputGroup.Text className={clsx(styles.inputText, mobileView?'': 'pl-1 pb-3 p-1')} onClick={handleSubmit}>
          <SAStatusCell value={icon} />
        </InputGroup.Text>
      </InputGroup>
    </div>
  );
};

export default PriceAfterAdjustment;
