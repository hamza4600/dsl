import React from 'react';
// BOOTSTRAP COMPONENTS
import clsx from 'clsx';
// STYLES
import styles from './assignmentCell.module.scss';

// MAIN COMPONENT
const AssignmentCell = ({ children, className}) => {
  let index = children.indexOf('M', children.indexOf(' ') + 1);
  let times = [children.substr(0, index + 1), children.substr(index + 1)]
  return (
    <div className={clsx('d-flex flex-wrap h-0', styles.top)}>
      {times.map((time, i) => (
        <label className={clsx('text-nowrap text-center w-100 pl-2', styles.time)} key={i}>
          {time === ' ' ? <></> : <div className='text-left'>{time}</div>}
        </label>
      ))}
    </div>
  );
};

// EXPORT
export default AssignmentCell;
