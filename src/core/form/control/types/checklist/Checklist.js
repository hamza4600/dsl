import React, { useCallback, useEffect, useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { intersectionWith, isEqual } from 'lodash';
import { compose } from 'redux';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// LOCAL HELPERS
import { formikField } from '../../helpers/formik/formikField';
import { formCollapse } from '../../helpers/layout/formCollapse';
import { formGroup } from '../../helpers/layout/formGroup';
import { inputLabel } from '../../helpers/layout/inputLabel';
import { inputFeedback } from '../../helpers/layout/inputFeedback';
import { useHidden } from '../../helpers/layout/useHidden';
import { lookupOptions } from '../../helpers/options/lookupOptions';
import { optionsArray } from '../../helpers/options/optionsArray';
import { inputArray } from '../../helpers/state/inputArray';
import { inputState } from '../../helpers/state/inputState';
import { inputValidation } from '../../helpers/state/inputValidation';

// BOOTSTRAP COMPONENTS
import { Col, Row } from 'react-bootstrap';

// LOCAL COMPONENTS
import Checkbox from './parts/Checkbox';

// STYLES
import styles from './checklist.module.scss';

// MAIN COMPONENT
const Checklist = compose(
  lookupOptions,
  optionsArray,
  inputValidation,
  formikField,
  inputArray,
  inputState,
  useHidden,
  formCollapse,
  formGroup,
  inputLabel,
  inputFeedback
)(({
  className,
  type = 'checkbox',
  name,
  label = {},
  value,
  onBlur,
  onChange,
  options = [],
  useCSV,
  cols = {},
  size,
  column,
  inline,
  justify = 'between',
  fullWidth,
  wrapper: Wrapper = ({ children }) => <>{children}</>,
  checkFirst,
  disabled,
  required,
  debug,
  form: {
    setFieldValue,
    setFieldTouched
  } = {},
  ...props
}) => {

  // VALUE ARRAY
  const valueArray = useMemo(
    () => Array.isArray(value) ? value : value.toString().split(',').filter(v => v),
    [value]
  )

  // SORT VALUES
  useEffect(
    () => {
      if (!Array.isArray(options)) return;

      const sortedArray = intersectionWith(
        options.map(({ value }) => value),
        valueArray,
        (o, v) => o === v || String(o) === String(v)
      );

      if (!isEqual(valueArray, sortedArray))
        doCallback(setFieldValue, name, useCSV ? sortedArray.join(',') : sortedArray)
    },
    [name, options, useCSV, valueArray, setFieldValue]
  )

  // CHECK STATE
  const isChecked = useCallback(
    ({ value }) => valueArray.includes(value) || valueArray.includes(String(value)),
    [valueArray]
  )
  const handleChange = useCallback(
    e => {
      doCallback(setFieldTouched, name, true);
      doCallback(onChange, e);
    },
    [name, onChange, setFieldTouched]
  )

  // RENDER
  return (
    <div className={clsx(
      'checklist',
      styles.checklist,
      className
    )}>
      <Row className={clsx(
        'checklist-row',
        className,
        styles.row,
        styles[justify],
        inline && styles.inline,
        column && styles.column,
        fullWidth && styles.fullWidth
      )}>
        {options.map((option, i) => (
          <Col
            {...cols}
            {...option.cols}
            key={i}
            className={clsx(
              'checklist-col',
              styles.col,
              styles[size],
              option.hide && styles.hide
            )}
          >
            <Checkbox
              type={type}
              name={name}
              checked={isChecked(option)}
              onBlur={onBlur}
              onChange={handleChange}
              required={required}
              disabled={disabled}
              debug={debug}
              {...option}
            />
          </Col>
        ))}
      </Row>
    </div>
  )
})

// EXPORT
export default Checklist;
