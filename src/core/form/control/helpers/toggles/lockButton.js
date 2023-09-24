import React, { forwardRef, useCallback } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL VARIABLES
import { APPEND } from 'defaults.js';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// CORE COMPONENTS
import Sprite from 'core/tools/Sprite';
import Tooltip from 'core/tools/Tooltip';

// STYLES
import styles from './lockButton.module.scss';

// MAIN COMPONENT
export const lockButton = Component => forwardRef(({
  lockButton: name,
  onLock,
  append,
  ...props
}, ref) => {

  // PROPS
  const {
    form: {
      values: {
        [name]: value = false
      } = {},
      setFieldValue,
      setFieldTouched
    } = {}
  } = props;

  // CALLBACKS
  const handleClick = useCallback(
    () => {
      doCallback(onLock);
      doCallback(setFieldTouched, name, true);
      doCallback(setFieldValue, name, !value);
    },
    [name, value, onLock, setFieldValue, setFieldTouched]
  )

  // RENDER
  return (
    <Component
      {...props}
      append={name ? {
        children: (
          <Tooltip
            className={styles.tooltip}
            tip={'Lock value.'}
          >
            <Sprite
              className={clsx(
                styles.lock,
                value && styles.locked
              )}
              use={value ? APPEND.lockButton.use.locked : APPEND.lockButton.use.unlocked}
            />
          </Tooltip>
        ),
        className: styles.toggle,
        onClick: handleClick
      } : append}
      ref={ref}
    />
  )
})
