import React, { useMemo, useState } from 'react';

// DEPENDENCIES
import _ from 'lodash';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { compose } from 'redux';

// LOCAL HELPERS
import { formGroup } from '../helpers/layout/formGroup';
import { inputLabel } from '../helpers/layout/inputLabel';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import Checklist from './checklist/Checklist';
import Checkbox from './checklist/parts/Checkbox';

// BOOTSTRAP COMPONENTS
import { Row } from 'react-bootstrap';

// STYLES
import styles from './multipleChoice.module.scss';

// MAIN COMPONENT
const Multiple = compose(
  connect(
    ({ lookups }) => ({ lookups }),
  ),
  formGroup,
  inputLabel
)(({
  className,
  label,
  lookups,
  ...props
}) => {
  const { lookup } = props;

  const options = useMemo(
    () => !_.isEmpty(lookups[lookup]) ? lookups[lookup] : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lookup, _.isEmpty(lookups[lookup])]
  );

  const [state, setState] = useState({
    selectedAll: false,
    selectedOptions: []
  });

  const onSelectAllChange = (e) => {
    const selectedAll = e.target.checked;
    const selectedOptions = selectedAll ? options.map(m => m.value) : []

    setState({
      selectedAll,
      selectedOptions
    })
  }

  const onOptionChange = (e) => {
    let _selectedOptions = [];
    if (e.target.checked) {
      _selectedOptions = [...state.selectedOptions, e.target.value];
    } else {
      _selectedOptions = state.selectedOptions.filter(m => String(m) !== e.target.value);
    }

    setState({
      selectedOptions: _selectedOptions,
      selectedAll: options.length === _selectedOptions.length,
    })
  }

  return (
    <Row className={clsx(
      className,
      styles.checkboxes
    )}>
      {options.length ? (
        <Form.Group>
          <Checkbox
            className={styles.selectAll}
            label='Select/Deselect All'
            checked={state.selectedAll}
            onChange={onSelectAllChange}
          />
        </Form.Group>
      ) : null}

      <Checklist
        className={clsx(
          styles.options,
          className
        )}
        options={options}
        value={state.selectedOptions}
        onChange={onOptionChange}
        useFormik={false}
        {...props}
      />
    </Row>
  )
})

// EXPORT
export default Multiple;
