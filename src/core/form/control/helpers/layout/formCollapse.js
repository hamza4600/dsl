import React, { forwardRef } from 'react';

// BOOTSTRAP COMPONENTS
import { Collapse } from 'react-bootstrap';

// STYLES
import styles from './formCollapse.module.scss';

// MAIN COMPONENT
export const formCollapse = Component => forwardRef(({
  collapse,
  ...props
}, ref) => collapse === undefined ? <Component {...props} ref={ref} /> : (
  <Collapse in={!collapse}>
    <div className={styles.container}>
      <Component {...props} ref={ref} />
    </div>
  </Collapse>
))
