import React, { forwardRef, useEffect, useRef, useState } from 'react';

// BOOTSTRAP COMPONENTS
import FormControl from 'react-bootstrap/FormControl';

// STYLES
import styles from './inputFeedback.module.scss';

// MAIN COMPONENT
export const inputFeedback = Component => forwardRef(({
  useFeedback = true,
  error: controlledError,
  ...props
}, ref) => {

  // PROPS
  const {
    form: {
      submitCount,
      isSubmitting
    } = {},
    meta: {
      error,
      touched
    } = {}
  } = props;

  // STATE
  const [ showFeedback, setShow ] = useState(false);

  // REFS
  const prevCount = useRef(0);

  // EFFECTS
  useEffect(
    () => {
      setShow(!!controlledError);

      if (submitCount > prevCount.current) {
        if (isSubmitting) return; // Submission still in progress
        prevCount.current = submitCount;
        if (error && useFeedback) setShow(true);
      }
      if (!error && !controlledError) setShow(false);
    },
    [useFeedback, error, submitCount, prevCount, isSubmitting, setShow, controlledError]
  )

  // RENDER
  return (<>
    <Component
      {...props}
      hasError={!!showFeedback}
      validEntry={!(error || controlledError) && !!touched && useFeedback}
      ref={ref}
    />
    {!!showFeedback &&
      <div className={styles.wrapper}>
        <FormControl.Feedback className={styles.feedback} type="invalid">
          <span>{controlledError || error}</span>
        </FormControl.Feedback>
      </div>
    }
  </>)
})
