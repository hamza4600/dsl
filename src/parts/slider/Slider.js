import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL COMPONENTS
import Sprite from 'core/tools/Sprite';

// STYLES
import styles from './slider.module.scss';


// MAIN COMPONENT
/**
 *
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {string} props.title
 * @param {Function} props.onToggle
 * @param {JSX.Element} props.children
 * @returns {JSX.Element}
 */
const Slider = (props) => {
  const { isOpen = false, onToggle, title } = props;

  const handleClick = () => onToggle();

  return <>
    <div
      className={clsx(
        styles.fade,
        styles['drawer--backdrop'],
        styles[`drawer__${isOpen ? 'visible' : 'hidden'}`]
      )}
      style={{visibility: isOpen ? 'visible' : 'hidden' }}
      onClick={handleClick}
    />
    <div className={clsx(
      styles['drawer--container'],
      styles[`drawer--container__${isOpen ? 'visible' : 'hidden'}`]
    )}
    >
      <div className={styles['drawer--head']}>
        <h3>{title}</h3>
        <div
          className={styles['drawer--wrapper']}
          onClick={handleClick}
        >
          <Sprite use="cancel-circle" className={styles.icon} />
        </div>
      </div>
      <div className={styles['drawer--body']}>
        {props.children}
      </div>
    </div>
  </>
};

// EXPORT
export default Slider;