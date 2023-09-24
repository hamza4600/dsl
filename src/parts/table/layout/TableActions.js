import React, { useContext } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { isFunction } from 'lodash';

// GLOBAL CONTEXT
import { ListContext } from 'helpers/getListData';

// CORE COMPONENTS
import Button from 'core/tools/Button';

// LOCAL COMPONENTS
import TableCell from './TableCell';
import TableEntryCell from './TableEntryCell';

// STYLES
import styles from './tableActions.module.scss';

// MAIN COMPONENT
const TableActions = ({
  className,
  record = {},
  header,
  ...props
}) => {

  // CONTEXT
  const { actions = [] } = useContext(ListContext) || {};

  // RENDER
  return !Array.isArray(actions) || actions.length < 1 ? null : (
    <TableEntryCell
      className={clsx(
        styles.entryCell,
        styles[`width-${actions.length}`],
        className
      )}
      label={false}
      component={() => (
        <TableCell
          className={styles.cell}
        >
          {!header && actions.map(({
            className,
            to,
            onClick,
            ...action
          }, i) => (
            <Button.Link
              key={i}
              className={clsx(
                styles.button,
                className
              )}
              to={isFunction(to) ? to(record) : to}
              onClick={isFunction(onClick) ? e => onClick(e, record) : undefined}
              {...action}
            />
          ))}
        </TableCell>
      )}
      size="xs"
      {...props}
    />
  )
}

// EXPORT
export default TableActions;
