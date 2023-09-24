import React from 'react';

// STYLE
import styles from './styles.module.scss';

// MAIN COMPONENT
/**
 *
 * @param {Object} props
 * @param {string} props.title
 * @returns {JSX.Element} InfoWrapper
 */
const InfoWrapper = props => {
  const {title} = props;

  // RENDER
  return <div className={styles['info--container']}>
    <div className={styles['info--head']}>
      <h3>{title}</h3>
    </div>
    <div className={styles['info--body']}>
      {props.children}
    </div>
  </div>
};

// EXPORT
export default InfoWrapper;
