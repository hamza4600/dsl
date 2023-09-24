import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// STYLES
import styles from './styles.module.scss';

// MAIN COMPONENT
/**
 *
 * @param {object} props
 * @param {string} props.title
 * @param {boolean} props.isCard
 * @param {Function} props.rightChildrenRender
 * @param {JSX.Element} props.children
 *
 * @returns {JSX.Element} Info Card Component
 */
const InfoCard = props => {
  const { title, isCard = true, rightChildrenRender = () => {} } = props;

  // RENDER
  return <div className={clsx( styles.container, isCard && styles['container__card'])}>
    <div className={clsx(styles.head, isCard && styles['head__card'])}>
      <h4>{title}</h4>
      <div>
        {rightChildrenRender()}
      </div>
    </div>

    <div className={clsx(styles.body, isCard && styles['body__card'])}>
      {props.children}
    </div>
  </div>
};

// EXPORT
export default InfoCard;
