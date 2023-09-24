import React, { useCallback, useContext, useMemo } from 'react';

// DEPENDENCIES
import { useFormikContext } from 'formik';
import { connect } from 'react-redux';
import { compose } from 'redux';

// CONTEXT
import { ListContext } from 'helpers/getListData';

// GLOBAL COMPONENTS
import Dropdown from 'core/tools/dropdown/Dropdown';
import Form from 'core/form/Form'

// STYLES
import styles from './columnsFilter.module.scss';

// MAIN COMPONENT
const ColumnsFilter = compose(
  connect(
    ({ mobile })=> ({ mobile })
  )
)(({
  size='sm',
  // REDUX STATE
  mobile
}) => {

  // FORMIK
  const {
    values: {
      optionsFilter = ''
    }
  } = useFormikContext() || {};

  // CONTEXT
  const {
    columns = [],
    updateColumns
  } = useContext(ListContext) || {};

  // MEMOS
  const options = useMemo(
    () => columns.map(({ key, name, label = name }) => ({
      label: label,
      value: key,
      hide: label.toLowerCase().search(optionsFilter.toLowerCase()) < 0
    })),
    [columns, optionsFilter]
  )

  // CALLBACKS
  const handleValueChange = useCallback(
    ({ value }) => {
      updateColumns(value)
    },
    [updateColumns]
  )

  // RENDER
  return !!mobile.mobile ? null : (
    <Form.Col
      cols={{
        xs: 'auto'
      }}
    >
      <Dropdown
        toggle={{
          label: 'Columns',
          size,
          outline: true
        }}
      >
        <div className={styles.inner}>
          <Form.Body.Vertical>
            <Form.Control
              name="optionsFilter"
              placeholder="search"
              append={{
                use: 'search'
              }}
              size="sm"
            />
            <Form.Checklist
              name="showColumns"
              options={options}
              onValueChange={handleValueChange}
              column
            />
          </Form.Body.Vertical>
        </div>
      </Dropdown>
    </Form.Col>
  )
})

// EXPORT
export default ColumnsFilter;
