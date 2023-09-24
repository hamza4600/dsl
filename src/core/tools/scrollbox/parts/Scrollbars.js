import React, { useContext, useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// HELPERS/CONTEXT
import { ScrollContext } from '../helpers/scrollContext';

// LOCAL PARTS
import Scrollbar from './Scrollbar';

// STYLES
import styles from './scrollbars.module.scss';

// MAIN COMPONENT
const Scrollbars = ({
  children,
  direction = 'vertical',
  scrollbar,
  ...props
}) => {

  // CONTEXT
  const { range: { 2: ratioX = 1, 3: ratioY = 1 } } = useContext(ScrollContext) || {};

  // MEMOS
  const [
    useVertical,
    useHorizontal
  ] = useMemo(
    () => ([
      ['vertical', 'multi'].includes(direction) && ratioY < 1,
      ['horizontal', 'multi'].includes(direction) && ratioX < 1,
    ]),
    [direction, ratioX, ratioY]
  )

  // RENDER
  return !scrollbar ? children : (
    <div
      className={clsx(
        'scrollbars',
        styles.container,
        (useVertical || useHorizontal) && styles[direction]
      )}
    >
      {children}
      {useVertical &&
        <Scrollbar
          className={styles.vertical}
          direction="vertical"
          multi={useHorizontal}
          {...props}
        />
      }
      {useHorizontal &&
        <Scrollbar
          className={styles.horizontal}
          direction="horizontal"
          multi={useVertical}
          {...props}
        />
      }
    </div>
  )
}

// EXPORT
export default Scrollbars;
