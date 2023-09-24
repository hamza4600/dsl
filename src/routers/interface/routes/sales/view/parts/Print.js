import React from 'react';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import Dropdown from 'core/tools/dropdown/Dropdown';
import Sprite from 'core/tools/Sprite';
import Item from 'core/form/control/types/select/parts/Item';

// LOCAL VARIABLES
import { PRINT_OPTIONS } from '../../variables';

// STYLES
import styles from './print.module.scss';

// MAIN COMPONENT
const PrintButton = ({ onPrint }) => {
  const handlePrintAction = (endpoint, fileName) => onPrint(endpoint, fileName);

  // RENDER
  return (
    <Dropdown
      toggle={{
        as: Button,
        icon: 'chevron-down',
        size: 'sm',
        fullWidth: false,
        outline: true,
        children: (
          <>
            <Sprite use="print" />
            <span className={styles.label}>Print</span>
          </>
        )
      }}
      size="sm"
    >
      {PRINT_OPTIONS.map((element, index) => (
        <Item option={element.label} key={index} onSelect={() => handlePrintAction(element.value, element.label)} />
      ))}
    </Dropdown>
  );
};

// EXPORT
export default PrintButton;
