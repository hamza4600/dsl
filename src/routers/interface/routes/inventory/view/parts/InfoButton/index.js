import React from 'react';

// GLOBAL COMPONENTS
import Sprite from 'core/tools/Sprite';

// STYLES
import styles from './styles.module.scss';

// MAIN COMPONENT
const InfoButton = (props) => {
  const { message = "DMS Sync Occurs every 3 hours." } = props;

  // RENDER
  return <div className={styles.tooltip}>
    <Sprite
      className={styles.info}
      use="info"
      fill="primary-extra-light"
    />

    <div className={styles.tooltiptext}>
      <span>{message}</span>
    </div>
  </div>;
}

// EXPORT
export default InfoButton;