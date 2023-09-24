import React, { useContext, useMemo } from 'react';

// DEPENDENCIES
import { useSelector } from 'react-redux';
import clsx from 'clsx';

// GLOBAL CONTEXT
import { ListContext } from 'helpers/getListData';

// GLOBAL COMPONENTS
import TableEntry from 'parts/table/layout/TableEntry';

// LOCAL COMPONENTS
import DailySalesEntryMobile from './DailySalesEntryMobile';

// STYLES
import styles from './dailySalesTable.module.scss';

// MAIN COMPONENT
/**
 *
 * @param {object} props
 * @param {*} [props.children]
 * @param {string} [props.className]
 * @param {object} [props.style]
 */
const DailySalesTable = ({
  children,
  className = '',
  style = {},
  showVehicleData
}) => {
  // REDUX SELECTORS
  const isMobile = useSelector(({ mobile }) => mobile.mobile);

  // CONTEXT
  const {
    result = [],
    preferences: {
      filters = {}
    },
    columns = []
  } = useContext(ListContext) || {};

  // MEMO
  const isEmpty = useMemo(
    () => !children && result.length < 1,
    [children, result]
  )

  const renderResults = () => {
    if (filters['newUsed'] === undefined) {
      return result.map(
        (record, index) => {
          const tableColumns = columns.map(
            element => element.key === 'add'
              ? {
                ...element,
                isNew: !!index ? 0 : 1,
                showResponse: showVehicleData
              }
              : { ...element }
          );

          return isMobile
            ? <DailySalesEntryMobile
              key={index}
              data={record}
              columns={tableColumns}
            />
            : <TableEntry
              key={index}
              columns={tableColumns}
              record={record}
              className={styles['table--cell']}
            />
        }
      )
    } else {
      const tableColumns = columns.map(
        element => element.key === 'add'
          ? {
            ...element,
            isNew: filters['newUsed'] === '1',
            showResponse: showVehicleData
          }
          : { ...element }
      );

      return isMobile
        ? <DailySalesEntryMobile
          data={result[filters['newUsed'] === '0' ? 1 : 0]}
          columns={tableColumns}
        />
        : <TableEntry
          columns={tableColumns}
          record={result[filters['newUsed'] === '0' ? 1 : 0]}
          className={styles['table--cell']}
        />
    }
  }

  // RENDER
  return (
    <div className={clsx(
      styles.table,
      styles.body,
      isEmpty && styles['table__empty'],
      className
    )}
      style={style}>
      {!!isEmpty
        ? <h4 className={styles.message}>No Records Found</h4>
        : <div className={styles['table--row']}>
          {children || renderResults()}
        </div>
      }
    </div>
  )
};


// EXPORT
export default DailySalesTable;
