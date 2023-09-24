import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// LOCAL COMPONENTS
import SidebarButton from './SidebarButton';

// STYLES
import styles from './sidebarHeader.module.scss';

// MAIN COMPONENT
const SidebarHeader = ({
  children,
  title,
  closeButton
}) => (
  <div className={styles.container}>
    {children || <>
      {!!title &&
        <h3 className={styles.title}>{title}</h3>
      }
      {closeButton !== false &&
        <div className={styles.tool}>
          <SidebarButton
            className={clsx(
              styles.button,
              styles.close
            )}
            variant="custom"
            icon="cancel"
            square
            {...closeButton}
          />
        </div>
    }
    </>}
  </div>
)

// EXPORT
export default SidebarHeader;
