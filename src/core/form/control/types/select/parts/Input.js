import React, { forwardRef, useCallback, useContext, useRef } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { PLACEHOLDERS } from 'defaults.js';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// GLOBAL HELPERS
import { numberFormat } from '../../../helpers/state/numberFormat';

// CONTEXT
import { DropdownContext } from 'core/tools/dropdown/helpers/dropdownContext';

// LOCAL COMPONENTS
import Input from '../../../parts/input/Input';

// STYLES
import styles from './input.module.scss';

// MAIN COMPONENT
const DropdownInput = compose(
  numberFormat,
  forwardRef
)(({
  className,
  name,
  value = '',
  label = PLACEHOLDERS.option,
  icon,
  append,
  onClick,
  onFocus,
  onBlur,
  onChange,
  onSelect,
  selection = {},
  allowCustom,
  showCustom = false,
  placeholder = allowCustom ? PLACEHOLDERS.customSelect : `${PLACEHOLDERS.select} ${label}`,
  form: {
    setFieldValue
  } = {},
  ...props
}, ref) => {

  // CONTEXT
  const { show, setShow } = useContext(DropdownContext) || {};

  // REFS
  const input = useRef();

  // CALLBACKS
  const handleClick = useCallback(
    e => {
      doCallback(onClick, e);
      doCallback(onBlur, e);
      doCallback(setShow, !show);
    },
    [onClick, onBlur, show, setShow]
  )
  const handleFocus = useCallback(
    e => {
      doCallback(onFocus, e);
      if (!allowCustom && input.current) {
        doCallback(setShow, !show);
        if (input.current instanceof HTMLElement) input.current.blur();
        return false;
      } else {
        doCallback(setShow, showCustom || !show);
      }
    },
    [onFocus, allowCustom, showCustom, show, setShow]
  )
  const handleBlur = useCallback(
    e => {
      doCallback(onBlur, e);
      if (allowCustom && e.target.value !== value) {
        doCallback(onSelect, e.target.value);
      }
    },
    [value, onBlur, onSelect, allowCustom]
  )
  const handleChange = useCallback(
    e => {
      if (allowCustom) doCallback(onChange, e);
      if (allowCustom) doCallback(setFieldValue, name, e.target.value);
      setShow(showCustom);
    },
    [name, onChange, allowCustom, showCustom, setShow, setFieldValue]
  )

  // RENDER
  return (
    <div ref={ref}>
      <Input
        className={clsx(
          styles.input,
          !allowCustom && styles.toggle,
          className
        )}
        id={name ? `dummy.${name}` : undefined}
        value={selection.label || value}
        placeholder={placeholder}
        append={Object.assign({
          use: icon,
          onClick: handleClick
        }, append)}
        inputGroup={{
          className: clsx(
            show && 'form-control-focus'
          )
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        autoComplete="off"
        useFeedback={false}
        ref={input}
        {...props}
      />
    </div>
)
})

// EXPORT
export default DropdownInput;
