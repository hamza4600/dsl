import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL COMPONENTS
import Tooltip from 'core/tools/Tooltip';

// REACT BOOTSTRAP
import { Badge } from 'react-bootstrap';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

// STYLES
import styles from './tasksBadge.module.scss';

// MAIN COMPONENT
const TasksBadge = ({ children: value, eventKey, ...props }) => {
  // Callbacks
  const onExpand = useAccordionToggle(eventKey);

  return (
    <Tooltip wrapperClassName={clsx('d-block', styles.tooltip)} tip={`${value || '0'} Tasks`}>
      <Badge
        className={clsx('d-flex align-items-center justify-content-center w-100 rounded-lg', styles.badge)}
        variant="accent"
        onClick={onExpand}
      >
        <div>{value}</div>
      </Badge>
    </Tooltip>
  );
};

// EXPORT
export default TasksBadge;
