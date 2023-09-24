import React, { useCallback } from 'react';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// MAIN COMPONENT
const PrintButton = ({ onPrint }) => {
  const handlePrint = useCallback(() => {
    if (onPrint) doCallback(onPrint);
    else window.print();
  }, [onPrint]);

  return <Button.Link onClick={handlePrint} icon="print" />;
};

// EXPORT
export default PrintButton;
