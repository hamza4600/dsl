import React, { useCallback, useContext, useState } from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { compose } from 'redux';

// CONTEXT
import { ListContext } from 'helpers/getListData';

// GLOBAL COMPONENTS
import Dropdown from 'core/tools/dropdown/Dropdown';
import Form from 'core/form/Form'

// STYLES
import styles from './columnsFilter.module.scss';

// FORM COMPONENT
const ColumnsForm = ({
  size
}) => {

  // CONTEXT
  const {
    columns,
    updateContext
  } = useContext(ListContext) || {};

  // STATE
  const [ filter, setFilter ] = useState('');

  // CALLBACKS
  const handleSearch = useCallback(
    ({ target }) => {
      setFilter(target.value)
    },
    [setFilter]
  )
  const handleCheck = useCallback(
    key => {
      updateContext({
        type: 'toggleColumn',
        key
      })
    },
    [updateContext]
  )

  // RENDER
  return(
    <Form>
      <Form.Row>
        <Form.Control
          name="searchFilter"
          placeholder="search"
          append={{
            use: 'search'
          }}
          onChange={handleSearch}
          size={size}
          formGroup={{
            className: styles.search
          }}
        />
      </Form.Row>
      {columns.filter(({ label = '' }) => label.toLowerCase().search(filter.toLowerCase()) >= 0).map(({
        key,
        name,
        label = name,
        hidden
      }, i) => (
        <div
          key={i}
          className={styles.item}
        >
          <Form.Checkbox
            label={label}
            checked={!hidden}
            onChange={() => handleCheck(key)}
          />
        </div>
      ))}
    </Form>
  )
}

// MAIN COMPONENT
const ColumnsFilter = compose(
  connect(
    ({ mobile })=> ({ mobile })
  )
)(({
  mobile,
  size = mobile.mobile ? 'sm' : undefined
}) => mobile.mobile ? (<>
    <h4 className={styles.header}>Columns</h4>
    <ColumnsForm />
  </>) : (
  <Dropdown.Toggle
    label="Columns"
    size={size}
  >
    <div className={styles.container}>
      <ColumnsForm
        size={size}
      />
    </div>
  </Dropdown.Toggle>
))

// EXPORT
export default ColumnsFilter;
