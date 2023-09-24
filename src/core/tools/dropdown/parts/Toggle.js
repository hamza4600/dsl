import React, { useCallback, useContext } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// CONTEXT
import { DropdownContext } from '../helpers/dropdownContext';
import { MenuContext } from 'parts/menu/helpers/menuContext';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './toggle.module.scss';

// MAIN COMPONENT
const Toggle = ({
  as: Component = Button,
  className,
  icon = 'chevron-down',
  onToggle,
  ...props
}) => {

  // CONTEXT
  const { show, setShow, toggleRef } = useContext(DropdownContext) || {};
  // ACCORDION CONTEXT
  // const { toggleMenuShow } = useContext(MenuContext) || {};

  // CALLBACKS
  const handleClick = useCallback(
    () => {
      doCallback(setShow, !show);
      doCallback(onToggle, !show);
      // toggleMenuShow(false)
    },
    [show, setShow, onToggle]
  )

  // RENDER
  return (
    <Component
      {...props}
      className={clsx(
        'dropdown-toggle',
        styles.toggle,
        show && 'active',
        className
      )}
      icon={icon}
      onClick={handleClick}
      ref={toggleRef}
    />
  )
}

// EXPORT
export default Toggle;
