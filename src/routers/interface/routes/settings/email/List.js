import React from 'react';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// LOCAL VARIABLES
import { COLUMNS, SETTINGS } from './variables';

// GLOBAL HELPERS
import { getListData } from 'helpers/getListData';

// GLOBAL COMPONENTS
import Main from 'parts/main/Main';

// LOCAL COMPONENTS
import Title from 'parts/title/Title';
import Table from 'parts/table/Table';

// MAIN COMPONENT
const EmailSettingList = () => (
  <Main>
    <Title
      title="Email Settings"
    />
    <Table />
  </Main>
)

// EXPORT
export default getListData(EmailSettingList, {
  key: SETTINGS.path,
  fetchArgs: {
    endpoint: ENDPOINTS.admin.emailSettings.list,
    params: {}
  },
  settings: SETTINGS,
  columns: [
    COLUMNS.name,
    COLUMNS.description,
    COLUMNS.active,
    COLUMNS.edit
  ]
});
