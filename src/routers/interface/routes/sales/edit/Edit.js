import React from 'react';

// LOCAL COMPONENTS
import CustomerInfo from '../parts/CustomerInfo';
import SalesDetail from '../parts/Detail';
import EmployeeInfo from '../parts/EmployeeInfo';
import InternalDeal from '../parts/InternalDeal';
import VehicleInfo from '../parts/VehicleInfo';
import InventoryInternalInfo from '../parts/InventoryInternal';
import PurchaseInfo from '../parts/PurchaseInfo';
import PricingInfoForm from '../parts/PricingInfo';
import VehicleCost from '../parts/VehicleCost';
import DealerPack from '../parts/DealerPack';
import DealerIncentives from '../parts/DealerIncentives';
import TradeInfo from '../parts/Trade';

// MAIN COMPONENT
const Edit = () => {
  return (
    <SalesDetail>
      <VehicleInfo />
      <TradeInfo />
      <PricingInfoForm />
      <InventoryInternalInfo />
      <EmployeeInfo />
      <CustomerInfo />
      <PurchaseInfo />
      <VehicleCost />
      <DealerIncentives/>
      <DealerPack />
      <InternalDeal />
    </SalesDetail>
  );
};

// EXPORT
export default Edit;
