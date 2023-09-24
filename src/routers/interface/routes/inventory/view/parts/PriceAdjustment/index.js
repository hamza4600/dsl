import React, { useState, useEffect, useCallback } from 'react';

// GLOBAL DEPENDENCIES
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';

// GLOBAL FUNCTIONS
import { FORMAT_PRICE } from 'helpers/format';
import { apiFetch, modalFunctions } from 'functions';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Button from 'core/tools/Button';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints';

// LOCAL VARIABLES
import { IMV_ADJUSTMENT_PRICE_OPTIONS } from '../../../variables';

// STYLES
import styles from './styles.module.scss';

const YES_NO_OPTIONS = [{ label: '+', value: 1 }, { label: '-', value: 0 }];

// MAIN COMPONENT
/**
 *
 * @param {object} props
 * @param {string} props.sellingPrice
 * @param {string} props.imvPrice
 * @param {number} props.adjustmentType
 * @param {array} props.history
 * @param {string} props.priceAfterAdjustment
 * @param {number} props.originalPrice
 * @returns {JSX.Element}
 */
const PriceAdjustment = props => {
  const { recordID: inventoryId } = useParams();

  const [adjustmentHistory, setAdjustmentHistory] = useState([]);
  const [adjustmentSchema, setAdjustmentSchema] = useState('dollars');

  const [adjustmentTypeId, setAdjustmentTypeId] = useState(1);
  const [isIncreasing, setIsIncreasing] = useState(null);
  const [adjustAmount, setAdjustAmount] = useState('');

  const [afterAdjustment, setAfterAdjustment] = useState('');
  const [historyOriginalPrice, setHistoryOriginalPrice]=useState(0)

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const { history, adjustmentType, originalPrice } = props;

    setAdjustmentHistory(history || []);
    setHistoryOriginalPrice(originalPrice);
    if (Array.isArray(history)) setAdjustmentHistory(history);
    if (adjustmentType) setAdjustmentTypeId(adjustmentType);

  }, [props]);

  useEffect(()=>{
    setAdjustAmount(null);
    setAdjustmentSchema([1,3].includes(adjustmentTypeId) ? 'dollars' : 'percent');
  }, [adjustmentTypeId]);

  useEffect(() => {
    if (!!adjustmentTypeId && typeof isIncreasing === 'string' && !!adjustAmount) {
      const adjustedPrice = getAdjustment();

      setAfterAdjustment(`${adjustedPrice}`);
      setIsValid(true);
    } else {
      setIsValid(false);
    }

  }, [adjustmentTypeId, isIncreasing, adjustAmount])

  const getDefaultValues = (includeOriginal = false) => {
    if (!!adjustmentHistory.length) {
      const {price_after_adjustment, original_price} = adjustmentHistory.at(-1);

      setAfterAdjustment(price_after_adjustment.replaceAll(/[^\d.-]/g,''));

      if (includeOriginal)
        setHistoryOriginalPrice(parseInt(original_price.replaceAll(/[^\d.-]/g,''),10));
    } else {
      const {priceAfterAdjustment, originalPrice} = props;

      setAfterAdjustment(priceAfterAdjustment);

      if (includeOriginal)
        setHistoryOriginalPrice(originalPrice);
    }
  }

  useEffect(()=>{
    getDefaultValues(true);
  },[adjustmentHistory])


  const getAdjustment = () => {
    const {sellingPrice, imvPrice} = props;

    const targetPrice = [1,2].includes(adjustmentTypeId)
      ? parseInt(sellingPrice,10)
      : parseInt(imvPrice, 10);
    const adjustedAmount = parseInt(adjustAmount.replaceAll( /[^\d.-]/g, ''), 10);

    if ([2,4].includes(adjustmentTypeId)) {
      const percentValue = (adjustedAmount * targetPrice) / 100;

      return !!parseInt(isIncreasing,10)
        ? targetPrice + percentValue
        : targetPrice - percentValue;
    } else {
      return !!parseInt(isIncreasing,10)
        ? targetPrice + adjustedAmount
        : targetPrice - adjustedAmount;
    }
  }

  const renderedRows = adjustmentHistory
    .map(({ created_date, original_price, price_after_adjustment, adjustment }, index) =>
      <div key={`${created_date}-${index}`} className={styles['table--row']}>
        <span>{created_date}</span>
        <span>{original_price}</span>
        <span>{price_after_adjustment}</span>
        <span>{adjustment}</span>
      </div>);

  const renderAdjustmentHistoryTable = () => <div className={styles.table}>
    <div className={clsx(styles['table--row'], styles['table--row__head'])}>
      <span>Updated On</span>
      <span>Original Price</span>
      <span>Price Adjustment</span>
      <span>Adjustment</span>
    </div>
    {renderedRows}
  </div>

  const handleSelect = value => {
    setAdjustmentTypeId(value);
    getDefaultValues();
  }

  const handleAdjustmentType = event => setIsIncreasing(event.target.value);
  const handleAdjustAmount = event => setAdjustAmount(event.target.value);

  const submitAdjustPrice = useCallback(() => apiFetch({
      method: 'PUT',
      endpoint: ENDPOINTS.inventory.updateAdjustedPrice,
      params: {
        daily_sales_inventory_id: inventoryId,
        price_after_adjustment: afterAdjustment,
      },
      onSuccess: () => setAdjustmentHistory(prevState => [
        ...prevState,
        {
          created_date: moment().format('MM/DD/YYYY'),
          original_price: FORMAT_PRICE(historyOriginalPrice),
          price_after_adjustment: FORMAT_PRICE(afterAdjustment),
          adjustment: historyOriginalPrice > afterAdjustment
            ? FORMAT_PRICE(historyOriginalPrice - afterAdjustment)
            : `(${FORMAT_PRICE(afterAdjustment - historyOriginalPrice)})`,
        }]
      ),
      loadingMessage: 'Adjusting the price',
      successMessage: 'Price adjusted successfully'
    })
  ,[afterAdjustment])

  const validateAdjustAmount = e => {
    if ([2,4].includes(adjustmentTypeId)) {
      if (
        parseInt(e.target.value.replaceAll( /[^\d.-]/g, ''), 10) > 20
      ) {
        modalFunctions.error('The adjustment percentage must be a number, not greater than 20%');
        setAdjustAmount('');
        getDefaultValues();
      }
    }
  }

  // RENDER
  return <>
    <Form.Row>
      <Form.Col cols={{ xs: 48, lg: 8 }}>
        <Form.Select label="Price Adjustment"
                     placeholder="Select Adjustment Type"
                     value={adjustmentTypeId}
                     onSelect={handleSelect}
                     options={IMV_ADJUSTMENT_PRICE_OPTIONS}
        />
      </Form.Col>
      <Form.Col cols={{ xs: 24, lg: 4, sm: 8 }}>
        <Form.YesNo value={isIncreasing}
                    onChange={handleAdjustmentType}
                    options={YES_NO_OPTIONS}
                    className={styles.checkList}
        />
      </Form.Col>
      <Form.Col cols={{ xs: 24, lg: 4, sm: 8 }}>
        <Form.Control schema={adjustmentSchema}
                      onChange={handleAdjustAmount}
                      value={adjustAmount}
                      onBlur={validateAdjustAmount}
      />
      </Form.Col>
    </Form.Row>
    <Form.Control label="Price After Adjustment"
                  schema='dollars'
                  value ={afterAdjustment}
                  className={styles['input--label']}
                  disabled
    />
    <Button.Submit disabled={!isValid} fullWidth={false} onClick={submitAdjustPrice} />
    <Form.Row className={clsx('w-100', styles.row)}>
      <Form.Col cols={{ xs: 24, lg: 8 }} className={styles.label}>
        <Form.Label>Price Adjustment History</Form.Label>
      </Form.Col>
      <Form.Col cols={{ xs: 48, sm: 8, lg: 16 }} className={styles.col}>
        {renderAdjustmentHistoryTable()}
      </Form.Col>
    </Form.Row>

  </>
}

// EXPORT
export default PriceAdjustment;
