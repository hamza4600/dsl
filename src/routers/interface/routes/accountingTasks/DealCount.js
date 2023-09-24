import React from 'react';

// GLOBAL COMPONENTS
import Main from 'parts/main/Main';

// LOCAL COMPONENTS
import Title from 'parts/title/Title';
import Filters from 'parts/filters/Filters';
import Table from 'parts/table/Table';
import { getListData } from 'helpers/getListData';
import { ENDPOINTS } from 'endpoints';
import { COLUMNS, ACTIONS } from './variable';
import { THIS_MONTH, TODAY } from 'timeFormats';

// MAIN COMPONENT
const DealCount = () => (
  <Main>
    <Title documentTitle="Accounting Tasks -> Deal Count" title="Deal Count" />
    <Filters>
      <Filters.Date.Range />
      <Filters.Button.SalesType />
      <Filters.Button.NewUsed />
      <Filters.Select.Match/>
      <Filters.Search />
    </Filters>
    <Table lastCol="Inventory Location" />
  </Main>
);

// EXPORT
export default getListData(DealCount, {
  key: 'accountTaskDealCount',
  fetchArgs: {
    endpoint: ENDPOINTS.AccountingTasks.deal_count.list
  },
  defaults: {
    endDate: TODAY,
    startDate: THIS_MONTH
  },
  columns: [
    {
      ...COLUMNS.ddate,
      xs: 3
    },
    {
      ...COLUMNS.customer,
      xs: 3
    },
    {
      ...COLUMNS.slsperson,
      xs: 3
    },
    {
      ...COLUMNS.fiManager,
      xs: 3
    },
    {
      ...COLUMNS.makeModel,
      xs: 3
    },
    {
      ...COLUMNS.vin_num,
      md: 5
    },
    {
      ...COLUMNS.stockNum,
      md: 4
    },
    {
      ...COLUMNS.deal,
      xs: 3
    }
  ],
  actions: [ACTIONS.openSales]
});