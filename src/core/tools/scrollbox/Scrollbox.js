import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { ResizeObserver } from 'resize-observer';

// HELPERS/CONTEXT
import { scrollContext, ScrollContext } from './helpers/scrollContext';

// LOCAL PARTS
import Scrollbars from './parts/Scrollbars';

// STYLES
import styles from './scrollbox.module.scss';

// MAIN COMPONENT
const Scrollbox = ({
  children,
  outerClassName,
  innerClassName,
  trayClassName,
  outerStyle = {},
  innerStyle = {},
  ...props
}) => {

  // CONTEXT
  const { range, scroll: [ left, top ], updateRange, updateScroll } = useContext(ScrollContext) || {};

  // PROPS
  const {
    direction = 'vertical',
    disabled,
  } = props;

  // REFS
  const scrollboxOuter = useRef();
  const scrollboxInner = useRef();
  const scrollboxTray  = useRef();
  const touchRef       = useRef();

  // HORIZONTAL HEIGHT
  const height = useMemo(
    () => {
      if (direction !== 'horizontal' || !range) return;
      const outerBox = scrollboxOuter.current;
      const tray = scrollboxTray.current;
      if (!outerBox || !tray) return;
      return tray.offsetHeight;
    },
    [direction, range, scrollboxTray]
  )

  // SCROLLBOX RESIZE OBSERVER
  const handleResize = useCallback( // measure difference between outer and inner container sizes
    () => {
      const range = !scrollboxOuter.current || !scrollboxInner.current ? [0, 0] : [
        Math.min(scrollboxOuter.current.offsetWidth - scrollboxInner.current.offsetWidth, 0),
        Math.min(scrollboxOuter.current.offsetHeight - scrollboxInner.current.offsetHeight, 0),
        Math.min(scrollboxOuter.current.offsetWidth/scrollboxInner.current.offsetWidth, 1),
        Math.min(scrollboxOuter.current.offsetHeight/scrollboxInner.current.offsetHeight, 1)
      ]
      updateRange(range);
    },
    [scrollboxOuter, scrollboxInner, updateRange]
  )
  useEffect(
    () => {
      const resizeObserver = new ResizeObserver(handleResize);
      const outerBox = scrollboxOuter.current;
      const innerBox = scrollboxInner.current;
      resizeObserver.observe(outerBox);
      resizeObserver.observe(innerBox);
      return () => {
        resizeObserver.disconnect(outerBox)
        resizeObserver.disconnect(innerBox);
      };
    },
    [scrollboxOuter, scrollboxInner, handleResize]
  )

  // MOUSEWHEEL/TOUCHSCREEN
  const handleWheel = useCallback(
    e => {
      const { deltaX, deltaY } = e;
      if (!deltaX && !deltaY) return;
      updateScroll([deltaX, deltaY], e)
    },
    [updateScroll]
  )
  const handleTouch = useCallback(
    e => {
      if (e.touches.length > 1) return;
      const { pageX, pageY } = e.touches[0] || {};
      switch (e.type) {
        case 'touchstart':
          if (!e.touches || !e.touches[0]) return;
          touchRef.current = [pageX, pageY];
          break;
        case 'touchmove':
          if (!e.touches || !e.touches[0] || !touchRef.current) return;
          const deltaX = (touchRef.current[0] - pageX)/10;
          const deltaY = (touchRef.current[1] - pageY)/10;
          updateScroll([deltaX, deltaY], e)
          break;
        case 'touchend':
          touchRef.current = undefined;
          break;
        default:
          return;
      }
    },
    [touchRef, updateScroll]
  )
  useEffect(
    () => {
      if (!scrollboxInner.current) return;
      const scrollboxTarget = scrollboxInner.current;
      scrollboxTarget.addEventListener('wheel', handleWheel, {passive: false});
      scrollboxTarget.addEventListener('touchstart', handleTouch, {passive: false});
      scrollboxTarget.addEventListener('touchmove', handleTouch, {passive: false});
      scrollboxTarget.addEventListener('touchend', handleTouch, {passive: false});
      return () => {
        scrollboxTarget.removeEventListener('wheel', handleWheel, {passive: false});
        scrollboxTarget.removeEventListener('touchstart', handleTouch, {passive: false});
        scrollboxTarget.removeEventListener('touchmove', handleTouch, {passive: false});
        scrollboxTarget.removeEventListener('touchend', handleTouch, {passive: false});
      }
    },
    [handleWheel, handleTouch]
  )

  // RENDER
  return (
    <Scrollbars {...props}>
      <div
        className={clsx(
          'scrollbox-outer',
          styles.outer,
          styles[direction],
          !!disabled && styles.disabled,
          outerClassName
        )}
        style={{
          height,
          ...outerStyle
        }}
        ref={scrollboxOuter}
      >
        <div
          className={clsx(
            'scrollbox-inner',
            styles.inner,
            styles[direction],
            !!disabled && styles.disabled,
            innerClassName
          )}
          ref={scrollboxInner}
          style={{
            left,
            top
          }}
        >
          <div
            className={clsx(
              'scrollbox-tray',
              styles.tray,
              styles[direction],
              !!disabled && styles.disabled,
              trayClassName
            )}
            ref={scrollboxTray}
          >
            {children}
          </div>
        </div>
      </div>
    </Scrollbars>
  )
}

// EXPORT
export default scrollContext(Scrollbox);
