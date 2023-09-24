import React, { useContext } from 'react';

// GLOBAL VARIABLES
import { INVENTORY_TYPE } from 'codes.js';
import { ENDPOINTS } from 'endpoints.js';

// LOCAL VARIABLES
import { COLUMNS, SETTINGS } from './variables.js';

// GLOBAL HELPERS
import { getListData, ListContext } from 'helpers/getListData';

// CORE COMPONENTS
import Button from 'core/tools/Button';
import Tooltip from 'core/tools/Tooltip.js';

// GLOBAL COMPONENTS
import Filters from 'parts/filters/Filters';
import Main from 'parts/main/Main';
import Table from 'parts/table/Table';
import Title from 'parts/title/Title';
import DownloadButton from 'routers/interface/tools/DownloadButton.js';

// MAIN COMPONENT
const Delivered = () => {

  // CONTEXT
  const { preferences: { showColumns = [], filters= {} } = {} } = useContext(ListContext) || {};

  // RENDER
  return (
    <Main>
      <Title
        documentTitle='Inventory -> Delivered'
        title="Delivered"
        tools={[
          <Button.Link
            icon="print"
            onClick={() => window.print()}
          />,
          <Tooltip
            tip='Export to Excel'
          >
            <DownloadButton
              icon="download-excel"
              endpoint={ENDPOINTS.inventory.list}
              filters={{ activecolumns: showColumns.toString(), inventoryType: 'D', ...filters }}
            />
          </Tooltip>
        ]}
      />
      <Filters>
        <Filters.Date.Range />
        <Filters.Button.SalesType />
        <Filters.Button.NewUsed />
        <Filters.Select.InventoryStatus
          lookupParams={{
            inventoryType: INVENTORY_TYPE.delivered.code
          }}
        />
        <Filters.Select.InventorySource />
        <Filters.Search />
        <Table.Columns />
      </Filters>
      <Table />
    </Main>
  )
}

// EXPORT
export default getListData(Delivered, {
  key: 'delivered',
  fetchArgs: {
    endpoint: ENDPOINTS.inventory.list,
    params: {
      inventoryType: INVENTORY_TYPE.delivered.code
    }
  },
  settings: SETTINGS,
  columns: [
    {
      ...COLUMNS.purchased,
      xs: 5
    },
    COLUMNS.saleType,
    {
      ...COLUMNS.delivered,
      xs: 5
    },
    COLUMNS.source,
    COLUMNS.age,
    COLUMNS.newUsed,
    COLUMNS.stockNum,
    COLUMNS.makeModel,
    {
      ...COLUMNS.mileage,
      xs: 8
    },
    {
      ...COLUMNS.acv,
      xs: 8
    },
    {
      ...COLUMNS.dmsInvoice,
      xs: 8
    },
    COLUMNS.status,
    COLUMNS.location,
    COLUMNS.warranty,
    COLUMNS.key,
    COLUMNS.spareKey,
    COLUMNS.homenet,
    COLUMNS.detail,
    COLUMNS.inspection,
    COLUMNS.emission,
    COLUMNS.picture,
    COLUMNS.miscellaneous
  ]
});
