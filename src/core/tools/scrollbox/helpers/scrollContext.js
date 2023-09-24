import React, { createContext, forwardRef, useEffect, useMemo, useReducer } from 'react';

// DEPENDENCIES
import { isEqual } from 'lodash';
import { compose } from 'redux';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// CONTEXT EXPORT
export const ScrollContext = createContext(null);

// LOCAL VARIABLES
const INIT = [0, 0];

// LOCAL FUNCTIONS
const checkCoord = (coord, range) => Math.min(0, Math.max(coord, range));

// INIT/REDUCER
const init = coords => ({
  range: coords,
  scroll: coords
})
const reducer = (state, { type, ...action }) => {

  let scroll = INIT;

  switch (type) {
    case 'setRange':
      const { range = INIT } = action;

      // if no change in range, do nothing
      if (isEqual(range, state.range)) return state;

      // check to see if scroll exceeds new range
      scroll = state.scroll.map((coord, i) => checkCoord(coord, range[i]));

      return {
        range,
        scroll
      }
    case 'initScroll':
      return {
        ...state,
        scroll
      }
    case 'updateScroll':
      const { delta = INIT } = action;

      // check to see if scroll exceeds range
      scroll = state.scroll.map((coord, i) => checkCoord(coord - delta[i], state.range[i]));

      // if no change in scroll, do nothing
      if (isEqual(scroll, state.scroll)) return state;

      const newState = {
        ...state,
        scroll
      };
      doCallback(action.onUpdate);
      return newState;
    default:
      throw new Error();
  }
}

// MAIN COMPONENT
export const scrollContext = Component => {
  return compose(
    forwardRef
  )(({
    onScroll,
    reset,
    stopPropagation = false,
    preventDefault = false,
    // REST
    ...props
  }, ref) => {

    // STATE
    const [ state, updateState ] = useReducer(reducer, INIT, init);

    // REDUCERS
    const reducers = useMemo(
      () => ({
        updateRange: range => {
          updateState({
            type: 'setRange',
            range
          });
        },
        updateScroll: (delta, e) => {
          if (stopPropagation) e.stopPropagation();
          if (preventDefault) e.preventDefault();
          updateState({
            type: 'updateScroll',
            onUpdate: () => {
              if (e) e.preventDefault();
            },
            delta
          });
        },
      }),
      [updateState, stopPropagation, preventDefault]
    )

    // SCROLL LISTENER
    useEffect(
      () => {
        doCallback(onScroll, state);
      },
      [onScroll, state]
    )

    // PROP-BASED SCROLL RE-INITIALIZATION
    useEffect(
      () => {
        if (reset) updateState({
          type: 'initScroll'
        });
      },
      [reset, updateState]
    )

    // RENDER
    return (
      <ScrollContext.Provider value={{
        ...state,
        ...reducers
      }}>
        <Component {...props} />
      </ScrollContext.Provider>
    )
  })
}
