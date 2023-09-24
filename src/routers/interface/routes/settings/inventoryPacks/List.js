import React from 'react';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';
import { INTERFACE, SETTINGS as PAGE_SETTINGS } from 'pathnames';
import { NEW_USED } from 'codes';

// GLOBALE FUNCTIONS
import { makePath } from 'functions';

// LOCAL VARIABLES
import { COLUMNS, SETTINGS } from './variables';

// GLOBAL HELPERS
import { getListData } from 'helpers/getListData';

// GLOBAL COMPONENTS
import Main from 'parts/main/Main';

// LOCAL COMPONENTS
import Title from 'parts/title/Title';
import Table from 'parts/table/Table';
import Filters from 'parts/filters/Filters';
import Button from 'core/tools/Button';

// MAIN COMPONENT
const InventoryPacksList = () => (
  <Main>
    <Title
      title="Inventory Packs"
      tools={[
        <Button.Add
          label="Add Pre-Owned"
          to={`${makePath(INTERFACE.settings, PAGE_SETTINGS.inventoryPacks, 'add')}?new_used=${NEW_USED.used.numeric}`}
        />,
        <Button.Add
          label="Add New"
          to={`${makePath(INTERFACE.settings, PAGE_SETTINGS.inventoryPacks, 'add')}?new_used=${NEW_USED.new.numeric}`}
        />
      ]}
    />

    <Filters>
      <Filters.Select.Active />
      <Filters.Select.InventoryStatus />
      <Filters.Select.InventorySource
        name="inventorySourceId"
      />
      <Filters.Search
        name="inventory_pack_title"
        placeholder="Search by title"
      />
    </Filters>

    <Table />
  </Main>
)

// EXPORT
export default getListData(InventoryPacksList, {
  key: SETTINGS.path,
  fetchArgs: {
    endpoint: ENDPOINTS.admin.inventoryPacks.list,
    params: {}
  },
  settings: SETTINGS,
  columns: [
    COLUMNS.updatedOn,
    COLUMNS.newUsed,
    COLUMNS.packTitle,
    COLUMNS.inventorySource,
    COLUMNS.packAmount,
    COLUMNS.isActive,
    COLUMNS.updatedBy,
    COLUMNS.edit
  ]
});
