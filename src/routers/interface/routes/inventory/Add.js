import React from 'react';

// LOCAL COMPONENTS
import InventoryDetail from './parts/Detail';
import VehicleInfo from '../../sections/VehicleInfo';
import PricingInfo from '../../sections/PricingInfo';
import InventoryInternal from '../../sections/InventoryInternal';
import InventoryAttachments from '../../sections/InventoryAttachments';

// MAIN COMPONENT
const InventoryAdd = () => {
  return (
    <InventoryDetail>
      <VehicleInfo />
      <PricingInfo />
      <InventoryInternal />
      <InventoryAttachments />
    </InventoryDetail>
  );
};

// EXPORT
export default InventoryAdd;
