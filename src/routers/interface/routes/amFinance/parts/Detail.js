import React, { useState } from 'react';

// LOCAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';
import { PRINT_OPTIONS } from '../variables';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import Record from 'parts/record/Record';
import HeaderData from '../../../tools/HeaderData';

// LOCAL COMPONENTS
import PrintButton from '../../../tools/PrintSelectButton';

// MAIN COMPONENT
const AMFinanceDetail = ({ children }) => {
  const [record, setRecord] = useState({});

  const handlePrint = {};
  const handleOrder = () => {};
  const handleDelivered = () => {};
  const handleFallout = () => {};

  const { stock_num, vehicle_year, make, model } = record?.inventory || {};

  return (
    <Record.View
      title="AM/Finance"
      buttons={[
        <PrintButton options={PRINT_OPTIONS} onPrint={handlePrint} />,
        <Button onClick={handleOrder} outline fullWidth={false} label="Order" size="sm" />,
        <Button onClick={handleDelivered} outline fullWidth={false} label="Delivered" size="sm" />,
        <Button onClick={handleFallout} outline fullWidth={false} label="Fallout" size="sm" />
      ]}
      buttonsBefore
      endpoints={{
        get: ENDPOINTS.sales.getSales
      }}
      onLoadRecord={r => setRecord(r)}
      headerTools={[<HeaderData stockNo={stock_num} year={vehicle_year} make={make} model={model} />]}
      usePreloader
    >
      {children}
    </Record.View>
  );
};

// EXPORT
export default AMFinanceDetail;
