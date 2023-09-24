import React, { useCallback, useContext, useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL VARIABLES
import { SORT_ORDER } from 'globals.js';

// CONTEXT
import { ListContext } from 'helpers/getListData';

// GLOBAL COMPONENTS
import Sprite from 'core/tools/Sprite';

// STYLES
import styles from './sortButton.module.scss';

// MAIN COMPONENT
const SortButton = ({ children, as: Component = 'span', className, sortable = true, sortKey, ...props }) => {
  // CONTEXT
  const {
    preferences: {
      filters: {
        sort,
        order
      } = {},
    },
    updateFilter
  } = useContext(ListContext) || {};

  // MEMOS
  const dataActive = useMemo(
    () => sortKey === sort, //
    [sortKey, sort]
  );
  const dataOrder = useMemo(
    () => (dataActive ? order : undefined), //
    [dataActive, order]
  );

  // CALLBACKS
  const handleClick = useCallback(
    sortKey => {
      updateFilter({
        sort: sortKey,
        order: order === SORT_ORDER.ascending ? SORT_ORDER.descending : SORT_ORDER.ascending
      });
    },
    [order, updateFilter]
  );

  return !sortKey || !sortable ? (
    <Component className={className}>{children}</Component>
  ) : (
    <button
      className={clsx('sort-button', styles.sortButton)}
      onClick={() => handleClick(sortKey)}
      data-active={dataActive}
      data-order={dataOrder}
    >
      <Component className={className} {...props}>
        {children}
        <div className={styles.sortToggle}>
          <Sprite className={clsx(styles.sprite, styles.asc)} use="toggle-up" size="lg" />
          <Sprite className={clsx(styles.sprite, styles.desc)} use="toggle-down" size="lg" />
        </div>
      </Component>
    </button>
  );
};

// EXPORT
export default SortButton;
