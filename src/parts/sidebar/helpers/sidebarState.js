import React, { useCallback, useEffect, useMemo, useState } from 'react';

// DEPENDENCIES
import { camelCase } from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { TIMES } from 'globals.js';

// GLOBAL FUNCTIONS
import { sidebarActions } from 'actions.js';
import { doCallback } from 'functions.js';

// MAIN COMPONENT
export const sidebarState = Component => compose(
  connect(
    ({ sidebar }) => ({ sidebar }),
    { ...sidebarActions }
  ),
  withRouter
)(({
  onClose,
  // REDUX STATE
  sidebar,
  // REDUX DISPATCH
  toggle,
  close,
  // REACT ROUTER
  location,
  // REST
  ...props
}) => {

  // PROPS
  const {
    title,
    name = camelCase(title)
  } = props;

  // STATE
  const [ mounted, setMounted ] = useState(false);
  const [ show, setShow ] = useState(false);

  // PROPS
  const active = useMemo(
    () => !!sidebar[name],
    [name, sidebar]
  )

  // CALLBACKS
  const unMount = useCallback(
    () => {
      setMounted(false)
    },
    [setMounted]
  )
  const showSidebar = useCallback(
    () => {
      setShow(true)
    },
    [setShow]
  )

  // EFFECTS
  useEffect(
    () => {
      if (active && !mounted) {
        setMounted(true);
        clearTimeout(unMount, TIMES.transitionDuration);
        setTimeout(showSidebar, TIMES.transitionDuration);
        return () => clearTimeout(showSidebar, TIMES.transitionDuration);
      } else if (!active && show) {
        setShow(false);
        clearTimeout(showSidebar, TIMES.transitionDuration);
        setTimeout(unMount, TIMES.transitionDuration);
        return () => clearTimeout(unMount, TIMES.transitionDuration);
      };
    },
    [active, show, mounted, setMounted, setShow, showSidebar, unMount]
  )
  useEffect(
    () => {
      if (!mounted) doCallback(onClose)
    },
    [mounted, onClose]
  )
  useEffect(
    () => {
      close()
    },
    [close, location]
  )

  // RENDER
  return !mounted ? null : <Component show={show} {...props} />
})
