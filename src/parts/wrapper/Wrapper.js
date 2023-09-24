import React from 'react';

// DEPENDENCIES
import { compose } from 'redux';

// GLOBAL HELPERS
import { documentTitle } from 'helpers/documentTitle';
import { scrollToTop } from 'helpers/scrollToTop';

// GLOBAL HELPERS
import { menuContext } from 'parts/menu/helpers/menuContext';

// GLOBAL COMPONENTS
import Header from 'parts/header/Header';
import Menu from 'parts/menu/Menu';

// STYLES
import styles from './wrapper.module.scss';

// MAIN COMPONENT
const Wrapper = compose(
  documentTitle,
  scrollToTop,
  menuContext
)(({
  children
}) => (
  <div className={styles.page}>
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <Menu />
        {children}
      </div>
    </div>
  </div>
))

export default Wrapper;
