import React, { useMemo } from 'react';

// DEPENDENCIES
import compact from 'lodash/compact';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// STYLE
import styles from './headerData.module.scss';

// MAIN COMPONENT
const HeaderData = ({ stockNo, year, make, model, onEditClick }) => {
  const handleEditClick = () => onEditClick();

  const details = useMemo(() => {
    return !!compact([year, make, model]).length;
  }, [year, make, model]);

  // RENDER
  return stockNo && details ? (
    <div className={styles.title}>
      <div className={styles.label}>
        <span className={styles.text}>
          STK# <span className={styles.stock}>{stockNo || '--'}</span>
          {details ? ` | ${year} ${make} ${model}` : null}
        </span>
      </div>
      {onEditClick
        ? <Button.Link icon="edit" label="Edit" onClick={handleEditClick} />
        : null
      }
    </div>
  ) : null;
};

// EXPORT
export default HeaderData;
