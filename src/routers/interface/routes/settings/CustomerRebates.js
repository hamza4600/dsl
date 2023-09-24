import React from 'react';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';
import { INTERFACE, SETTINGS as PATH_SETTINGS } from 'pathnames.js';
import { NEW_USED } from 'codes.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions';

// LOCAL VARIABLES
import { COLUMNS, SETTINGS } from './customerRebates/variables';

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
const CustomerRebates = () => (
  <Main>
    <Title
      title="Customer Rebates"
      tools={[
        <Button.Add
          label="Add Pre-Owned"
          to={`${makePath(INTERFACE.settings, PATH_SETTINGS.customerRebates, 'add')}?new_used=${NEW_USED.used.numeric}`}
        />,
        <Button.Add
          label="Add New"
          to={`${makePath(INTERFACE.settings, PATH_SETTINGS.customerRebates, 'add')}?new_used==${NEW_USED.new.numeric}`}
        />
      ]}
    />

    <Filters>
      <Filters.Spacer />
      <Filters.Reset />
    </Filters>

    <Table />
  </Main>
)

// EXPORT
export default getListData(CustomerRebates, {
  key: SETTINGS.path,
  fetchArgs: {
    endpoint: ENDPOINTS.admin.dealerRebates.list,
    params: {}
  },
  settings: SETTINGS,
  columns: [
    COLUMNS.updatedOn,
    COLUMNS.effectiveDate,
    COLUMNS.expirationDate,
    COLUMNS.newUsed,
    COLUMNS.rebateTitle,
    COLUMNS.rebateProgramCode,
    COLUMNS.rebateAmount,
    COLUMNS.autoRebate,
    COLUMNS.createdUser,
    COLUMNS.isActive
  ]
});
