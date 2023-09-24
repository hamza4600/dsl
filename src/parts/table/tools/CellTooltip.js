import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL COMPONENTS
import Tooltip from 'core/tools/Tooltip';

// STYLES
import styles from './cellTooltip.module.scss';

// MAIN COMPONENT
const CellTooltip = ({
  children,
  className,
  code = {}
}) => (
  <Tooltip
    wrapperClassName={(clsx(
      'cell-tooltip',
      styles.wrapper,
      className
    ))}
    variant={code.variant || code.badge}
    tip={code.label}
  >
    {children}
  </Tooltip>
)

// EXPORT
export default CellTooltip;
