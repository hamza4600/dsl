import React, { forwardRef, useEffect, useMemo } from 'react';

// GLOBAL FUNCTIONS
import { bugLog } from 'functions.js';

// MAIN COMPONENT
export const optionsArray = Component => {
  return forwardRef(({
    options,
    ...props
  }, ref) => {

    // PROPS
    const {
      name,
      debug
    } = props;

    // MEMOS
    const optionsArray = useMemo(
      () => !Array.isArray(options) ? [] : options.map(
        option => typeof option === 'object' ? option : {
          label: option,
          value: option
        }
      ).filter(
        option => !!option
      ),
      [options]
    )

    // EFFECTS
    useEffect(
      () => {
        bugLog('set options', debug, name);
      },
      [name, debug, options]
    )

    // RENDER
    return (
      <Component
        {...props}
        options={optionsArray}
        ref={ref}
      />
    )
  })
}
