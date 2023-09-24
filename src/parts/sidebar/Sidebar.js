import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { compose } from 'redux';

// HELPERS
import { sidebarState } from './helpers/sidebarState';

// CORE COMPONENTS
import Scrollbox from 'core/tools/scrollbox/Scrollbox';

// PARTS
import SidebarButton from './parts/SidebarButton';
import SidebarForm from './parts/SidebarForm';
import SidebarHeader from './parts/SidebarHeader';

// STYLES
import styles from './sidebar.module.scss';

// MAIN COMPONENT
const Sidebar = compose(
  sidebarState
)(({
  children,
  className,
  title,
  header = {},
  closeButton = {},
  show
}) => (
  <div
    className={clsx(
      styles.sidebar,
      show && styles.show,
      className
    )}
    data-show={show}
  >
    {header !== false &&
      <SidebarHeader
        title={title}
        closeButton={closeButton}
        {...header}
      />
    }
    <Scrollbox
      outerClassName={styles.outer}
      preventDefault
      stopPropagation
      scrollbar
      reset={!show}
      >
      <div className={styles.inner}>
        {children}
      </div>
    </Scrollbox>
  </div>
))

// CHILD PARTS
Sidebar.Button = SidebarButton;
Sidebar.Form   = SidebarForm

// EXPORT
export default Sidebar;
