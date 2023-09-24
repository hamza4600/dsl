import React, { useCallback, useContext, useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { isEmpty } from 'lodash';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions';

// CONTEXT
import { ListContext } from 'helpers/getListData';

// REACT COMPONENTS
import { Badge } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// STYLES
import styles from './buttonFilter.module.scss';

// MAIN COMPONENT
const ButtonFilter = ({
  className,
  options,
  onUpdate,
  ...props
}) => {

  // CONTEXT
  const { data } = useContext(ListContext) || {};

  // CALLBACKS
  const handleClick = useCallback(
    (value, name) => doCallback(onUpdate, name, value),
    [onUpdate]
  )

  // MEMOS
  const buttons = useMemo(
    () => options.map(({ key, label, ...option }) => {

      const number = !isEmpty(data) ? data[key] : undefined;

      const children = (<>
        {label}
        {number !== undefined &&
          <Badge
            className={styles.badge}
            pill
          >{number}</Badge>
        }
        </>)

      return ({
        ...option,
        label: children
      })
    }),
    [options, data]
  )

  // RENDER
  return (
    <Form.Toggle
      {...props}
      className={clsx(
        styles.toggle,
        className
      )}
      options={buttons}
      onClick={handleClick}
    />
  )
}

// CHILD COMPONENTS
ButtonFilter.SalesType = props => (
  <ButtonFilter
    name="salesType"
    label="Sales Type"
    options={[
      {
        key:   'retail_records',
        label: 'Retail',
        value: 'R'
      },
      {
        key:   'wholesale_records',
        label: 'Wholesale',
        value: 'W'
      },
      {
        key:   'total_records',
        label: 'All',
        value: ''
      },
    ]}
    {...props}
  />
)
ButtonFilter.NewUsed = props => (
  <ButtonFilter
    name="newUsed"
    label="New/Used"
    options={[
      {
        key:   'new_records',
        label: 'New',
        value: '1'
      },
      {
        key:   'preowned_records',
        label: 'Pre-owned',
        value: '0'
      },
      {
        key:   'total_records',
        label: 'All',
        value: ''
      },
    ]}
    {...props}
  />
)


// EXPORT
export default ButtonFilter;
