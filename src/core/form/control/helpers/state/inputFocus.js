import React, { forwardRef, useCallback, useState } from 'react';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// MAIN COMPONENT
export const inputFocus = Component => {
  const WrappedComponent = ({
    onBlur,
    onFocus,
    forwardedRef,
    ...props
  }) => {

    // FOCUS STATE
    const [ focus, setFocus ] = useState(false);

    // FOCUS HANDLER
    const handleFocus = useCallback(
      e => {
        let focus = doCallback(onFocus, e);
        setFocus(focus === undefined ? true : focus);
      },
      [onFocus, setFocus]
    )

    // BLUR HANDLER
    const handleBlur = useCallback(
      e => {
        let focus = doCallback(onBlur, e);
        setFocus(focus === undefined ? false : focus);
      },
      [onBlur, setFocus]
    )

    // RENDER
    return (
      <Component
        {...props}
        ref={forwardedRef}
        focus={focus}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
    )
  }

  return forwardRef((props, ref) => <WrappedComponent {...props} forwardedRef={ref} />);
}
