import React, { forwardRef } from 'react';

// MAIN COMPONENT
export const dateValues = Component => {
  return forwardRef(({
    ...props
  }, ref) => {

    // RENDER
    return <Component
      {...props}
      ref={ref}
    />
  })
}
