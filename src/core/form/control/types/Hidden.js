import React, { forwardRef } from 'react';

// DEPENDENCIES
import { compose } from 'redux';

// LOCAL HELPERS
import { formikField } from '../helpers/formik/formikField';
import { inputState } from '../helpers/state/inputState';

// MAIN COMPONENT
const Hidden = compose(
  formikField,
  inputState,
  forwardRef
)(({
  name,
  value = ''
}, ref) => (
  <input
    type="hidden"
    name={name}
    value={value}
    ref={ref}
  />
))

// EXPORT
export default Hidden;
