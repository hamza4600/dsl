// DEPENDENCIES
import React from 'react';
import moment from 'moment';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { isUndefined } from 'lodash';
import { useFormikContext } from 'formik';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Card from 'parts/card/Card';

// GLOBAL VARIABLES
import { NEW_USED } from 'codes';

// LOCAL VARIABLES
import { SALE_TYPES, TRUE_FALSE } from '../variables';

const VehicleInfoForm = compose(withRouter)(() => {
  const { values } = useFormikContext() || {};
  const { sales_time, new_used } = values || {};
  const isNew = new_used === NEW_USED.new.numeric;
  const type = !isUndefined(new_used) ? (isNew ? 'New' : 'Pre-Owned') : '';

  return (
    <Form.Body plaintext>
      <Form.Checklist name="sale_type_category_id" type="radio" label="Sale Type" options={SALE_TYPES} required />
      <Form.Control
        label="Date Sold:"
        value={`${moment(sales_time).format('MM/DD/YYYY')} at ${moment(sales_time).format('h:mm A')}`}
      />
      <Form.Control label="Stock #" name="stock_num" />
      <Form.Control label="VIN #" name="vin_num" />
      <Form.Control label="Type" value={type} />
      <Form.Checklist label="Is this vehicle a loaner?" name="is_loaner" type="radio" options={TRUE_FALSE} required />
      <Form.Checklist label="Is this vehicle a CPO?" name="is_cpo" type="radio" options={TRUE_FALSE} required />
      <Form.Control label="Subtype" name="sale_subtype_name" />
      <Form.Control label="Year" name="vehicle_year" />
      <Form.Control label="Make" name="make" />
      <Form.Control label="Model" name="model" />
      <Form.Control label="Trim" name="vehicle_trim" />
      <Form.Control label="Body Style" name="body_style" />
      <Form.Control label="Engine" name="engine" />
      <Form.Control label="Engine Type" name="engine_type" />
      <Form.Control label="Transmission" name="transmission_name" />
      <Form.Control label="Drivetrain" name="drivetrain_name" />
      <Form.Control label="Exterior" name="ext_color" />
      <Form.Control label="Interior" name="int_color" />
      <Form.Control label="Age" name="age_of_vehicle" />
      <Form.Control label="Warranty Type" name="warranty_type_name" />
      <Form.Control label="Mileage" name="mileage" schema="miles" />
      <Form.Control label="Current Mileage" name="current_mileage" schema="miles" />
    </Form.Body>
  );
});

// EXPORT
export default function VehicleInfo(props) {
  return <Card title="Vehicle Info" body={<VehicleInfoForm {...props} />} />;
}
