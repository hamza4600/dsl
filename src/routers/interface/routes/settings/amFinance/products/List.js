//DEPENDENCIES
import React, { useContext } from 'react';

// GLOBAL HELPERS
import { getListData, ListContext } from 'helpers/getListData';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';
import { INTERFACE, SETTINGS, AM_FINANCE } from 'pathnames';
import { NEW_USED } from 'codes';

// GLOBAL FUNCITONS
import { makePath } from 'functions';

// GLOBAL COMPONENTS
import Main from 'parts/main/Main';
import Collapse from 'parts/table/types/collapse/Collapse';
import Button from 'core/tools/Button';

// LOCAL COMPONENTS
import Title from 'parts/title/Title';
import Filters from 'parts/filters/Filters';

// LOCAL VARIABLES
import { COLUMNS, PRODCUTS_SETTINGS } from './variables';

// MAIN COMPONENT
const ProductList = () => {

  // CONTEXT
  const { result } = useContext(ListContext) || {};

  return (
    <Main>
      <Title
        documentTitle="AM/Finance Products"
        title="AM/Finance Products"
        tools={[
          <Button.Add
            label="Add Preowned (AM)"
            to={`${makePath(
              INTERFACE.settings,
              SETTINGS.amFinance,
              AM_FINANCE.products,
              'add'
            )}?product_type=0&new_used=${NEW_USED.used.numeric}`}
          />,
          <Button.Add
            label="Add New (AM)"
            to={`${makePath(
              INTERFACE.settings,
              SETTINGS.amFinance,
              AM_FINANCE.products,
              'add'
            )}?product_type=0&new_used=${NEW_USED.new.numeric}`}
          />,
          <Button.Add
            label="Add Preowned (F&I)"
            to={`${makePath(
              INTERFACE.settings,
              SETTINGS.amFinance,
              AM_FINANCE.products,
              'add'
            )}?product_type=1&new_used=${NEW_USED.used.numeric}`}
          />,
          <Button.Add
            label="Add New (F&I)"
            to={`${makePath(
              INTERFACE.settings,
              SETTINGS.amFinance,
              AM_FINANCE.products,
              'add'
            )}?product_type=1&new_used=${NEW_USED.new.numeric}`}
          />
        ]}
      />

      <Filters>
        <Filters.Select.Active />
        <Filters.Select.NewUsed />
        <Filters.Select.SalesType />
        <Filters.Select.ProductType />
        <Filters.Search name="productName" placeholder="Search by product name" />
        <Filters.Reset />
      </Filters>

      <div>
        {result.map(({ sale_type_category_id, sale_type_category, products = [] }, i) => (
          <Collapse index={i} key={sale_type_category_id} title={sale_type_category} data={products} />
        ))}
      </div>
    </Main>
  );
}

// EXPORT
export default getListData(ProductList, {
  key: PRODCUTS_SETTINGS.path,
  fetchArgs: {
    endpoint: makePath(ENDPOINTS.admin.amFinance.products, 'list'),
  },
  settings: PRODCUTS_SETTINGS,
  columns: [
    COLUMNS.productType,
    COLUMNS.newUsed,
    COLUMNS.productName,
    COLUMNS.productCode,
    COLUMNS.updatedOn,
    COLUMNS.updatedBy,
    COLUMNS.isActive,
    COLUMNS.order,
    COLUMNS.edit
  ]
});
