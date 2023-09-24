import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL COMPONENTS
import Sprite from 'core/tools/Sprite';

// STYLES
import styles from './entryWithIcon.module.scss';

const EntryWIthIcon = ({ icon, size, iconName, isLast = false, ...props }) => (
  <div className={
    clsx(
      'd-flex flex-row align-items-center justify-content-center',
      styles.container,
      !isLast && styles['container__bordered']
    )
  }>
    <Sprite
      use={icon}
      className={styles.icon}
      size="sm"
    />
    <span className={clsx(styles.text, styles['text_secondary'])}>
      {iconName}
    </span>
    <span className={clsx(styles.text, styles['text_primary'])}>
      {props.children}
    </span>
  </div>
);

export default EntryWIthIcon