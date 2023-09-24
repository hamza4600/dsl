import React from 'react';

// REACT COMPONENTS
import clsx from 'clsx';
import { Badge } from 'react-bootstrap';


// STYLES
import styles from './countBadge.module.scss';

// MAIN COMPONENT
export default function CountBadge({ count, color, className }) {
  return (
    <Badge className={clsx(className || 'ml-auto', styles.badge)} variant={color} pill>
      {count || 0}
    </Badge>
  )
}
