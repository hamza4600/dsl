import React, {useState } from 'react';

// DEPENDENCIES
import { Col, FormControl, InputGroup, Row } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// LOCAL COMPONENTS

// STYLES
import clsx from 'clsx';
import styles from './priceAdjustment.module.scss';

// MAIN COMPONENT
const PriceAdjustment = ({
  record,
  price,
  imv,
  columnKey,
  setPriceAdjusted,
  setIcon,
  label,
  mobileView,
  id = record['daily_sales_inventory_id'],
  priceValue = record[price] || '',
  imvValue = record[imv] || '',
  ...props
}) => {
  let numbers = /^[+-]?\d*(?:[.,]\d*)?$/;

  //STATES
  const [check, setCheck] = useState('');
  const [selected, setSelected] = useState(1);
  const [inputValue, setInputValue] = useState('');

  
  const submit = (checked) => {
      switch(selected) {
        case 1:     
          setPriceAdjusted(checked === '0' ? priceValue - inputValue : Number(priceValue) + Number(inputValue))
          setIcon('save')
          break;
        case 2:
          setPriceAdjusted(checked === '0' ?  priceValue - (inputValue * priceValue) / 100: priceValue + (inputValue * priceValue) / 100)
          setIcon('save')
          break;
          case 3:
          setPriceAdjusted(checked === '0' ? imvValue - inputValue : Number(imvValue) + Number(inputValue) );
          setIcon('save')
          break;
        case 4:
          setPriceAdjusted(checked === '0' ? imvValue - (inputValue * imvValue) / 100 : imvValue + (inputValue * imvValue) / 100)
          setIcon('save')
          break;
        default:
          return;
      }
  }
  // CALLBACKS
  const handleSUbmits = async (e)  => {
    if (e.keyCode === 9 || e.type === 'blur') {
      inputValue!=='' && check && submit(check)
    }
      
  };

  const haldelCheck = e => {
    setCheck(e.target.value)
    inputValue!=='' && e.target.value  && submit(e.target.value)
  };

  const handelInput = e => {
    if (e.target.value === '' || numbers.test(e.target.value)) setInputValue(e.target.value);
  };

  const options = imvValue
    ? [
        {
          label: 'By Selling Price',
          icon: '$',
          value: 1
        },
        {
          label: 'By Selling Price by %',
          icon: '%',
          value: 2
        },
        {
          label: 'By IMV Price',
          icon: '$',
          value: 3
        },
        {
          label: 'By IMV Price by %',
          icon: '%',
          value: 4
        }
      ]
    : [
        {
          label: 'By Selling Price',
          icon: '$',
          value: 1
        },
        {
          label: 'By Selling Price by %',
          icon: '%',
          value: 2
        }
      ];
  // RENDER
  return (
    <Row className='p-0 m-0'>
      <Col className={clsx(mobileView ?( 'p-0 pl-4 pr-4') : ('pr-0 mt-0'))}>
          <Form.Select
            className={clsx('select', styles.dropDownheight)}
            htmlSize={12}
            size="sm"
            onSelect={value => setSelected(value)}
            value={selected}
            options={options}
          />
      </Col>
      <Col sm={10} className={mobileView ? 'p-0 pl-4 pr-4' : 'pl-0 pt-1'}>
        <InputGroup className={clsx(styles.inputGroup, mobileView ? 'm-0 mb-3':'mt-3')}>
          <InputGroup.Text className={clsx(styles.inputText, 'pl-1', 'p-0')}>
            <span>
              <input
                className={clsx(styles.radioCustom)}
                name="radio-group"
                value={0}
                onChange={haldelCheck}
                type="radio"
              />
              <label htmlFor="radio_1" className={clsx(styles.radioCustomLabel, styles.radio_1)}>
                {label}
              </label>
            </span>
            <span>
              <input
                className={clsx(styles.radioCustom)}
                name="radio-group"
                value={1}
                onChange={haldelCheck}
                type="radio"
              />
              <label htmlFor="radio_2" className={clsx(styles.radioCustomLabel, styles.radio_2)}>
                {options[selected - 1].icon}
              </label>
            </span>
            
          </InputGroup.Text>
          <FormControl
            className={styles.mainInput}
            aria-describedby="basic-addon1"
            onChange={handelInput}
            value={inputValue}
            onKeyPress={handleSUbmits}
            onBlur={handleSUbmits}
          />
        </InputGroup>
      </Col>
    </Row>
  );
};

// EXPORT
export default PriceAdjustment
