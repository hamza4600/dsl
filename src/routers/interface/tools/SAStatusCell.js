import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL COMPONENTS
import Sprite from 'core/tools/Sprite';

// STYLES
import styles from './saStatusCell.module.scss';

const CODES = {
  good: {
    icon: 'success',
    className: 'text-success'
  },
  'in-question': {
    icon: 'help',
    className: 'text-danger'
  },
  save: {
    icon: 'save',
    className: 'text-primary'
  },
};

// MAIN COMPONENT
const SAStatusCell = ({ children, value = children, label }) =>
  CODES[value] ? (
    <div className={clsx('d-flex align-items-center', styles.value, value ==='save' && styles.cursor)}>
      <Sprite className={clsx('mr-1', CODES[value]?.className)} use={CODES[value]?.icon} />
      {label}
    </div>
  ) : null;

// EXPORT
export default SAStatusCell;
