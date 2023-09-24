import React from 'react';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';
import { INTERFACE, SETTINGS, AM_FINANCE } from 'pathnames';

// GLOBAL FUNCTIONS
import { makePath } from 'functions';

// LOCAL VARIABLES
import { COLUMNS, SETTINGS as PAGE_SETTINGS } from './variables';

// GLOBAL HELPERS
import { getListData } from 'helpers/getListData';

// GLOBAL COMPONENTS
import Main from 'parts/main/Main';
import Button from 'core/tools/Button';

// LOCAL COMPONENTS
import Title from 'parts/title/Title';
import Filters from 'parts/filters/Filters';
import Table from 'parts/table/Table';

// MAIN COMPONENT
const LenderList = () => (
  <Main>
    <Title
    documentTitle='Dealer AM/Finance'
      title="Dealer AM/Finance"
      tools={[
        <Button.Add
          label="Add Lender"
          to={`${makePath(INTERFACE.settings, SETTINGS.amFinance, AM_FINANCE.lenders, 'add')}`}
        />,
      ]}
    />

    <Filters>
      <Filters.Select.Active />
      <Filters.Spacer />
      <Filters.Search
        name="lenderName"
        placeholder="Search by lender name"
      />
    </Filters>

    <Table />
  </Main>
)

// EXPORT
export default getListData(LenderList, {
  key: PAGE_SETTINGS.path,
  fetchArgs: {
    endpoint: makePath(ENDPOINTS.admin.amFinance.lenders, 'list'),
    params: {}
  },
  settings: PAGE_SETTINGS,
  columns: [
    COLUMNS.lender,
    COLUMNS.updatedOn,
    COLUMNS.updatedBy,
    COLUMNS.isActive,
    COLUMNS.edit,
  ]
});
