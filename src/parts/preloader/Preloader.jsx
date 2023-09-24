import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { Spinner } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Sprite from 'core/tools/Sprite';

// STYLES
import styles from './preloader.module.scss';

export default function Preloader({ children, className, loading, useIcon, variant = 'gray-400' }) {
  return loading ? (
    <div className={clsx(styles.preloader, 'd-flex flex-column align-items-center justify-content-center w-100 text-muted', className)}>
      {useIcon ? (
        <>
          <Sprite
            use="clock"
            className={clsx(styles.icon, 'mx-auto mb-1')}
          />
          Loading...
        </>
      ) : (
        <Spinner animation="border" role="status" variant={variant} className={styles.spinner} />
      )}
    </div>
  ) : children;
}
