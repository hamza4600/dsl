import React, { forwardRef } from 'react';

// MAIN COMPONENT
export const useHidden = Component => {
  return forwardRef(({
    hidden,
    ...props
  }, ref) => {

    // PROPS
    const {
      name,
      value
    } = props

    // RENDER
    return hidden ? (
      <input
        type="hidden"
        name={name}
        value={value}
        ref={ref}
      />
    ) : (
      <Component {...props} ref={ref} />
    )}
)
}
