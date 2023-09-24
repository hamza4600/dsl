import React from 'react';
import { useHistory } from 'react-router-dom';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import Form from 'core/form/Form';
// GLOBAL METHODS
import { makePath } from 'functions';

// GLOBAL VARIABLES
import { INTERFACE } from 'pathnames';

// STYLES
import styles from './notFound.module.scss';

// MAIN COMPONENT
const NotFound = ({ stockNo, isNew }) => {
  const history = useHistory();

  return (
    <div className={styles.body}>
      <p className={styles.error}>There are no vehicles in your current inventory with Stock# {stockNo}</p>
      <Button.Add
        label={isNew ? 'Add New Inventory' : 'Add Pre-Owned Inventory'}
        type="submit"
        fullWidth={false}
        onClick={() => history.push({ pathname: makePath(INTERFACE.inventory, 'add'), search: `?new_used=${isNew}&stock_num=${stockNo}` })}
      />
    </div>
  );
};

// EXPORT
export default NotFound;
