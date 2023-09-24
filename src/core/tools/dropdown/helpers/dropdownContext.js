import React, { createContext, forwardRef, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';

// DEPENDENCIES
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { createPopper } from '@popperjs/core';

// GLOBAL VARIABLES
import { DROPDOWN } from 'defaults.js';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// STYLES
import styles from './dropdownContext.module.scss';

// CONTEXT
export const DropdownContext = createContext(null);

// FUNCTIONS
const isFixed = el => {
  let fixed = false;
  do { if (getComputedStyle(el).getPropertyValue('position') === 'fixed') fixed = true; el = el.offsetParent; } while (el);
  return fixed;
}
const getOffset = el => {
  let top = 0;
  do { top += el.offsetTop || 0; el = el.offsetParent; } while(el);
  return top;
};
const visibleStart = el => isFixed(el) ? 0 : window.pageYOffset;
const visibleEnd = el => window.innerHeight + visibleStart(el);
const getContainerHeight = el => isFixed(el) ? window.innerHeight : document.body.clientHeight;

// INIT/REDUCER
const INIT = {
  show: false,
  position: undefined,
  alignment: undefined,
  maxHeight: undefined
}
const reducer = (state, { type, ...action }) => {
  switch (type) {
    case 'setShow':
      const { show } = action;
      return {
        ...state,
        show
      }
    case 'setPlacement':
      const { position, alignment, maxHeight } = action;
      return {
        ...state,
        position,
        alignment,
        maxHeight
      }
    default:
      throw new Error();
  }
}

// MAIN COMPONENT
export const dropdownContext = Component => {
  return compose(
    withRouter,
    forwardRef
  )(({
    align = 'end',
    onShow,
    // ROUTER
    history,
    location,
    match,
    staticContext,
    // REST
    ...props
  }, ref) => {

    // PROPS
    const {
      useArrow = DROPDOWN.useArrow,
      margin = useArrow ? parseInt(styles.margin) * 2 + parseInt(styles.border) : parseInt(styles.margin) + parseInt(styles.border)
    } = props;

    // STATE
    const [ context, updateContext ] = useReducer(reducer, INIT);
    const [close, setClose] = useState(false)
    const { show } = context;

    // REFS
    const outerRef = useRef();
    const menuRef = useRef();
    const toggleRef = useRef();
    const popoverRef = useRef();

    // CALLBACKS
    const setShow = useCallback(
      show => {
        updateContext({
          type: 'setShow',
          show
        })
      },
      [updateContext]
    )
    const hideDropdown = useCallback(
      () => {
        setShow(false)
      },
      [setShow]
    )
    const clickLocator = useCallback(
      e => {
        if (outerRef.current && !outerRef.current.contains(e.target)) hideDropdown() // close dropdown when clicking outsie the box
      },
      [hideDropdown]
    )
    const keyListener = useCallback(
      e => {
        const keys = [9, 13, 27]; // [tab, return, escape]
        if (keys.indexOf(e.keyCode) > -1) hideDropdown(); // close dropdown on whitelisted key clicks
      },
      [hideDropdown]
    )
    const checkVisible = useCallback(
      () => {
        const el = outerRef.current;
        if (!el) return;
        if (visibleEnd(el) < getOffset(el)) hideDropdown(); // element is below visible window
        if (visibleStart(el) > getOffset(el) + el.offsetHeight) hideDropdown(); // element is above visible window
      },
      [outerRef, hideDropdown]
    )
    const setMaxHeight = useCallback(
      position => {
        const outer = outerRef.current;
        const menu = menuRef.current;
        if (!outer || !menu) return;
        return position === 'bottom' ? getContainerHeight(menu) - getOffset(outer) - outer.clientHeight - margin : getOffset(outer) - margin;
      },
      [margin, outerRef, menuRef]
    )

    // MEMOS
    const popperOptions = useMemo(
      () => ({
        placement: `bottom-${align}`,
        modifiers: [{
          name: 'topLogger',
          enabled: true,
          phase: 'main',
          fn({ state }) {
            const [ position, alignment ] = state.placement.split('-');
            updateContext({
              type: 'setPlacement',
              position,
              alignment,
              maxHeight: setMaxHeight(position)
            })
          }
        }]
      }),
      [align, setMaxHeight, updateContext]
    )

    // EFFECTS
    useEffect(
      () => {
        doCallback(onShow, show);
      },
      [show, onShow]
    )
    useEffect(
      () => {
        if (!toggleRef.current || !popoverRef.current) return;
        if (!close) createPopper(toggleRef.current, popoverRef.current, popperOptions) // initialize popper
        return () => setClose(true)
      },
      [toggleRef, popoverRef, popperOptions]
    )
    useEffect(
      () => {
        if (show) {
          window.addEventListener('click', clickLocator); // close on outisde click
          window.addEventListener('keyup', keyListener); // close on tab/return/escape
          //window.addEventListener('scroll', checkVisible); // check if dropdown is still visible
          window.addEventListener('resize', hideDropdown); // close dropdown when window resizes
          return () => {
            window.removeEventListener('click', clickLocator);
            window.removeEventListener('keyup', keyListener);
            //window.removeEventListener('scroll', checkVisible);
            window.removeEventListener('resize', hideDropdown);
          }
        }
      },
      [show, clickLocator, keyListener, checkVisible, hideDropdown]
    )
    useEffect(
      () => {
        hideDropdown(); // close dropdown on navigation
      },
      [hideDropdown, location.pathname]
    )

    // RENDER
    return (
      <DropdownContext.Provider value={{
        ...context,
        setShow,
        outerRef,
        menuRef,
        toggleRef,
        popoverRef
      }}>
        <div ref={outerRef}>
          <Component {...props} ref={ref} />
        </div>
      </DropdownContext.Provider>
    )
  })
}
