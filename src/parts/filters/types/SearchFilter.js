import React, {useCallback} from 'react';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';

// STYLES
//import styles from './searchFilter.module.scss';

// MAIN COMPONENT
const SearchFilter = ({
  onUpdate,
  ...props
}) => {

  // PROPS
  const { name } = props;

  //DEBOUNCE TO DELAY
  const debounce = (func, timeout = 600) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }
  const saveInput = (e) => {
    doCallback(onUpdate, e.target.name, e.target.value)
  }
  const processChange = debounce((e) => saveInput(e));

  // CALLBACKS
  const handleClear = useCallback(
    () => {
      doCallback(onUpdate, name, undefined)
    },
    [name, onUpdate]
  )

  // RENDER
  return (
    <Form.Control
      name="searchString"
      label="Keyword Search"
      placeholder="Search by keyword"
      onChange={processChange}
      onClear={handleClear}
      clearButton
      {...props}
    />
  )
}

// EXPORT
export default SearchFilter;
