import React, { useState } from 'react';

import clsx from 'clsx';

// STYLES
import styles from './switchToggle.module.scss'

/**
 * 
 * @param {Object} props
 * @param {string} props.label
 * @param {boolean} props.active
 * @param {Function} props.onToggle
 */
// MAIN COMPONENT
const SwitchToggle = (props) => {
  const {
    label = "",
    active = false,
    onToggle = () => {},
  } = props;

  const [isChecked, setIsChecked] = useState(!!active);

  const toggleAction = () => {
    setIsChecked(prevState => !prevState);

    return onToggle();
  }

  // RENDER
  return <div className={styles.display}>
    <label className={styles.toggle}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={toggleAction}
        className={clsx(styles.label, styles['toggle--input'])}
      />
      <div className={styles['toggle--control']}></div>
      <span className={styles.label}>{label}</span>
    </label>
  </div>
};

// EXPORT
export default SwitchToggle
