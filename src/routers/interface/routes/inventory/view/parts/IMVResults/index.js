import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Card from 'parts/card/Card';

// LOCAL COMPONENTS
import PriceAdjustment from '../PriceAdjustment';

// STYLES
import styles from './styles.module.scss';
import { IMV_RESULTS_KEYS } from '../../../variables';

// MAIN COMPONENT
/**
 *
 * @param {Object} props
 * @param {number} props.inventoryId
 * @param {Object} props.data
 *
 * @returns {JSX.Element}
 */
const IMVResultsBody = props => {
  const {
    original_price_after_adjustment,
    original_imv_price,
    priceAdjustmentTypeID_selected,
    priceAdjustmentHistory,
    priceAfterAdjustment,
    adPriced_lastIMV
  } = props.data;


  const renderedRows = IMV_RESULTS_KEYS
    .map(({ label, key }, index) =>
      <div key={`${key}-${index}`} className={styles['table--row']}>
        <span>{label}</span>
        <span>{
          Object.hasOwn(props.data ,`${key}_initIMV`)
            ? props.data[`${key}_initIMV`] : '-'
        }</span>
        <span>{
          Object.hasOwn(props.data,`${key}_lastIMV`)
            ? props.data[`${key}_lastIMV`] : '-'
        }</span>
      </div>);

  // RENDER
  return <Form.Body>
    <Form.Row className='w-100'>
      <div className={clsx('w-100', styles.table)}>
        <div className={clsx(styles['table--row'], styles['table--row__head'])}>
          <span></span>
          <span>Initial IMV</span>
          <span>Last IMV</span>
        </div>
        {renderedRows}
      </div>
    </Form.Row>
    <PriceAdjustment
      sellingPrice={original_price_after_adjustment || 0}
      imvPrice={original_imv_price || 0}
      adjustmentType={priceAdjustmentTypeID_selected || 1}
      history={priceAdjustmentHistory || []}
      priceAfterAdjustment={priceAfterAdjustment ? priceAfterAdjustment.replaceAll(/[^\d.-]/g,'') : ''}
      originalPrice={adPriced_lastIMV ? parseInt(adPriced_lastIMV.replaceAll(/[^\d.-]/g,''),10) : ""}
    />
  </Form.Body>
};

// EXPORT
export default function IMVResults(props) {
  return <Card title="IMV Results" body={<IMVResultsBody {...props} />} />;
};
