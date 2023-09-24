//DEPENDENCIES
import React, { useContext } from 'react';

// GLOBAL HELPERS
import { getListData, ListContext } from 'helpers/getListData';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';
import { INTERFACE, SETTINGS } from 'pathnames';
import { NEW_USED } from 'codes';

// GLOBAL FUNCITONS
import { makePath } from 'functions';

// GLOBAL COMPONENTS
import Main from 'parts/main/Main';
import Collapse from 'parts/table/types/collapse/Collapse';
import Button from 'core/tools/Button';

// LOCAL VARIABLES
import { COLUMNS, PAGE_SETTINGS } from './variables';

// LOCAL COMPONENTS
import Title from 'parts/title/Title';
import Filters from 'parts/filters/Filters';

// MAIN COMPONENT
const DealPackList = () => {

  // CONTEXT
  const { result } = useContext(ListContext) || {};

  return (
    <Main>
      <Title
        title="Deal Packs"
        tools={[
          <Button.Add
            label="Add Pre-Owned"
            to={`${makePath(INTERFACE.settings, SETTINGS.dealPacks, 'add')}?new_used=${NEW_USED.used.numeric}`}
          />,
          <Button.Add
            label="Add New"
            to={`${makePath(INTERFACE.settings, SETTINGS.dealPacks, 'add')}?new_used==${NEW_USED.new.numeric}`}
          />,
        ]}
      />

      <Filters>
        <Filters.Select.Active />
        <Filters.Select.NewUsed />
        <Filters.Select.SalesType />
        <Filters.Search
          name="dealerPackTitle"
          placeholder="Search by title"
        />
        <Filters.Reset />
      </Filters>

      <div>
        {result.map(({
          sale_type_category_id,
          sale_type_category,
          dealer_packs = []
        }, i) => (
          <Collapse
            index={i}
            key={sale_type_category_id}
            title={sale_type_category}
            data={dealer_packs}
          />
        ))}
      </div>
    </Main >
  )
}

// EXPORT
export default getListData(DealPackList, {
  key: PAGE_SETTINGS.path,
  fetchArgs: {
    endpoint: ENDPOINTS.admin.dealPacks.list,
  },
  settings: PAGE_SETTINGS,
  columns: [
    COLUMNS.updatedOn,
    COLUMNS.newUsed,
    COLUMNS.packTitle,
    COLUMNS.packAmount,
    COLUMNS.isActive,
    COLUMNS.updatedBy,
    COLUMNS.edit
  ]
});
