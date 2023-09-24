import React, { useCallback, useEffect, useMemo, useState } from 'react';

// LOCAL COMPONENTS
import ConfirmationModal from './ConfirmationModal';

// STYLES
import styles from './sessionModal.module.scss';

// VARIABLES
const INTERVAL = 1000;

// MAIN COMPONENT
const SessionModal = ({
  body,
  cancelButton,
  continueButton,
  ...props
}) => {

  // COUNTDOWN CALCULATOR
  const calcCountdown = useCallback(
    time => Math.max(Math.ceil(time/INTERVAL), 0) * INTERVAL,
    []
  )

  // COUNTDOWN STATE
  const [ countdown, setCountdown ] = useState(calcCountdown(new Date(body).getTime() - new Date().getTime()));

  // COUNTDOWN INCREMENTOR
  const incrementCountdown = () => setCountdown(calcCountdown(countdown - INTERVAL));

  // SET/CLEAR INCREMENTOR
  useEffect(
    () => {
      const interval = setInterval(incrementCountdown, INTERVAL);

      return () => clearInterval(interval);
    }
  )

  // TIME STRING CONSTRUCTOR
  const timeString = useMemo(
    () => {

      const minutesRemaining = new Date(countdown).getMinutes();
      const secondsRemaining = new Date(countdown).getSeconds();

      const timeStrings = [];
      timeStrings.push(`${minutesRemaining}m`);
      timeStrings.push(`${secondsRemaining}s`);

      return timeStrings.join(' ');
    },
    [countdown]
  )

  return <ConfirmationModal
    {...props}
    graphic={<span className={styles.countDown}>{timeString}</span>}
    title="Do you want to continue your session?"
    body="For security reasons your session will time out unless you click continue."
    closeButton={false}
    cancelButton={{
      ...cancelButton,
      label: 'Log Out'
    }}
    continueButton={{
      ...continueButton
    }}
  />
}

// EXPORT
export default SessionModal;
