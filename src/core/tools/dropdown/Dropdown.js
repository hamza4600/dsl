import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// LOCAL HELPERS
import { dropdownContext } from './helpers/dropdownContext';

// LOCAL COMPONENTS
import Menu from './parts/Menu';
import Popover from './parts/Popover';
import Toggle from './parts/Toggle';

// STYLES
import styles from './dropdown.module.scss';

// MAIN COMPONENT
const Dropdown = ({
  children,
  className,
  toggle = {},
  popover = {},
  menu = {},
  maxHeight,
  size,
  fullWidth,
  useArrow,
  ...props
}) => (
  <div
    className={clsx(
      'dropdown',
      styles.dropdown,
      className
    )}
  >
    {toggle &&
      <Toggle
        size={size}
        {...toggle}
      />
    }
    <Popover
      fullWidth={fullWidth}
      {...popover}
    >
      <Menu
        size={size}
        useArrow={useArrow}
        {...menu}
        scrollbar={true}
        direction='vertical'
        maxHeight={maxHeight}
      >
        {children}
      </Menu>
    </Popover>
  </div>
)

// EXPORT
export default dropdownContext(Dropdown);
