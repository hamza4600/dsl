import React, { useCallback, useContext, useEffect, useReducer, useRef } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL CONTEXT
import { ListContext } from 'helpers/getListData';

// GLOBAL COMPONENTS
import Scrollbox from 'core/tools/scrollbox/Scrollbox';

// STYLES
import styles from './tableScrollbox.module.scss';

// REDUCER
const initalArg = {
  position: {
    start: true,
    end: true
  }
}
const reducer = (state, action = {}) => {
  return {
    ...state,
    ...action
  }
}

// MAIN COMPONENT
const TableScrollbox = compose(
  connect(
    ({ mobile })=> ({ mobile })
  )
)(({
  children,
  className,
  direction='multi',
  // REDUX STATE
  mobile
}) => {

  // CONTEXT
  const {
    settings: {
      pageIndex
    } = {},
    preferences: {
      showColumns
    } = {},
    columns,
    actions,
    result = [],
    updateContext
  } = useContext(ListContext) || {};

  // STATE
  const [ style, updateStyle ] = useReducer(reducer, initalArg);
  const { minWidth, position = {} } = style;

  // REFS
  const outerContainer = useRef();

  // CALLBACKS
  const handleScroll = useCallback(
    (scrollState = {}) => {
      const { range: [ rangeX, rangeY ] = [], scroll: [ scrollX, scrollY ] = [] } = scrollState;

      updateStyle({
        position: {
          start: scrollX === 0, // if at scroll start
          end: scrollX === rangeX // if at scroll end
        }
      })
      if (scrollY === rangeY && rangeY !== 0) {
        updateContext({
          type: 'paginate',
        })
      }
    },
    [updateContext, updateStyle]
  )

  // EFFECTS
  useEffect(
    () => {
      if (!Array.isArray(columns) || !Array.isArray(showColumns)) return;

      const numberWidth = parseFloat(styles.xs);
      const actionsWidth = Array.isArray(actions) ? parseFloat(styles.xs) * actions.length : 0;
      const minWidth = showColumns.reduce((total, columnKey) => {
        const { size = 'xs' } = columns.find(column => column.key === columnKey) || {};
        return total + (parseFloat(styles[size])) || 0;
      }, numberWidth + actionsWidth); // establish minimum width based on total flex-bases of all columns

      updateStyle({
        minWidth,
        position: {
          start: true,
          end: minWidth <= outerContainer.current.offsetWidth
        }
      })
    },
    [columns, actions, showColumns, outerContainer, updateStyle]
  )

  // RENDER
  return (
    <div
      className={clsx(
        'table-scrollbox',
        styles.container,
        position.start && styles.start,
        position.end && styles.end,
        className
      )}
      ref={outerContainer}
    >
      {result.length < 1 ? (
        <div className={styles.empty}>
          {children}
        </div>
      ) : (
        <Scrollbox
          outerClassName={styles.outer}
          direction={direction}
          scrollbar
          onScroll={handleScroll}
          reset={pageIndex === 0}
          disabled={mobile.mobile}
        >
          <div
            className={styles.contents}
            style={{
              minWidth: mobile.mobile ? 0 : minWidth
            }}
          >
            {children}
          </div>
        </Scrollbox>
      )}
    </div>
  )
})

// EXPORT
export default TableScrollbox;
