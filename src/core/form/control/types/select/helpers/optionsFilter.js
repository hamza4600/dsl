import React, { forwardRef, useCallback, useMemo, useState } from 'react';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// MAIN COMPONENT
export const optionsFilter = Component => {
  return forwardRef(({
    options,
    onChange,
    onSelect,
    filterOptions,
    allowCustom = filterOptions,
    showCustom = filterOptions,
    ...props
  }, ref) => {

    // FILTER STATE
    const [filter, setFilter] = useState();

    // OPTIONS MEMO
    options = useMemo(
      () => Array.isArray(options) && filter ? options.filter(o => o.label.toLowerCase().search(filter.toLowerCase()) > -1) : options,
      [options, filter]
    )

    // FILTER CALLBACK
    const handleChange = useCallback(
      e => {
        doCallback(onChange, e);
        if (filterOptions) setFilter(e.target.value);
      },
      [onChange, filterOptions, setFilter]
    )
    const handleSelect = useCallback(
      value => {
        doCallback(onSelect, value);
        if (filterOptions) setFilter(undefined);
      },
      [onSelect, filterOptions, setFilter]
    )

    // RENDER
    return <Component
      {...props}
      options={options}
      onChange={handleChange}
      onSelect={handleSelect}
      allowCustom={allowCustom}
      showCustom={showCustom}
      ref={ref}
    />
  })
}
