import React, { forwardRef, createContext, useCallback, useEffect, useState } from 'react';

// DEPENDENCIES
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// CONTEXT
export const MenuContext = createContext(null);

// MAIN COMPONENT
export const menuContext = Component => compose(
  connect(
    ({ mobile }) => ({ mobile })
  ),
  withRouter,
  forwardRef
)(({
  // REDUX STATE
  mobile,
  // REACT ROUTER
  history,
  location,
  match,
  staticContext,
  //REST
  ...props
}, ref) => {

  // STATE
  const [ menuShow, setMenuShow ] = useState(!mobile.mobile)
  const [ menuCollapse, setMenuCollapse ] = useState(false)

  // CALLBACKS
  const toggleMenuShow = useCallback(
    (toggle = !menuShow) => {
      setMenuShow(toggle)
    },
    [menuShow, setMenuShow]
  )
  const toggleMenuCollapse = useCallback(
    (toggle = !menuCollapse) => {
      setMenuCollapse(toggle)
    },
    [menuCollapse, setMenuCollapse]
  )

  // EFFECTS
  useEffect(
    () => {
      if (mobile.mobile) setMenuCollapse(false);
      setMenuShow(!mobile.mobile)
    },
    [mobile.mobile, setMenuShow, setMenuCollapse]
  )
  useEffect(
    () => {
      setMenuShow(!mobile.mobile);
    },
    [mobile.mobile, setMenuShow]
  )
  useEffect(
    () => {
      setMenuShow(false);
    },
    [location.pathname, setMenuShow]
  )

  // RENDER
  return (
    <MenuContext.Provider value={{
      menuShow,
      toggleMenuShow,
      menuCollapse,
      toggleMenuCollapse
    }}>
      <Component {...props} ref={ref} />
    </MenuContext.Provider>
  )
})
