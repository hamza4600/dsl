import React, { forwardRef } from 'react';

// CORE COMPONENTS
import Sprite from 'core/tools/Sprite';
import Tooltip from 'core/tools/Tooltip';

// STYLES
import styles from './infoButton.module.scss';

// LOCAL VARIABLES
const INFO = {
  charkey: (
    <div>
      <p>The character key must meet the following requirements:</p>
      <ul className={styles.list}>
        <li>Exactly 6 characters.</li>
        <li>All characters must be alphabetical.</li>
        <li>All characters must be capitalized.</li>
      </ul>
    </div>
  ),
  passkey: (
    <div>
      <p>The password must meet the following requirements:</p>
      <ul className={styles.list}>
        <li>Minimum 8 characters.</li>
        <li>At least one capitalized alphabetical character.</li>
        <li>At least one numerical character.</li>
        <li>At least one special character.</li>
      </ul>
    </div>
  )
}

// MAIN COMPONENT
export const infoButton = Component => {
  const WrappedComponent = ({
    type,
    schema,
    info = INFO[schema] || INFO[type],
    append,
    forwardedRef,
    ...props
  }) => (
    <Component
      {...props}
      type={type}
      schema={schema}
      append={info ? {
        children: (
          <Tooltip
            className={styles.tooltip}
            tip={info}
          >
            <Sprite
              as={false}
              id={`${props.name}-info`}
              className={styles.info}
              use="info"
              fill="primary-extra-light"
            />
          </Tooltip>
        )
      } : append}
      ref={forwardedRef}
    />
  )

  return forwardRef((props, ref) => <WrappedComponent {...props} forwardedRef={ref} />);
}
