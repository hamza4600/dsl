import React from 'react';

// DEPENDENCIES
import { useFormikContext } from 'formik';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// GLOBAL FUNCTIONS
import { apiFetch } from 'functions.js';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import Form from 'core/form/Form';

const VinNumber = ({ ...props }) => {
  // CONTEXT
  const { values, setValues, errors } = useFormikContext() || {};

  const { vin_num } = values || {};
  console.table("Vimm ======", values)
  const handleDecodeVin = () => {
    apiFetch({
      endpoint: ENDPOINTS.inventory.decodeVin,
      params: {
        vin_num
      },
      loadingMessage: 'Decoding VIN',
      errorMessage: 'Unable to decode VIN.',
      onSuccess: d => {
        setValues({
          ...values,
          vehicle_year: d.vehicle_year,
          make_id: d.make_id,
          model: d.model,
          model_code: d.model_code,
          vehicle_trim: d.vehicle_trim,
          body_style: d.body_style,
          engine: d.engine,
          engine_type: d.engine_type,
          drivetrain_name: d.drivetrain,
          transmission_name: d.transmission_name
        });
      }
    });
  };

  const vinError =
    vin_num?.length &&
    vin_num.length < 17 &&
    `VIN requires 17 characters. It is currently ${vin_num.length} characters.`;

  return (
    <Form.Control
      name="vin_num"
      label="VIN"
      schema="vin"
      inputGroup={{
        className: 'mr-2'
      }}
      input={{
        maxLength: 17,
        append: (
          <Button
            label="Decode VIN"
            icon="refresh"
            size="sm"
            className="w-auto"
            onClick={handleDecodeVin}
            disabled={!vin_num || vinError || errors.vin_num}
          />
        )
      }}
      error={vinError}
      {...props}
    />
  );
};

// EXPORT
export default VinNumber;
