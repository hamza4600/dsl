import React, { useCallback, useLayoutEffect } from 'react';

// DEPENDENCIES
//import { trim } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL FUNCTIONS
import {setScreenSize } from 'actions.js';

// STYLES
//import breakpoints from 'css/custom/export/_breakpoints.scss';

// MAIN COMPONENT
export const checkScreenSize = Component => {
  return compose(
    connect(
      null,
      ({ setScreenSize })
    )
  )(({
    setScreenSize,
    ...props
  }) => {

    // COMPARE WINDOW SIZE
    const checkWindowSize = useCallback(
//      () => setScreenSize(window.innerWidth < breakpoints[trim(breakpoints.desktop, '"')]),
      () => {
        setScreenSize({isMobile : window.innerWidth < 1024, isTab : window.innerWidth > 1023 && window.innerWidth < 1430});
      },
      [setScreenSize]
    )

    // MOUNT / WINDOW RESIZE LISTENER
    useLayoutEffect(
      () => {
        checkWindowSize();
        window.addEventListener('resize', checkWindowSize);
        return () => window.removeEventListener('resize', checkWindowSize);
      },
      [checkWindowSize]
    )

    return <Component {...props} />;
  })
}
