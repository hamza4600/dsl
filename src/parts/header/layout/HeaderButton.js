import React, { forwardRef } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { isString } from 'lodash';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './headerButton.module.scss';

// MAIN COMPONENT
const HeaderButton = forwardRef(({
  className,
  icon,
  // REST
  ...props
}, ref) => (
  <Button
    className={clsx(
      styles.button,
      className
    )}
    icon={{
      size: 'lg',
      ...(isString(icon) ? {
        use: icon
      } : icon)
    }}
    size="lg"
    ref={ref}
    {...props}
  />
))

export default HeaderButton
