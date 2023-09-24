import React, { Children, cloneElement, forwardRef } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { compose } from 'redux';

// LOCAL HELPERS
import { optionsFilter } from './helpers/optionsFilter';
import { handleSelect } from './helpers/handleSelect';

import { formikField } from '../../helpers/formik/formikField';
import { formCollapse } from '../../helpers/layout/formCollapse';
import { formGroup } from '../../helpers/layout/formGroup';
import { inputLabel } from '../../helpers/layout/inputLabel';
import { inputAppend } from '../../helpers/layout/inputAppend';
import { inputText } from '../../helpers/layout/inputText';
import { inputFeedback } from '../../helpers/layout/inputFeedback';
import { useHidden } from '../../helpers/layout/useHidden';
import { blankOption } from '../../helpers/options/blankOption';
import { defaultOption } from '../../helpers/options/defaultOption';
import { lookupOptions } from '../../helpers/options/lookupOptions';
import { optionsArray } from '../../helpers/options/optionsArray';
import { optionsMapper } from '../../helpers/options/optionsMapper';
import { selectedOption } from '../../helpers/options/selectedOption';
import { inputState } from '../../helpers/state/inputState';
import { inputValidation } from '../../helpers/state/inputValidation';

// GLOBAL COMPONENTS
import Dropdown from 'core/tools/dropdown/Dropdown';
import Sprite from 'core/tools/Sprite';

// LOCAL COMPONENTS
import Input from './parts/Input';
import Item from './parts/Item';

// STYLES
import styles from './select.module.scss';

// MAIN COMPONENT
const Select = compose(
  inputValidation,
  formikField,
  inputState,
  useHidden,
  formCollapse,
  formGroup,
  inputLabel,
  inputFeedback,
  inputAppend,
  inputText,
  lookupOptions,
  optionsArray,
  optionsMapper,
  blankOption,
  optionsFilter,
  handleSelect,
  selectedOption,
  defaultOption,
  forwardRef
)(({
  children,
  className,
  plaintext,
  options,
  onToggle,
  useDropdown = !plaintext && (Array.isArray(options) || !!children),
  toggle = {},
  dropdown = {},
  ...props
}, ref) => (
  <div
    className={clsx(
      'select-group',
      styles.container,
      props.show && styles.show,
      props.show && 'show',
      className
    )}
  >
    {useDropdown ? (
      <Dropdown
        toggle={{
          as: Input,
          ...toggle,
          ...props
        }}
        size={props.size}
        onToggle={onToggle}
        align="end"
        fullWidth
        {...dropdown}
      >
        {Array.isArray(options) && !!options.length &&
          <div className={styles.items}>
            {options.map((option, i) => (
              <Item
                key={i}
                option={option}
                {...props}
              />
            ))}
          </div>
        }
        {Children.map(children, (child, i) => cloneElement(child, {
          ...props
        }))}
      </Dropdown>
    ) : (
      <Input
        append={!options ? {
          children: <Sprite.Loader />
        } : options instanceof Error ? {
          use: 'warning',
          fill: 'danger'
        } : {}}
        plaintext={plaintext}
        disabled={!useDropdown}
        useDropdown={useDropdown}
        ref={ref}
        {...props}
      />

    )}
  </div>
))

// EXPORT
export default Select;
