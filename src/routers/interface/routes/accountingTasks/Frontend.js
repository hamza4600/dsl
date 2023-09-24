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
import Vsd from './parts/Vsd';

// MAIN COMPONENT
const Frontend = () => (
  <Main>
    <Title documentTitle="Accounting Tasks ->Frontend" title="Frontend" />
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
export default getListData(Frontend, {
  key: 'accountTaskFrontend',
  fetchArgs: {
    endpoint: ENDPOINTS.AccountingTasks.FE_gross.list
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
      ...COLUMNS.AP_gross,
      xs: 3
    },
    {
      ...COLUMNS.deal,
      xs: 3
    },
    {
      ...COLUMNS.Bp_gross,
      xs: 3
    }
  ],
  actions: [ACTIONS.openSales]
});