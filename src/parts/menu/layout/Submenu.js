import React, { Children, cloneElement, useCallback, useContext, useEffect, useMemo, useState } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { withRouter } from 'react-router';

// GLOBAL VARIABLES
import { INTERFACE } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js'

// CONTEXT
import { MenuContext } from '../helpers/menuContext';

// BOOTSTRAP COMPONENTS
import { Collapse } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Sprite from 'core/tools/Sprite';

// LOCAL COMPONENTS
import MenuItem from './MenuItem';
import SubmenuItem from './SubmenuItem';

// STYLES
import styles from './submenu.module.scss';

// MAIN COMPONENT
const Submenu = withRouter(({
  as: Parent = MenuItem,
  children,
  level = 0,
  route,
  pathnames = {},
  prefix = INTERFACE[route],
  disable,
  // ROUTER
  history,
  location,
  match,
  staticContext,
  // REST
  ...props
}) => {

  // ACCORDION CONTEXT
  const { menuShow, menuCollapse, toggleMenuCollapse } = useContext(MenuContext);

  // STATE
  const [ submenuShow, setSubmenuShow ] = useState(false)

  // MEMOS
  const isActive = useMemo(
    () => location.pathname.search(makePath(prefix)) === 0,
    [prefix, location.pathname]
  )

  // CALLBACKS
  const toggleShow = useCallback(
    (toggle = !submenuShow) => {
      setSubmenuShow(toggle);
      if (toggle) toggleMenuCollapse(false);
    },
    [submenuShow, setSubmenuShow, toggleMenuCollapse]
  )
  const handleClick = useCallback(
    e => {
      e.preventDefault();
      toggleShow();
    },
    [toggleShow]
  )

  // EFFECTS
  useEffect(
    () => {
      if (disable || !menuShow || menuCollapse) setSubmenuShow(false);
      else if (isActive) setSubmenuShow(true);
    },
    [disable, menuShow, menuCollapse, setSubmenuShow, isActive]
  )
  // RENDER
  return (
    <Parent
      {...props}
      className={clsx(
        'submenu-toggle-item',
        styles.toggle
      )}
      linkClassName={clsx(
        'submenu-toggle-link',
        styles.link,
        !!submenuShow && styles.toggled
      )}
      route={route}
      onClick={handleClick}
      after={[
        <Sprite
          className={styles.icon}
          use={submenuShow?"chevron-down":"chevron-right"}
          size="md"
        />
      ]}
    >
      <Collapse
        className={clsx(
          'submenu',
          `submenu-${level}`,
          styles[`level-${level}`],
          styles.submenu
        )}
        in={submenuShow}
      >
        <div>
          <div className={clsx(styles.list, props.last && styles.last)}>
            {Children.map(children, (child, i) => !child ? null : cloneElement(child, Object.assign({
              key: i,
              level: level + 1,
              href: child.props.href || makePath(prefix, pathnames[child.props.route]),
              disable: !submenuShow
            }, child.props)))}
          </div>
        </div>
      </Collapse>
    </Parent>
  )
})

// CHILD COMPONENTS
Submenu.Item = SubmenuItem;

// EXPORT
export default Submenu;
