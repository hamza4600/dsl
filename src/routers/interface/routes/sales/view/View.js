import React from 'react';

// DEPENDENCIES
import { useHistory, useParams } from 'react-router-dom';

// GLOBAL VARIABLES
import { INTERFACE } from 'pathnames.js';

// GLOBAL COMPONENTS
import Card from 'parts/card/Card';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// LOCAL COMPONENTS
import Head from './parts/Head';
import RenderDealer from './parts/Dealer';
import RenderStatus from './parts/Status';
import SalesDetail from '../parts/Detail';
import RenderEmployee from './parts/EmployeeInfo';
import RenderInternalDeal from './parts/InternalDeal';
import RenderVehicle from './parts/VehicleInfo';
import RenderInventoryInternal from './parts/InventoryInternal';
import RenderPurchaseInfo from './parts/PurchaseInfo';
import RenderCustomerInfo from './parts/CustomerInfo';
import PricingInfoForm from './parts/PricingInfo';
import DealerPackInfo from './parts/DealerPack';
import DealerIncentivesInfo from './parts/DealerIncentives';
import TradeInfo from './parts/Trade';

// MAIN COMPONENT
const SalesView = () => {
  const history = useHistory();
  const { recordID } = useParams();
  const goToEdit = () => history.push(makePath(INTERFACE.sales, 'edit', recordID));

  return (
    <SalesDetail title="Deal Information" onEditClick={goToEdit} buttons={<Head />}>
      <Card title="Sale/Vehicle Info">
        <RenderDealer />
        <RenderStatus />
        <RenderCustomerInfo/>
        <TradeInfo />
        <RenderEmployee />
        <RenderVehicle />
        <PricingInfoForm />
        <RenderInventoryInternal />
        <RenderPurchaseInfo />
        <DealerPackInfo />
        <RenderInternalDeal />
        <DealerIncentivesInfo/>
      </Card>
    </SalesDetail>
  );
};

// EXPORT
export default SalesView;
