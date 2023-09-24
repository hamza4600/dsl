import React, { useCallback, useContext, useMemo } from 'react';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// CONTEXT
import { DropdownContext } from 'core/tools/dropdown/helpers/dropdownContext';

// BOOTSTRAP COMPONENTS
import { Dropdown } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Sprite from 'core/tools/Sprite';

// STYLES
import styles from './item.module.scss';

// MAIN COMPONENT
const Item = ({
  option,
  selection = {},
  onSelect,
  closeOnSelect = true
}) => {

  // CONTEXT
  const { setShow } = useContext(DropdownContext) || {};
 
  // PROPS
  const {
    label,
    value,
    icon
  } = typeof option === 'object' ? option : typeof option === 'string' ? {
    label: option,
    value: option
  } : {};

  // MEMOS
  const isSelected = useMemo(
    () => value === selection.value || (value === '' && selection.value === undefined),
    [selection, value]
  )
 
  // CALLBACKS
  const handleSelect = useCallback(
    () => {
      doCallback(onSelect, value);
      if (closeOnSelect) doCallback(setShow, false);
    },
    [value, onSelect, closeOnSelect, setShow]
  )

  // RENDER
  return (
    <Dropdown.Item
      className={styles.item}
      onSelect={handleSelect}
      data-selected={isSelected}
    >
      <span className={styles.label}>
        {label}
      </span>
      {(!!icon || !!isSelected) &&
        <Sprite
          className={styles.icon}
          use={icon || 'checkmark'}
        />
      }
    </Dropdown.Item>
  )
}

// EXPORT
export default Item;
