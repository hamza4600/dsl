import React, { forwardRef, useCallback, useState } from 'react';

// DEPENDENCIES
import * as yup from 'yup';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// LOCAL COMPONENTS
import Confirmation from '../../parts/Confirmation';

// MAIN COMPONENT
export const inputConfirmation = Component => {
  return forwardRef(({
    onChange,
    confirmed,
    ...props
  }, ref) => {

    // VALIDATION STATE
    const [ validation, setValidation ] = useState();

    // CALLBACKS
    const yupObject = useCallback(
      value => !value ? undefined : yup.string().matches(value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), `Confirmation does not match`),
      []
    )
    const handleChange = useCallback(
      e => {
        doCallback(onChange, e);
        if (confirmed) setValidation(yupObject(e.target.value));
      },
      [onChange, confirmed, setValidation, yupObject]
    )

    // RENDER
    return (<>
      <Component
        {...props}
        onChange={handleChange}
      />
      {confirmed &&
        <Confirmation
          {...props}
          schema={undefined}
          info={false}
          clearButton={true}
          validation={validation}
        />
      }
    </>)
  })
}
