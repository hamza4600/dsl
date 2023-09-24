import React, { useContext, useMemo } from 'react';

// GLOBAL VARIABLES
import { SORT_ORDER } from 'globals.js';

// LOCAL COMPONENTS
import FilterButton from './FilterButton';
import SelectFilter from './SelectFilter';

// CONTEXT
import { ListContext } from 'helpers/getListData';

// STYLES
import styles from './sortFilter.module.scss';

// MAIN COMPONENT
const SortFilter = props => {

  // CONTEXT
  const {
    preferences: {
      filters: {
        sort,
        order
      } = {},
      showColumns = []
    },
    columns = []
  } = useContext(ListContext) || {};

  // MEMOS
  const options = useMemo(
    () => columns.map(({
      key,
      sortable = true,
      sortKey = sortable ? key : undefined,
      name,
      label = name
    }) =>!sortable || !showColumns.includes(key) ? undefined : {
      label,
      value: sortKey
    }).filter(Boolean),
    [columns, showColumns]
  );

  // RETURN
  return options.length < 1 ? null : (
    <>
      <SelectFilter
        className={styles.select} //
        name="sort"
        options={options}
        placeholder="Sort By"
        useBlank
        {...props}
      />
      <FilterButton
        className={styles.button} //
        name="order"
        value={order === SORT_ORDER.ascending ? SORT_ORDER.descending : SORT_ORDER.ascending}
        icon={order === SORT_ORDER.ascending ? 'arrow-up' : 'arrow-down'}
        disabled={!sort}
      />
    </>
  );
};

// EXPORT
export default SortFilter;
