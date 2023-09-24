import React, { forwardRef, useEffect } from 'react';

// GLOBAL FUNCTIONS
import { bugLog } from 'functions.js';

// MAIN COMPONENT
export const mountLog = Component => {
  const WrappedComponent = ({
    forwardedRef,
    ...props
  }) => {
    const { debug, name, id } = props;

    // MOUNT/UNMOUNT LISTENER
    useEffect(
      () => {
        bugLog('mount', debug, name || id);
        return () => bugLog('unmount', debug, name);
      },
      [debug, name, id]
    )

    return <Component {...props} ref={forwardedRef} />;
  }

  return forwardRef((props, ref) => <WrappedComponent {...props} forwardedRef={ref} />);
}
