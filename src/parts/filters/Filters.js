import React, { Children, cloneElement, useCallback, useContext } from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions';

// CONTEXT
import { ListContext } from 'helpers/getListData';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Sidebar from 'parts/sidebar/Sidebar';

// LOCAL COMPONENTS
import ButtonFilter from './types/ButtonFilter';
import DateFilter from './types/DateFilter';
import SelectFilter from './types/SelectFilter';
import SortFilter from './types/SortFilter';
import SearchFilter from './types/SearchFilter';
import ResetFilters from './tools/ResetFilters'

// STYLES
import styles from './filters.module.scss';

// MAIN COMPONENT
const Filters = compose(
  connect(
    ({ mobile })=> ({ mobile })
  )
)(({
  children,
  // REDUX STATE
  mobile
}) => {

  // CONTEXT
  const {
    preferences: {
      filters,
      showColumns
    } = {},
    updateFilter
  } = useContext(ListContext) || {};

  // CALLBACKS
  const handleUpdate = useCallback(
    (name, value) => {
      updateFilter({
        [name]: value,
      })
    },
    [updateFilter]
  )
  const handleSubmit = useCallback(
    (values, args) => {
      const { onSuccess } = args;
      updateFilter({
        ...values
      })
      doCallback(onSuccess);
    }
  )

  // RENDER
  return !children ? null : !mobile.mobile ? (
    <Form
      className={styles.form}
      initialValues={{
        ...filters,
        showColumns
      }}
    >
      <Form.Body.Inline size="sm"
      >
        {Children.map(children, (child, i) => cloneElement(child, Object.assign({}, child.props, {
          key: i,
          label: undefined,
          onUpdate: handleUpdate
        })))}
      </Form.Body.Inline>
    </Form>
  ) : (<>
    <Sidebar.Button
      className="ml-auto"
      name="filters"
      icon="filters"
      outline
    />
    <Sidebar
      name="filters"
      title="Filter By"
    >
      <Sidebar.Form
        initialValues={{
          ...filters,
          showColumns
        }}
        onSubmit={handleSubmit}
      >
        {children} 
      </Sidebar.Form>
    </Sidebar>
  </>)
})

// CHILD COMPONENTS
Filters.Button        = ButtonFilter;
Filters.Select        = SelectFilter;
Filters.Date          = DateFilter;
Filters.Sort          = SortFilter;
Filters.Search        = SearchFilter;
Filters.Spacer        = () => <div className={styles.spacer}></div>;

// TOOLS
Filters.Reset         = ResetFilters;

// EXPORT
export default Filters;
