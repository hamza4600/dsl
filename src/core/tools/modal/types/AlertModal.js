import React, { useCallback, useEffect, useMemo, useRef } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { startCase } from 'lodash';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { TIMES } from 'globals.js';

// LOCAL HELPERS
import { modalLightbox } from '../helpers/modalLightbox';

// GLOBAL COMPONENTS
import Alert from 'core/tools/alert/Alert';

// STYLES
import styles from './alertModal.module.scss';

// MAIN COMPONENT
const AlertModal = compose(
  modalLightbox
)(({
  type,
  duration = TIMES.modalDuration,
  onClose,
  ...props
}) => {

  // REFS
  let timeout = useRef();

  // CALLBACKS
  const setModalTimer = useCallback(
    () => duration ? timeout.current = setTimeout(onClose, duration * 1000) : null,
    [duration, onClose]
  )
  const clearModalTimer = useCallback(
    () => duration ? clearTimeout(timeout.current) : null,
    [duration]
  )

  // EFFECTS
  useEffect(
    () => {
      setModalTimer();
      return clearModalTimer;
    },
    [setModalTimer, clearModalTimer]
  )

  // CHILD COMPONENT
  const Child = useMemo(
    () => Alert[startCase(type)] || Alert,
    [type]
  )

  // RENDER
  return (
    <div className={clsx(
      'modal-dialog', // Bootstrap Class
      'modal-dialog-centered', // Bootstrap Class
      styles.alert
    )}>
      <Child {...props} />
    </div>
  )
})

// EXPORT
export default AlertModal;
