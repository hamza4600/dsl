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
  Completed:{
     icon:'success',
    className:'text-success',
  },
  Waiting: {
    icon: 'waiting',
    className: 'text-success'
  }
};


// MAIN COMPONENT
const SAStatusCell = ({ children, value = children, label, columnKey }) =>  (
    <div className={clsx('d-flex align-items-center text-left p-2', styles.value)}>
      <Sprite className={clsx('mr-1 w-100', CODES[value]?.className || 'text-warning')} use={CODES[value]?.icon || 'warning'} />
      {label}
    </div>
  )

// EXPORT
export default SAStatusCell;
