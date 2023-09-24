import React, { Children, cloneElement } from 'react';

// DEPENDENCIES
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './header.module.scss';

// MAIN COMPONENT
const Header = compose(
  withRouter
)(({
  title,
  backButton = true,
  backPathname,
  headerTools,
  rightItems = null,
  // REACT ROUTER
  history
}) => !title ? null : (
  <>
    <header className={styles.header}>
      {backButton &&
        <Button
          className={styles.backButton}
          variant="custom"
          icon="chevron-left"
          onClick={()=>backPathname ? history.push(backPathname) : history.goBack()}
        />
      }
      <div className={styles['title--container']}>
        <h3 className={styles.title}>{title}</h3>
        {Children.map(headerTools, (tool, i) =>
          tool
            ? cloneElement(tool, {
                key: i,
                className: 'mr-2'
              })
            : null
        )}
      </div>
      {rightItems}
    </header>
    
    <hr className={styles.divider} />
  </>
))

// EXPORT
export default Header;
