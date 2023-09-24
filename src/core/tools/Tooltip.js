import React, { useCallback, useEffect, useRef, useState } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL VARIABLES
import { TIMES } from 'globals.js';

// BOOTSTRAP COMPONENTS
import { Overlay, Tooltip as BootstrapTooltip } from 'react-bootstrap';
import Button from './Button';

// STYLES
import styles from './tooltip.module.scss';

// MAIN COMPONENT
const Tooltip = ({
  children,
  className,
  wrapperClassName,
  variant,
  placement = 'bottom',
  tip,
  hoverTip = true,
  tooltips
}) => {
  // TARGET REF
  const target = useRef(null);
  const delay = useRef(null);

  // SHOW STATE
  const [ show, setShow ] = useState(false);

  // SHOW TOGGLES
  const handleMouseEnter = useCallback(
    () => {
      delay.current = setTimeout(() => {
        delay.current = null;
        setShow(true)
      }, TIMES.tooltipDelay);
    },
    [setShow, delay]
  )
  const handleMouseLeave = useCallback(
    () => {
      if (delay.current) {
        clearTimeout(delay.current);
        delay.current = null;
      }
      setShow(false)
    },
    [setShow]
  )
  

  // RENDER
  return !tip ? children : (<>
    <div
      className={clsx(
        'tooltip-wrapper',
        styles.wrapper,
        wrapperClassName,
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={target}
    >
      {children}
    </div>
    <Overlay
      target={target.current}
      show={show}
      placement={placement}
    >
      <BootstrapTooltip
        className={clsx(
          styles.tooltip,
          styles[variant],
          className
        )}
      >
      {!tooltips?.tips?tip:<>
         <h3 className='text-left pb-3'>{tooltips.header}</h3> 
        {tooltips.tips.map((item, i) => <p key={i} className='text-left'>
         <span>{item.label}</span>
         <span>{item?.icon && <Button.Link
          className={clsx(styles.icon,'d-inline')}
          size='md'
          iconColor='iconColor'
          icon={item.icon}/>}
         {item.description}</span>
         </p>)}
       </>
      }
      </BootstrapTooltip>
    </Overlay>
  </>)
}

// EXPORT
export default Tooltip;
