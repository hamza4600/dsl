import React, { forwardRef } from 'react';

// MAIN COMPONENT
export const helper = Component => {
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
