import React, { forwardRef, useEffect, useState } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { isEmpty } from 'lodash';
import { compose } from 'redux';

// GLOBAL FUNCTIONS
import { bugLog } from 'functions.js';

// HELPERS
import { getLookupData } from 'helpers/getLookupData';

// CORE COMPONENTS
import Sprite from 'core/tools/Sprite';

// STYLES
import styles from './lookupOptions.module.scss';

// MAIN COMPONENT
export const lookupOptions = Component => compose(
  getLookupData(),
  forwardRef
)(({
  options,
  optionKeys,
  lookupData,
  // REST
  ...props
}, ref) => {

  // PROPS
  const {
    children,
    name,
    lookup,
    debug
  } = props;

  // STATE
  const [ state, setState ] = useState(lookup || children ? undefined : options || new Error());

  // EFFECTS
  useEffect(
    () => {
      if (lookupData instanceof Error) {
        setState(new Error())
      } else if (Array.isArray(lookupData)) {
        if (isEmpty(lookupData)) {
          setState(new Error())
        } else if (!optionKeys) {
          setState(lookupData)
        } else {
          setState(lookupData.map(({
            [optionKeys.label]: label,
            [optionKeys.value]: value
          }) => ({
            label,
            value
          })))
        }
      }
    },
    [lookupData, optionKeys]
  )
  useEffect(
    () => {
      if (lookup) return;
      setState(options);
    },
    [lookup, options, setState]
  )
  useEffect(
    () => {
      bugLog(state, debug, name);
    },
    [name, state, debug]
  )

  // RENDER
  return state instanceof Error ? (
    <div className={clsx(
      styles.warning,
      styles[props.size]
    )}>
      <Sprite className={styles.sprite} as={false} use="warning" fill="danger" />
      <span className="text-danger">Unable to load</span>
    </div>
  ) : lookup && !state ? (
    <div className={clsx(
      styles.warning,
      styles[props.size]
    )}>
      <Sprite.Loader className={styles.sprite} />
      <span className="loading text-muted font-italic">Loading</span>
    </div>
  ) : <Component
    {...props}
    options={state}
    ref={ref}
  />
})
