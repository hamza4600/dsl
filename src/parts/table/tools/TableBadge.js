import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// REACT COMPONENTS
import { Badge } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Tooltip from 'core/tools/Tooltip';

// STYLES
import styles from './tableBadge.module.scss';

// MAIN COMPONENT
const TableBadge = ({
  children,
  as: Component = 'span',
  className,
  value = children,
  variant,
  badge,
  tip
}) => (
  <Tooltip
    wrapperClassName={styles.tooltip}
    variant={variant || badge}
    tip={tip}
  >
    {!badge ? (
      <Component className={className}>
        {value}
      </Component>
    ) : (
      <Badge
        className={clsx(
          'table-badge',
          styles.badge
        )}
        variant={badge}
      >
        <Component className={className}>
          {value}
        </Component>
      </Badge>
    )}
  </Tooltip>
)

// EXPORT
export default TableBadge;
