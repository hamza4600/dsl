import React from 'react';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Button from 'core/tools/Button';

//STYLES
import styles from './trade.module.scss';

const SubTrade = ({ data, Open, isEdit }) => {
  return (
    <Form>
      {Array.isArray(data)
        ? data?.map((item, i) => (
            <Form.Body plaintext className={styles.body}>
              <Form.Label className={styles.bolde}>{`Trade Info ${i + 1}`}</Form.Label>
              <Form.Control label="Stock #" value={item.stock_num} />
              <Form.Control label="VIN" schema="vim" name="vin_num" value={item.vin_num} />
              <hr />
              <Form.Control label="Year" value={item.vehicle_year} />
              <Form.Control label="Make" value={item.make} />
              <Form.Control label="Model" value={item.model} />
              <Form.Control label="Trim" value={item.vehicle_trim} />
              <Form.Control label="Body Style" value={item.body_style} />
              <Form.Control label="Engine" value={item.engine} />
              <Form.Control label="Trasmission" value={item.transmission_name} />
              <Form.Control label="Drivetrain" value={item.drivetrain_name} />
              <Form.Control label="Exterior" value={item.ext_color} />
              <Form.Control label="Interior" value={item.int_color} />
              <Form.Control label="Age" value={item.age} />
              <Form.Control label="Warranty Type" value={item.warranty_type_name} />
              <Form.Control label="Mileage" value={item.mileage} schema={'millage'} />
              <hr />
              <Form.Control label="ACV" value={item.acv} schema={'dollars'} />
              <Form.Control label="Trade In Allowance" value={item.trade_in_allowance} schema={'dollars'} />
              <Form.Control label="Payoff" value={item.pay_off_amount} />
              <Form.Control label="Bank To Payoff" value={item.bank_to_pay_off} />
              <Form.Control label="Loan Account #" value={item.loan_account_number} />
              <Form.Control label="Phone" value={item.phone_number} />
              <Form.Control label="Contact" value={item.contact} />
              <Form.Control label="Payoff Amount" value={item.pay_off_amount} />
              <Form.Control label="Payoff Good Unit" value={item.need_to_payoff} />
              <Form.Control label="Per Diem" value={item.per_diem} />
              <Form.Control label="Trade Title State" value={item.title_state_code} />
              <Form.Control label="Title in Possession" value={item.contact} />
              <Form.Control label="Sife in Possession" value={item.contact} />
              <Form.Control label="Vehicle Registration" value={item.vehicle_registration} />

              {isEdit ? (
                <>
                  <Button.Link icon="edit" label="Edit" onClick={() => Open(data, item)} />
                  <Button.Link icon="delete" label="Delete" />
                </>
              ) : null}
            </Form.Body>
          ))
        : null}
    </Form>
  );
};

export default SubTrade;
