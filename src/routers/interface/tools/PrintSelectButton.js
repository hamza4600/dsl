import React from 'react';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import Dropdown from 'core/tools/dropdown/Dropdown';
import Sprite from 'core/tools/Sprite';
import Item from 'core/form/control/types/select/parts/Item';

// MAIN COMPONENT
const PrintSelectButton = ({ className, onPrint, options = [] }) => {
  const handlePrint = (endpoint, fileName) => onPrint(endpoint, fileName);

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
            <span className="ml-2">Print</span>
          </>
        ),
        className
      }}
      size="sm"
    >
      {options.map((element, index) => (
        <Item option={element.label} key={index} onSelect={() => handlePrint(element.value, element.label)} />
      ))}
    </Dropdown>
  );
};

// EXPORT
export default PrintSelectButton;
