import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './menuButton.module.scss';

// MAIN COMPONENT
const MenuButton = ({
  className,
  variant,
  closeBtn,
  ...props
}) => (
  <Button
    className={clsx(
      styles.button,
      closeBtn ? styles.closeBtn: styles.btn,
      styles[variant],
      className
    )}
    variant={variant || "custom"}
    justify="start"
    {...props}
  />
)

// EXPORT
export default MenuButton;
