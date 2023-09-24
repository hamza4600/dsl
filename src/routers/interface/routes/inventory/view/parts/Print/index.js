import React from 'react'

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import Dropdown from 'core/tools/dropdown/Dropdown';
import Sprite from 'core/tools/Sprite';
import Item from 'core/form/control/types/select/parts/Item';

// GLOBAL FUNCTIONS
import { documentFetch, makePath } from 'functions';

// LOCAL VARIABLES
import { PRINT_OPTIONS } from '../../../variables';

// STYLES
import styles from './styles.module.scss';

// MAIN COMPONENT
const PrintButton = ({ vehicleId, salesId, isSold }) => {
  const downloadPDF = (fileBlob, reportType) => {
    const link = document.createElement('a');
    link.href = fileBlob;
    link.setAttribute('download', `${reportType} - ${vehicleId}.pdf`);
    document.body.appendChild(link);
    link.click();
  }

  const printAction = (endpoint, reportType, params={}) => documentFetch({
    accept: 'application/pdf',
    endpoint: makePath(endpoint,vehicleId),
    method: 'GET',
    params,
    onSuccess: res => downloadPDF(res, reportType),
    loadingMessage: 'Downloading your report',
    successMessage: 'The report has been download successfully!',
  })

  const renderedPrintOptions = PRINT_OPTIONS.map(
    ({ label, endpoint }, index) => <Item
      option={label}
      key={index}
      onSelect={() => printAction(
        endpoint,
        label,
        (index === (PRINT_OPTIONS.length-1) && isSold)
          ? {salesId}
          : null
      )}
    />
  )

  // RENDER
  return <Dropdown
    toggle={{
      as: Button,
      icon: 'chevron-down',
      size: 'sm',
      fullWidth: false,
      outline: true,
      children: <>
        <Sprite use="print" />
        <span className={styles.label}>Print</span>
      </>
    }}
    size='sm'
  >
    {renderedPrintOptions}
  </Dropdown>
};

// EXPORT
export default PrintButton;
