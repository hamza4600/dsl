import React from 'react';

//GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';
import { INTERFACE, SETTINGS } from 'pathnames';

// GLOBAL FUNCTIONS
import { makePath } from 'functions';

//GLOBAL HELPERS
import { getListData } from 'helpers/getListData';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import Filters from 'parts/filters/Filters';
import Main from 'parts/main/Main';
import Table from 'parts/table/Table';
import Title from 'parts/title/Title';

// LOCAL VARIABLES
import { COLUMNS, DEALER_FORM_SETTINGS } from './variables';

// MAIN COMPONENT
const DealerForms = () => (
  <Main>
    <Title
      title="Dealer Forms"
      tools={[
        <Button.Add
          label="New Dealer Form"
          to={`${makePath(INTERFACE.settings, SETTINGS.dealerForms, 'add')}`}
        />,
      ]}
    />

    <Filters>
      <Filters.Select.Active />
      <Filters.Select.Global />
      <Filters.Spacer />
      <Filters.Search
        name="formName"
        placeholder="Search by form name"
      />
    </Filters>

    <Table />

  </Main>
)

// EXPORT
export default getListData(DealerForms, {
  key: 'dealerForms',
  fetchArgs: {
    endpoint: `${ENDPOINTS.admin.dealerForm.list}`,
    params: {

    }
  },
  settings: DEALER_FORM_SETTINGS,
  columns: [
    COLUMNS.dateUpdated,
    COLUMNS.formName,
    COLUMNS.createdUserFullName,
    COLUMNS.isActive,
    COLUMNS.isGlobal,
    COLUMNS.edit
  ]
});
