import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL VARIABLES
import { INTERFACE } from 'pathnames';

// GLOBAL FUNCTIONS
import { makePath } from 'functions';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './openDetailsCell.module.scss';

// MAIN COMPONENT
const OpenSalesCell = ({ className, children }) => {
  const [isHover, setHover] = useState(false);

  const hiddenRef = useRef(null);

  const tableEntry = useMemo(
    () => hiddenRef?.current?.closest('.cell'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hiddenRef?.current?.parentNode]
  );

  const checkRowHover = useCallback(() => {
    const hovered = tableEntry?.matches(':hover');
    if (hovered !== isHover) {
      setHover(hovered);
    }
  }, [tableEntry, isHover]);

  // EFFECTS
  useEffect(() => {
    window.addEventListener('mousemove', checkRowHover);
    return () => {
      window.removeEventListener('mousemove', checkRowHover);
    };
  }, [checkRowHover]);

  return (
    <div className={clsx('d-flex align-items-center', styles.cell, className)}>
      <span className={styles.hidden} ref={hiddenRef} />
      <Button.Link
        to={makePath(INTERFACE.amFinance, 'view', children)}
        className={clsx(styles.icon, isHover && styles.hovered)}
        icon={isHover ? 'folder-open' : 'folder'}
      />
    </div>
  );
};

// EXPORT
export default OpenSalesCell;
