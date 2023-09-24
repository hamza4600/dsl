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

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// GLOBAL HELPERS
import { getListData, ListContext } from 'helpers/getListData';

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
const InStock = compose(
  connect(
    ({ mobile }) => ({ mobile })
  )
)(({
  // REDUX STATE
  mobile
}) => {

  // CONTEXT
  const { preferences: { showColumns = [], filters={} } = {} } = useContext(ListContext) || {};

  // RENDER
  return (
    <Main>
      <Title
        documentTitle="Inventory -> In Stock"
        title="In Stock"
        tools={!mobile.mobile ? [
          <Button.Link icon="print" onClick={() => window.print()} />,
          <Tooltip tip="Export to Excel">
            <DownloadButton
              icon="download-excel"
              endpoint={ENDPOINTS.inventory.list}
              filters={{ activecolumns: showColumns.toString(), inventoryType: 'I', ...filters }}
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
            filters={{ inventoryType: 'I' }}
          />
        ]}
      />
      {mobile.mobile && (
        <div style={{ height: '65px' }}>
          <Form.Row className="mb-5">
            <Form.Col className="mr-3">
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
        </div>
      )}
      <Filters>
        <Filters.Button.SalesType />
        <Filters.Button.NewUsed />
        <Filters.Select.InventoryStatus
          lookupParams={{
            inventoryType: INVENTORY_TYPE.inStock.code
          }}
        />
        <Filters.Select.InventorySource
          lookupParams={{ listPage: '1' }}
        />
        <Filters.Search />
        <Table.Columns />
      </Filters>
      <Table lastCol="Inventory Location" />
    </Main>
  )
})

// EXPORT
export default getListData(InStock, {
  key: 'inStock',
  fetchArgs: {
    endpoint: ENDPOINTS.inventory.list,
    params: {
      inventoryType: INVENTORY_TYPE.inStock.code
    }
  },
  settings: SETTINGS,
  columns: [
    {
      ...COLUMNS.purchased,
      xs: 3
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
    {
      ...COLUMNS.status,
      xs: 8
    },
    {
      ...COLUMNS.location,
      xs: 8
    },
    {
      ...COLUMNS.warranty,
      xs: 8
    },
    {
      ...COLUMNS.key,
      xs: 8
    },
    {
      ...COLUMNS.spareKey,
      xs: 8
    },
    {
      ...COLUMNS.homenet,
      xs: 8
    },
    {
      ...COLUMNS.detail,
      xs: 8
    },
    {
      ...COLUMNS.inspection,
      xs: 8
    },
    {
      ...COLUMNS.emission,
      xs: 8
    },
    {
      ...COLUMNS.picture,
      xs: 8
    },
    {
      ...COLUMNS.miscellaneous,
      xs: 8
    },
  ]
})
