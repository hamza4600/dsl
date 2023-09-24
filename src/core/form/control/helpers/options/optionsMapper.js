import React, { forwardRef, useMemo } from 'react';

// DEPENDENCIES
import isFunction from 'lodash/isFunction';

// MAIN COMPONENT
export const optionsMapper = Component => {
  return forwardRef(({ options, optionsMapper: mapper, ...props }, ref) => {
    // MEMOS
    options = useMemo(() => (isFunction(mapper) ? mapper(options) : options), [options, mapper]);

    // RENDER
    return <Component {...props} options={options} ref={ref} />;
  });
};
