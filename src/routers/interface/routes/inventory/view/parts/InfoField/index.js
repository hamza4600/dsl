import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import moment from 'moment';

// LOCAL COMPONENTS
import InfoButton from '../InfoButton';

// STYLES
import styles from './styles.module.scss'

// MAIN COMPONENT
/**
 * 
 * @param {Object} props 
 * @param {string} [props.label]
 * @param {string} [props.value]
 * @param {string} [props.wrapperClassName]
 * @param {string} [props.bodyClassName]
 * @param {string} [props.titleClassName]
 * @param {JSX.Element} [props.labelComponent]
 * @param {JSX.Element} [props.children]
 * @param {boolean} [props.isDMSEnabled]
 * @param {string} [props.DMSSyncDate]
 *
 * @returns {JSX.Element} Info Field Component
 */
const InfoField = props => {
  const {
    label = '',
    labelComponent,
    value = '',
    wrapperClassName='',
    titleClassName='',
    bodyClassName='',
    isTable = false,
    valueClassName='',
    backClassName='',
    isDMSEnabled = false,
    DMSSyncDate = 'Not available'
  } = props;

  const { append } = props.group || {}

  const momentDmsDate = moment(DMSSyncDate);
  const dmsDate = ` as of ${momentDmsDate.format('DD/MM/YYYY')} at ${momentDmsDate.format('hh:mm A')}`

  // RENDER
  return (
    <div className={clsx(styles.field, wrapperClassName)}>
      <div className={clsx(styles['field--title'], styles[backClassName])}>
        {isDMSEnabled && <InfoButton className={styles.info} />}
        {!!labelComponent ? { ...labelComponent } : <span className={clsx(styles.text, titleClassName)}>{label}</span>}
      </div>
      <div className={clsx(
        styles['field--body'],
        isTable ? styles['field--body__table'] : "", bodyClassName)}>
        {!!props.children
          ? (
            <>
              { props.children }
              { append && append }
            </>
          )
          : <span className={clsx(styles.text, styles[valueClassName], styles['text--description'])}>
              { `${value} ${isDMSEnabled ? DMSSyncDate ? dmsDate : '' : ''}` }
              { append && append }
            </span>
        }
      </div>
    </div>
  );
};

// EXPORT
export default InfoField;