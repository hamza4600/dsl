import React, { useCallback } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './filterButton.module.scss';

// MAIN COMPONENT
const FilterButton = compose(
  connect(
    ({ mobile })=> ({ mobile })
  )
)(({
  className,
  name,
  value,
  active,
  onUpdate,
  // REDUX STATE
  mobile,
  // REST
  ...props
}) => {

  // CALLBACKS
  const handleClick = useCallback(
    () => {
      doCallback(onUpdate, name, value)
    },
    [name, value, onUpdate]
  )

  // RETURN
  return (
    <Button
      className={clsx(
        'filter-button',
        styles.button,
        !!active && styles.active,
        className
      )}
      variant={active ? 'primary' : 'custom'}
      onClick={handleClick}
      size={!mobile.mobile ? 'sm' : undefined}
      outline={!active}
      disabled={active}
      {...props}
    />
  )
})

// EXPORT
export default FilterButton;
