import React from 'react';

// CORE COMPONENTS
import Sprite from 'core/tools/Sprite';

// PARTS
import DealershipSelect from 'parts/header/parts/DealershipSelect';

// STYLES
import styles from './dealership.module.scss';
import itemStyles from '../layout/menuItem.module.scss';

// MAIN COMPONENT
const Dealership = () => (
  <div className={styles.dealerShip}>
    <Sprite className={itemStyles.icon} use="car" size="md" />
    <DealershipSelect />
  </div>
)

// EXPORT
export default Dealership;
