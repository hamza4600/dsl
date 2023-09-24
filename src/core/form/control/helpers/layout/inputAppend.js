import React, { forwardRef } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// MAIN COMPONENT
export const inputAppend = Component => forwardRef(({
  input: { append, ...input } = {},
  ...props
}, ref) => {


  // RENDER
  return append ? (
    <div className="d-flex align-items-center flex-wrap w-100">
      <Component
        input={input}
        {...props}
        inputGroup={{
          ...props.inputGroup,
          className: clsx('flex-grow-1 w-auto', props.inputGroup?.className)
        }}
        ref={ref}
      />
      {append}
    </div>
  ) : (
    <Component
      input={input}
      {...props}
      ref={ref}
    />
  )
})
