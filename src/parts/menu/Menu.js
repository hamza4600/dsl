import React, { useContext } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { compose } from 'redux';
import { connect } from 'react-redux';

// CONTEXT
import { MenuContext } from './helpers/menuContext';

// CORE COMPONENTS
import Scrollbox from 'core/tools/scrollbox/Scrollbox';

// LOCAL COMPONENTS
import MenuItem from './layout/MenuItem';
import SiteNav from './navs/SiteNav';
import UserNav from './navs/UserNav';
import CollapseToggle from './tools/CollapseToggle';
import Dealership from './tools/Dealership';

// STYLES
import styles from './menu.module.scss';
import { Collapse } from 'react-bootstrap';

// MAIN COMPONENT
const Menu = compose(
  connect(
    ({ mobile }) => ({ mobile })
  )
)(({
  // REDUX STATE
  mobile: {
    mobile
  }
}) => {

  // CONTEXT
  const { menuShow, menuCollapse, toggleMenuShow } = useContext(MenuContext) || {};

  // RENDER
  return (
    <div className={clsx(
      'main-menu',
      styles.menu,
      mobile ? styles.mobile : styles.desktop,
      !mobile && !!menuCollapse && 'menu-collapse',
      !mobile && !!menuCollapse && styles.collapse
    )}>
      <Collapse in={!mobile || menuShow}>
        <div>
          <Scrollbox
            outerClassName={styles.scrollboxOuter}
            innerClassName={styles.scrollboxInner}
            trayClassName={styles.scrollboxTray}
            preventDefault
          >
            {!!mobile && <>
              <div className={styles.header}>
                <MenuItem.Button
                  onClick={() => toggleMenuShow(false)}
                  label="Close menu"
                  icon="cancel"
                />
              </div>
              <Dealership />
            </>}
            <SiteNav lookup="menuCount" mobile={mobile?.mobile} />
            <div className={styles.footer}>
              {!!mobile ? (
                <UserNav />
              ) : (
                <CollapseToggle />
              )}
            </div>
          </Scrollbox>
        </div>
      </Collapse>
    </div>
  );
})

// EXPORT
export default Menu;
