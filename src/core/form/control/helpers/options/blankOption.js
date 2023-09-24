import React, { forwardRef, useMemo } from 'react';

// MAIN COMPONENT
export const blankOption = Component => {
  return forwardRef(({
    options,
    useBlank,
    blankLabel = 'None',
    useAll,
    allLabel = 'All',
    ...props
  }, ref) => {

    // MEMOS
    options = useMemo(
      () => !Array.isArray(options) ? options : useBlank ? [
        {
          label: blankLabel,
          value: ''
        },
        ...options
      ] : useAll ? [
        {
          label: allLabel,
          value: options.map(option => typeof option === 'object' ? option.value : option).join(',')
        },
        ...options
      ] : options,
      [options, useBlank, blankLabel, useAll, allLabel]
    )

    // RENDER
    return <Component
      {...props}
      options={options}
      ref={ref}
    />
  })
}
