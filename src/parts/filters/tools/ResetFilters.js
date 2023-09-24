import React, { useContext, useCallback } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import _ from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';

// CONTEXT
import { ListContext } from 'helpers/getListData';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import Form from 'core/form/Form';

// STYLES
import styles from './resetFilters.module.scss';

// MAIN COMPONENT
const ResetFilters = compose(
  connect(
    ({ mobile })=> ({ mobile })
  )
)(({
  className,
  // REACT STATE
  mobile
}) => {

  // CONTEXT
  const {
    preferences: {
      filters
    },
    updateFilters
  } = useContext(ListContext) || {};

  // CALLBACK
  const onResetFilters = useCallback(
    () => {
      if (!_.isEmpty(filters)) {
        updateFilters({})
      }
    },
    [filters, updateFilters]
  );

  // RENDER
  return (
    <Form.Col cols={{ xs: 'auto' }}>
      <Button
        className={clsx(
          'button-filter',
          styles.button,
          className
        )}
        icon='cancel'
        onClick={onResetFilters}
        size={!mobile.mobile ? 'sm' : undefined}
      />
    </Form.Col>
  )
})

// EXPORT
export default ResetFilters;
