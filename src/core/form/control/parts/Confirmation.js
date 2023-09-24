import React, { useMemo } from 'react';

// LOCAL COMPONENTS
import Control from '../Control';

// MAIN COMPONENT
const Confirmation = ({
  name,
  label,
  required,
  ...props
}) => {

  // PROPS
  const {
    validation
  } = props

  // CONFIRM LABEL PROPS
  const confirmLabel = useMemo(
    () => typeof label === 'object' ? ({
      ...label,
      title: label.title ? `Confirm ${label.title}` : undefined
    }) : typeof label === 'string' ? `Confirm ${label}` : undefined,
    [label]
  )

  // RENDER
  return (
    <Control
      {...props}
      name={`confirmation.${name}`}
      label={confirmLabel}
      required={required || validation !== undefined}
      validationSchema={validation}
    />
  )
}

// EXPORT
export default Confirmation;
