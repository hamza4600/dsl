import React from 'react';

// HOOKS
import { useHistory } from 'react-router-dom';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// LOCAL COMPONENTS
import ActionTab from '../ActionTab';

// STYLE
import styles from './styles.module.scss';

// MAIN COMPONENT
/**
 * 
 * @param {Object} props 
 * @param {string} props.stockNo
 * @param {string} props.year
 * @param {string} props.make
 * @param {string} props.model
 * @param {string} props.prevPath
 * @param {number} props.inventoryId
 * @param {number} props.commentsCount
 * @param {number} props.salesCount
 * @param {number} props.dealTasks2
 * @param {Function} props.onEditClick
 * @param {string} props.inventoryStatus
 * @param {Array} props.salesActivity
 */
const ViewTitle = (props) => {
  const {
    stockNo = '',
    year = '',
    make = '',
    model = '',
    inventoryId,
    onEditClick = () => { },
    inventoryStatus,
    salesActivity = [],
    prevPath='',
  } = props;

  // HOOKS
  const history = useHistory();

  const goBack = () => prevPath ? history.push(prevPath) : history.goBack();
  const handleEditClick = () => onEditClick();


  // RENDER
  return <div className={styles.container}>
    <div className={styles['container--left']}>
      <Button.Link
        variant="secondary"
        icon="chevron-left"
        onClick={goBack}
      />
      <div className={styles.title}>

        <h3>Vehicle Information</h3>
        <div className={styles['title--bottom']}>
          <div className={styles['label--container']}>
            <span className={styles['label--text']}>
              STK#{' '}
              <span className={styles['label--text--stock']}>{stockNo}</span>
              {` | ${year} ${make} ${model}`}
            </span>
          </div>
          <Button.Link icon="edit" label="Edit" onClick={handleEditClick} />
        </div>
      </div>
    </div>
    {!['O', 'F', 'B'].includes(inventoryStatus)
      && <ActionTab
        inventoryId={inventoryId}
        salesActivity={salesActivity}
      />}
  </div>;
};

// EXPORT
export default ViewTitle;