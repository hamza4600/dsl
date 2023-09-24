import React, { useContext } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL VARIABLES
import { DROPDOWN } from 'defaults.js';

// CONTEXT
import { DropdownContext } from '../helpers/dropdownContext';

// GLOBAL COMPONENTS
import Scrollbox from 'core/tools/scrollbox/Scrollbox';

// STYLES
import styles from './menu.module.scss';

// MAIN COMPONENT
const Toggle = ({
  children,
  className,
  maxHeight: controlledMaxHeight,
  size,
  useArrow = DROPDOWN.useArrow,
  ...props
}) => {

  // CONTEXT
  const { maxHeight, menuRef } = useContext(DropdownContext) || {};

  // RENDER
  return (
    <div
      className={clsx(
        'dropdown-menu',
        styles.menu,
        styles[size],
        useArrow && styles.withArrow,
        className
      )}
      ref={menuRef}
    >
      <Scrollbox
        outerStyle={{
          maxHeight: controlledMaxHeight || maxHeight
        }}
        preventDefault
        disabled
        {...props}

      >
        <div className={styles.inner}>
          {children}
        </div>
      </Scrollbox>
    </div>
  )
}

// EXPORT
export default Toggle;
