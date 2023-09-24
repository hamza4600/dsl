import React from 'react';

// STYLES
import styles from './main.module.scss';

// MAIN COMPONENT
const Main = ({
  children
}) => <main className={styles.main}>{children}</main>;

export default Main;
