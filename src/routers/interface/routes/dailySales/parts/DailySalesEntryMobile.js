import React from 'react';

// GLOBAL COMPONENTS
import Sprite from 'core/tools/Sprite';

// LOCAL COMPONENTS
import DailySalesAdd from './DailySalesAdd';

// STYLES
import styles from './dailySalesEntryMobile.module.scss';

// MAIN COMPONENT
/**
 * 
 * @param {object} props 
 * @param {object} props.data
 * @param {object} props.columns
 */
const DailySalesEntryMobile = ({ data, columns }) => {
  const renderedCells = columns
    .slice(2)
    .map(({ key, icon, iconName }) => (
      <div key={key} className={styles.cell}>
        <div>
          <Sprite className={styles.icon} use={icon} size="sm" />
          <h5>{data[key]}</h5>
        </div>
        <span>{iconName}</span>
      </div>
    ));

  // RENDER
  return <div className={styles.container}>
    <div className={styles.head}>
      <div className={styles['head--start']}>
        <div className={styles.bullet}>
          <h2>{data.total}</h2>
        </div>
        <h3>{data['delivery_type']}</h3>
      </div>
      <div className={styles['head--end']}>
        <DailySalesAdd
          isNew={columns[1].isNew}
          showResponse={columns[1].showResponse}
        />
      </div>
    </div>
    <div className={styles.body}>
      {renderedCells}
    </div>
  </div >
};

// EXPORT
export default DailySalesEntryMobile;
