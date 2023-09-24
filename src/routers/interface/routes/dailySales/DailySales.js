import React, { useState } from 'react';

// LOCAL VARIABLES
import { DAILY_SALES_COLUMNS } from './variables.js';

// GLOBAL VARIABLES
import { TODAY } from 'timeFormats.js';
import { ENDPOINTS } from 'endpoints.js';

// GLOBAL HELPERS
import { getListData } from 'helpers/getListData.js';

// GLOBAL COMPONENTS
import Main from 'parts/main/Main';
import Title from 'parts/title/Title';
import Filters from 'parts/filters/Filters.js';

// LOCAL COMPONENTS
import DailySalesTable from './parts/DailySalesTable.js';
import Slider from 'parts/slider/Slider.js';
import VehicleInfo from './parts/VehicleInfo.js';
import NotFound from './parts/NotFound.js';

// MAIN COMPONENT
const DailySales = () => {
  const [sidebarIsOpen, setSidebar] = useState(false);
  const [inventory, setInventory] = useState({});
  const [stockNo, setStockNo] = useState('');
  const [isNew, setIsNew] = useState(false);

  const toggleSidebar = () => setSidebar(prevState => !prevState);

  const showVehicleData = (res, stockNo, new_used) => {
    if (res.inventory) {
      setInventory(res.inventory);
    } else {
      setInventory(undefined);
    }

    setIsNew(new_used);
    setStockNo(stockNo);

    return toggleSidebar();
  };

  return (
    <Main>
      <Title documentTitle='Daily Sales ' title="Daily Sales" />
      <Filters>
        <Filters.Date name="saleDate" placeholder="Sale Date" maxDate={TODAY} />
        <Filters.Button.NewUsed />
      </Filters>

      <DailySalesTable onFormSubmit={toggleSidebar} showVehicleData={showVehicleData} />

      <Slider title="Vehicle Info" isOpen={sidebarIsOpen} onToggle={toggleSidebar}>
        {inventory ? <VehicleInfo vehicleDetails={inventory} /> : <NotFound stockNo={stockNo} isNew={isNew} />}
      </Slider>
    </Main>
  );
};

// EXPORT
export default getListData(DailySales, {
  key: 'dailySales',
  fetchArgs: {
    endpoint: ENDPOINTS.dailySales.listByDate,
    loadingMessage: 'Acquiring sales records'
    // errorMessage: 'An error occured while processing your request'
  },
  defaults: {
    saleDate: TODAY
  },
  columns: [
    DAILY_SALES_COLUMNS.delivereyType,
    DAILY_SALES_COLUMNS.add,
    DAILY_SALES_COLUMNS.totalSold,
    DAILY_SALES_COLUMNS.amFi,
    DAILY_SALES_COLUMNS.fallout,
    DAILY_SALES_COLUMNS.order,
    DAILY_SALES_COLUMNS.sales,
    DAILY_SALES_COLUMNS.backout,
    DAILY_SALES_COLUMNS.total
  ]
});
