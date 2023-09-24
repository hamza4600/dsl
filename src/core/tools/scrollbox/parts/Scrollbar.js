import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// HELPERS/CONTEXT
import { ScrollContext } from '../helpers/scrollContext';

// STYLES
import styles from './scrollbar.module.scss';

// MAIN COMPONENT
const Scrollbar = ({
  className,
  direction,
  multi,
  disabled
}) => {

  // CONTEXT
  const {
    range: [ rangeX, rangeY, ratioX = 0, ratioY = 0 ],
    scroll: [ scrollX, scrollY ],
    updateScroll
  } = useContext(ScrollContext) || {};

  const [ isDragging, setDragging ] = useState(false);

  // REFS
  const trayRef = useRef();
  const mousePosition = useRef();

  // MOUSE CALLBACKS
  const handleDrag = useCallback(
    ([ dragX, dragY ], e) => {
      if (!trayRef.current) return;
      if (direction === 'vertical') {
        const deltaY = dragY * rangeY / (trayRef.current.offsetHeight * (1 - ratioY));
        updateScroll([0, -deltaY], e);
      } else {
        const deltaX = dragX * rangeX / (trayRef.current.offsetWidth * (1 - ratioX));
        updateScroll([-deltaX, 0], e);
      }
    },
    [direction, trayRef, rangeX, rangeY, ratioX, ratioY, updateScroll]
  )
  const handleMouseDown = useCallback(
    e => {
      e.stopPropagation();
      const { clientX, clientY } = e;
      setDragging(true);
      mousePosition.current = [clientX, clientY];
    },
    [setDragging, mousePosition]
  )
  const handleMousMove = useCallback(
    e => {
      e.stopPropagation();
      if (!mousePosition.current) return;
      const { clientX, clientY } = e;
      const [currentX, currentY] = mousePosition.current;
      const dragX = clientX - currentX;
      const dragY = clientY - currentY;
      mousePosition.current = [clientX, clientY];
      handleDrag([dragX, dragY], e);
    },
    [mousePosition, handleDrag]
  )
  const handleMouseUp = useCallback(
    e => {
      e.stopPropagation();
      setDragging(false);
      mousePosition.current = undefined;
    },
    [setDragging, mousePosition]
  )

  // MOUSE EFFECTS
  useEffect(
    () => {
      if (isDragging) {
        window.addEventListener("mousemove", handleMousMove);
        window.addEventListener("mouseup", handleMouseUp);
      } else {
        window.removeEventListener("mousemove", handleMousMove);
        window.removeEventListener("mouseup", handleMouseUp);
      }
    },
    [isDragging, handleMousMove, handleMouseUp]
  )

  // RENDER
  return (
    <div
      className={clsx(
        'scrollbar',
        styles.scrollbar,
        styles[direction],
        !!multi && styles.multi,
        !!disabled && styles.disabled,
        className
      )}
    >
      <div
        className={styles.tray}
        ref={trayRef}
      >
        <div
          className={clsx(
            styles.handle,
            !!isDragging && styles.dragging
          )}
          style={!trayRef.current ? undefined : direction === 'vertical' ? ({
            height: trayRef.current.offsetHeight * ratioY,
            top: scrollY/rangeY * trayRef.current.offsetHeight * (1 - ratioY)
          }) : ({
            left: scrollX/rangeX * trayRef.current.offsetWidth * (1 - ratioX),
            width: trayRef.current.offsetWidth * ratioX
          })}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  )
}

// EXPORT
export default Scrollbar;
