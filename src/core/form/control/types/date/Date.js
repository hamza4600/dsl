import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { DATE } from 'defaults.js';

// HELPERS
import { dateProps } from './helpers/dateProps';
import { dateOptions } from './helpers/dateOptions';
import { handleSelect } from './helpers/handleSelect';
import { formikField } from '../../helpers/formik/formikField';
import { formCollapse } from '../../helpers/layout/formCollapse';
import { formGroup } from '../../helpers/layout/formGroup';
import { inputLabel } from '../../helpers/layout/inputLabel';
import { inputText } from '../../helpers/layout/inputText';
import { useHidden } from '../../helpers/layout/useHidden';
import { inputState } from '../../helpers/state/inputState';
import { inputValidation } from '../../helpers/state/inputValidation';

// LOCAL COMPONENTS
import DatePicker from './parts/DatePicker';
import Select from '../select/Select';
import Row from '../../../parts/Row';
import Group from '../../../parts/Group';

// STYLES
import styles from './date.module.scss';

// LOCAL VARIABES
const COLS = {
  inline: {
    xs: 'auto'
  },
  default: {
    xs: 12
  }
}

// MAIN COMPONENT
const Date = compose(
  inputValidation,
  formikField,
  inputState,
  useHidden,
  formCollapse,
  formGroup,
  inputLabel,
  inputText,
  dateOptions,
  dateProps,
  handleSelect
)(({
  className,
  name,
  option,
  selectOptions,
  onOptionSelect,
  currentDate,
  startDate,
  endDate,
  minDate,
  maxDate,
  onDateSelect,
  range,
  label = range ? 'Date Range' : 'Date',
  useOptions = DATE.useOptions,
  showPicker = !useOptions || option === 'custom',
  ...props
}) => {

  // PROPS
  const {
    inline,
    vertical,
    columns,
    fullWidth,
    Container = inline ? Group : Row
  } = props;

  // RENDER
  return (
    <Container
      className={clsx(
        styles.outer,
        className
      )}
    >
      {useOptions &&
        <Select
          className={styles.select}
          value={option}
          placeholder={`Choose ${label}`}
          onSelect={onOptionSelect}
          options={selectOptions}
          toggle={{
            input: {
              htmlSize: inline ? 12 : undefined
            }
          }}
          {...props}
        />
      }
      {showPicker && (<>
        {!range ? (
          <DatePicker
            append={useOptions ? false : undefined}
            currentDate={currentDate}
            minDate={minDate}
            maxDate={maxDate}
            onSelect={onDateSelect}
            name={name}
            formGroup={{
              cols: {
                xs: 24
              }
            }}
            {...props}
          />
        ) : (<>
          <DatePicker
            formGroup={{
              className: clsx(
                styles.rangePicker,
                inline && styles.inline,
                vertical && styles.vertical,
                columns && styles.columns,
                fullWidth && styles.fullWidth
              )
            }}
            prepend={{
              label: DATE.fromPrepend
            }}
            dropdown={{
              align: 'start'
            }}
            toggle={{
              icon: ''
            }}
            cols={inline ? COLS.inline : COLS.default}
            currentDate={startDate}
            startDate={startDate}
            endDate={endDate}
            minDate={minDate}
            maxDate={endDate || maxDate}
            onSelect={value => onDateSelect(value, 0)}
            {...props}
          />
          <DatePicker
            formGroup={{
              className: clsx(
                styles.rangePicker,
                inline && styles.inline,
                vertical && styles.vertical,
                columns && styles.columns,
                fullWidth && styles.fullWidth
              )
            }}
            prepend={{
              label: DATE.toPrepend
            }}
            toggle={{
              icon: ''
            }}
            cols={inline ? COLS.inline : COLS.default}
            currentDate={endDate}
            startDate={startDate}
            endDate={endDate}
            minDate={startDate || minDate}
            maxDate={maxDate}
            onSelect={value => onDateSelect(value, 1)}
            {...props}
          />
        </>)}
      </>)}
    </Container>
  )})

// EXPORT
export default Date;
