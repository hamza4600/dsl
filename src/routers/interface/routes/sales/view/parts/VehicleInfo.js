// DEPENDENCIES
import React from 'react';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Card from 'parts/card/Card';

const VehicleInfoForm =() => {
  return (
    <Form.Body plaintext>
     <Form.Control label="Sale Type" name="sale_type_category_name"/>
     <Form.Control label="Stock #" name= "stock_num"/>
     <Form.Control label="VIN #" name= "vin_num"/>
     <Form.Control label="Type" name="type"/>
     <Form.Control label="Subtype" name="subtype_name"/>
     <Form.Control label="Year" name= "vehicle_year"/>
     <Form.Control label="Make" name= "make"/>
     <Form.Control label="Model" name= "model"/>
     <Form.Control label="Model Code" name="model_code"/>
     <Form.Control label="Trim" name= "vehicle_trim"/>
     <Form.Control label="Body Style" name= "body_style"/>
     <Form.Control label="Engine" name= "engine"/>
     <Form.Control label="Transmission" name= "transmission_name"/>
     <Form.Control label="Drivetrain" name= "drivetrain_name"/>
     <Form.Control label="Exterior" name= "ext_color"/>
     <Form.Control label="Interior" name= "int_color"/>
     <Form.Control label="Age" name= "age_of_vehicle"/>
     <Form.Control label="Warranty Type" name="warranty_type_name"/>
     <Form.Control label="Mileage" name= "mileage" schema="miles"/>
     <Form.Control label="Current Mileage" name="current_mileage" schema="miles"/>
    </Form.Body>
  ); 
};

// EXPORT
export default function VehicleInfo(props) {
  return <Card title="Vehicle Info" body={<VehicleInfoForm {...props} />} />;
}
