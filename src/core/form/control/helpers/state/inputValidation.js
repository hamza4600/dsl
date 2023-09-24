import React, { forwardRef, useCallback, useMemo } from 'react';

// DEPENDENCIES
import * as yup from 'yup';
import isNumber from 'lodash/isNumber';

// GLOBAL VARIABLES
import { TODAY } from 'timeFormats.js';

// GLOBAL FUNCTIONS
import { bugLog } from 'functions.js';

// FUNCTIONS
const blankToNull = (value, originalValue) => originalValue.trim() === "" ? null: value;

// VARIABLES
const VALIDATION = {
  email:       yup.string().email('Invalid email.'),
  charkey:     yup.string().matches(/^[A-Z]{6}$/, 'Invalid character key.'),
  passkey:     yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Invalid password.'),
  comment:     yup.string().test('isBlank', 'This field cannot contain only blank spaces', value => !/^\s*$/.test(value)),
  postalCode:  yup.string().matches(/^\d{5}(?:[-\s]\d{4})?$/, 'Invalid postal code.'),
  required:    yup.mixed().required('Required field.'),
  true:        yup.mixed().oneOf(['true', '1'], `User must select 'Yes' to continue.`),
  tel:         yup.string().matches(/^\+1 \([2-9]{1}[0-9]{2}\) [2-9]{1}[0-9]{2}-[0-9]{4}$/, 'Invalid phone number.'),
  text:        yup.string().ensure(),
  year:        yup.number().typeError('Invalid year.').nullable().min(1900, 'Invalid year.').max(TODAY.getFullYear(), 'Invalid year.').transform(blankToNull),
  vin:         yup.string().test('len17', 'Must be 17 characters.', v => v?.length === 17)
}

// MAIN COMPONENT
export const inputValidation = Component => forwardRef((props, ref) => {

  // PROPS
  let {
    name,
    type,
    schema,
    validationSchema = VALIDATION[schema] || VALIDATION[type],
    debug
  } = props;

  // MEMOS
  validationSchema = useMemo(
    () => props.required ? VALIDATION.required.concat(validationSchema || VALIDATION.text) : validationSchema,
    [validationSchema, props.required]
  )

  // CALLBACKS
  const handleValidate = useCallback(
    value => {
      if (!!validationSchema) {
        return validationSchema.validate((isNumber(value) ? value : value || '').toString())
          .then(response => {
            bugLog('valid', debug, name);
            return null;
          })
          .catch(({ errors }) => {
            bugLog('error', debug, name, errors[0]);
            return errors[0]
          })
      } else {
        bugLog('no validation', debug, name);
        return null;
      }
    },
    [name, validationSchema, debug]
  )

  // RENDER
  return <Component {...props} validationSchema={validationSchema} onValidate={handleValidate} ref={ref} />;
})
