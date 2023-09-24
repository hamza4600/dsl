import React, { useCallback, useMemo, useState, useEffect } from 'react';

// DEPENDENCIES
import { compose } from 'redux';
import { connect } from 'react-redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// GLOBAL FUNCTIONS
import { sessionActions } from 'actions.js';
import { apiFetch } from 'functions.js';

// LOCAL COMPONENTS
import HeaderSelect from '../layout/HeaderSelect';

// STYLES
import styles from './dealershipSelect.module.scss';

// MAIN COMPONENT
const DealershipSelect = compose(
  connect(
    ({
      dealership,
      user
    }) => ({
      dealership,
      user
    }),
    { ...sessionActions }
  )
)(({
  // REDUX STATE
  dealership,
  user: {
    stores
  },
  // REDUX DISPATCH
  setStore
}) => {

  //STATE
  const [textLength, setTextLength] = useState()
  // MEMOS
  const options = useMemo(
    () => stores.map(({ dealer_name, make_dealer_id }) => ({
      label: dealer_name,
      value: make_dealer_id
    })),
    [stores]
  )
  // EFFECTS
  useEffect(() => {
    let node = document.getElementById('DealerShip')
    if (node?.value) setTextLength(node?.value?.length - 1)
  }, [])

  // CALLBACKS
  const handleSelect = useCallback(
    storeID => {
      apiFetch({
        method: 'POST',
        endpoint: ENDPOINTS.session.chooseStore,
        params: {
          make_dealer_id: storeID
        },
        onSuccess: setStore,
        loadingMessage: 'Changing dealership',
        successMessage: 'Dealerhsip changed.',
        errorMessage: 'Unable to change dealership.'
      })
      let node = document.getElementById('DealerShip')
      setTimeout(() => {
        setTextLength(node?.value.length - 1)
      }, 500)

    },
    [setStore]
  )

  // RENDER
  return options.length < 1 ? null : (
    <HeaderSelect
      className={styles.select}
      value={dealership}
      options={options}
      onSelect={handleSelect}
      append={{
        className: styles.caret,
        use: 'caret-down',
        size: 'lg'
      }}
      formGroup={{
        className: styles.formGroup
      }}
      label={{
        className: styles.label,
        label: 'Dealership',
        cols: {}
      }}
      inputGroup={{
        className: styles.inputGroup
      }}
      toggle={{
        input: {
          as: 'span'
        }
      }}
      id='DealerShip'
      htmlSize={textLength}
      dropdown={{maxHeight:350}}
    />
  )
})

// EXPORT
export default DealershipSelect;
