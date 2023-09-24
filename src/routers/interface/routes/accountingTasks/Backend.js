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
const Backend = () => (
  <Main>
    <Title documentTitle="Accounting Tasks ->Backend" title="Backend" />
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
export default getListData(Backend, {
  key: 'accountTaskBackend',
  fetchArgs: {
    endpoint: ENDPOINTS.AccountingTasks.BE_gross.list
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
    },
    {
      ...COLUMNS.totalAm_gross,
      xs: 3
    },
    {
      ...COLUMNS.Fm_gross,
      xs: 3
    },
    {
      ...COLUMNS.Be_gross,
      xs: 3
    }
  ],
  actions: [ACTIONS.openSales]
});