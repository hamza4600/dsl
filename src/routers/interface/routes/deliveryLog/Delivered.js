import React from 'react';

// GLOBAL VARIABLES
import { DEELIVEREY_LOG_TYPE, INVENTORY_TYPE } from 'codes.js';
import { ENDPOINTS } from 'endpoints.js';
import { THIS_MONTH, TODAY } from 'timeFormats.js';

// GLOBAL VARIABLES
import { formatDate } from 'functions.js';

// GLOBAL HELPERS
import { getListData } from 'helpers/getListData';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import Filters from 'parts/filters/Filters';
import Main from 'parts/main/Main';
import Table from 'parts/table/Table';
import Title from 'parts/title/Title';

// LOCAL VARIABLES
import {ACTIONS, DELIVERED_COLUMNS} from './variables';

// MAIN COMPONENT
const Delivered = () => (
  <Main>
    <Title
    documentTitle='Delivery Log -> Delivered'
      title="Delivery Log"
      tools={[
        <Button.Link
          icon="print"
        />,
        <Button.Link
          icon="download-excel"
        />
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
      <Filters.Search />
      <Table.Columns />
    </Filters>
    <Table />
  </Main>
)

// EXPORT
export default getListData(Delivered, {
  key: 'delivered',
  fetchArgs: {
    endpoint: ENDPOINTS.delivereyLog.delivered,
    params: {
      deliveryLogType: DEELIVEREY_LOG_TYPE.Delivered.code
    }
  },
  defaults: {
    start_date: formatDate(THIS_MONTH),
    end_date: formatDate(TODAY)
  },
  columns: [
    DELIVERED_COLUMNS.deliveryData,
    DELIVERED_COLUMNS.customer,
    DELIVERED_COLUMNS.age,
    DELIVERED_COLUMNS.newUsed,
    DELIVERED_COLUMNS.saleSubtype,
    DELIVERED_COLUMNS.purchaseLease,
    DELIVERED_COLUMNS.saleType,
    DELIVERED_COLUMNS.stockNumber,
    DELIVERED_COLUMNS.vehicle,
    DELIVERED_COLUMNS.trade,
    DELIVERED_COLUMNS.frontendGross,
    DELIVERED_COLUMNS.amGross,
    DELIVERED_COLUMNS.fiGross,
    DELIVERED_COLUMNS.backendGross,
    DELIVERED_COLUMNS.totalBpGross,
    DELIVERED_COLUMNS.dealerPack,
    DELIVERED_COLUMNS.totalApGross,
    DELIVERED_COLUMNS.salesPerson,
    DELIVERED_COLUMNS.salesManager,
    DELIVERED_COLUMNS.fmManager,
    DELIVERED_COLUMNS.totalTasks,
  ],
  actions: [
    ACTIONS.openSales
  ]
});
