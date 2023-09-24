import React, { useContext } from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { INVENTORY_TYPE, NEW_USED } from 'codes.js';
import { ENDPOINTS } from 'endpoints.js';
import { INTERFACE } from 'pathnames.js';

// LOCAL VARIABLES
import { COLUMNS, SETTINGS } from './variables.js';

// GLOBAL HELPERS
import { getListData, ListContext } from 'helpers/getListData';

// GLOBAL FUNCTIONS
import { makePath } from 'functions';

// CORE COMPONENTS
import Form from 'core/form/Form.js';
import Button from 'core/tools/Button';
import Tooltip from 'core/tools/Tooltip.js';

// GLOBAL COMPONENTS
import Filters from 'parts/filters/Filters';
import Main from 'parts/main/Main';
import Table from 'parts/table/Table';
import Title from 'parts/title/Title';
import DownloadButton from 'routers/interface/tools/DownloadButton.js';

// MAIN COMPONENT
const Problems = compose(
  connect(
    ({ mobile }) => ({ mobile })
  )
)(({
  // REDUX STATE
  mobile,
}) => {

  // CONTEXT
  const {
    preferences: {
      showColumns = [], 
      filters= {} 
    } = {},
  } = useContext(ListContext) || {};

    return (
    <Main>
      <Title
        documentTitle="Inventory -> Problems "
        title="Problems"
        tools={ !mobile.mobile ? [
          <Button.Link icon="print" onClick={() => window.print()} />,
          <Tooltip className="pt-3" tip="Export to Excel">
            <DownloadButton
              icon="download-excel"
              endpoint={ENDPOINTS.inventory.list}
              filters={{ activecolumns: showColumns.toString(), inventoryType: 'P', ...filters }}
            />
          </Tooltip>,
          <Button.Add
            label="Add Pre-Owned"
            to={`${makePath(INTERFACE.inventory, 'add')}?new_used=${NEW_USED.used.numeric}`}
          />,
          <Button.Add
            label="Add New"
            to={`${makePath(INTERFACE.inventory, 'add')}?new_used=${NEW_USED.new.numeric}`}
          />
        ] : [
          <Button.Link icon="print" />,
          <DownloadButton
            icon="download-excel"
            endpoint={ENDPOINTS.inventory.list}
            filters={{ inventoryType: 'P' }}
          />
        ]}
      />
      {mobile.mobile && (
        <Form.Row className="mb-5">
          <Form.Col className="mr-2">
            <Button.Add
              label="Add Pre-Owned"
              to={`${makePath(INTERFACE.inventory, 'add')}?new_used=${NEW_USED.used.numeric}`}
            />
          </Form.Col>
          <Form.Col className="ml-2">
            <Button.Add
              label="Add New"
              to={`${makePath(INTERFACE.inventory, 'add')}?new_used=${NEW_USED.new.numeric}`}
            />
          </Form.Col>
        </Form.Row>
      )}
      <Filters>
        <Filters.Button.SalesType />
        <Filters.Button.NewUsed />
        <Filters.Select.InventoryStatus
          lookupParams={{
            inventoryType: INVENTORY_TYPE.problems.code
          }}
        />
        <Filters.Select.InventorySource />
        <Filters.Search />
        <Table.Columns />
      </Filters>
      <Table />
    </Main>
  )
})

// EXPORT
export default getListData(Problems, {
  key: 'problems',
  fetchArgs: {
    endpoint: ENDPOINTS.inventory.list,
    params: {
      inventoryType: INVENTORY_TYPE.problems.code
    }
  },
  settings: SETTINGS,
  columns: [
    {
      ...COLUMNS.purchased,
      xs: 5
    },
    COLUMNS.saleType,
    COLUMNS.source,
    COLUMNS.age,
    COLUMNS.newUsed,
    COLUMNS.stockNum,
    COLUMNS.makeModel,
    {
      ...COLUMNS.mileage,
      xs: 8
    },
    {
      ...COLUMNS.acv,
      xs: 8
    },
    {
      ...COLUMNS.dmsInvoice,
      xs: 8
    },
    COLUMNS.status,
    COLUMNS.location,
    COLUMNS.warranty,
    COLUMNS.key,
    COLUMNS.spareKey,
    COLUMNS.homenet,
    COLUMNS.detail,
    COLUMNS.inspection,
    COLUMNS.emission,
    COLUMNS.picture,
    COLUMNS.miscellaneous
  ]
});
