// GLOBAL FUNCITONS
import { makePath } from 'functions';

// GLOBAL VARIABLES
import { INTERFACE, AM_FINANCE } from 'pathnames.js';

// GLOBAL COMPONENTS
import Table from 'parts/table/Table';
import { NEW_USED } from 'codes';

// EXPORTS
export const PRODCUTS_SETTINGS = {
  path: makePath(INTERFACE.amFinance, AM_FINANCE.products),
  recordIDKey: 'dealer_amfinance_id'
}

export const COLUMNS = {
  productType: {
    key: 'product_type',
    label: 'Product Type',
    size: 'sm',
    sortable: false,
  },
  newUsed: {
    key: 'new_used',
    name: 'New/Pre-Owned',
    label: 'N/P',
    size: 'sm',
    align: 'center',
    numeric: true,
    sortable: false,
    codes: NEW_USED,
    component: Table.Code
  },
  productName: {
    key: 'product_title',
    label: 'Product Name',
    size: 'sm',
    sortable: false
  },
  productCode: {
    key: 'product_code',
    label: 'Product Code',
    size: 'lg',
    sortable: false
  },
  updatedOn: {
    key: 'updated_on',
    name: 'Updated On',
    size: 'sm',
    sortable: false,
    component: Table.Date
  },
  updatedBy: {
    key: 'updated_by',
    name: 'User',
    size: 'sm',
    sortable: false
  },
  isActive: {
    key: 'is_active',
    name: 'Active/Inactive',
    label: 'Active',
    size: 'sm',
    align: 'center',
    sortable: false,
    component: Table.Boolean
  },
  order: {
    key: 'sort_order',
    name: 'Order',
    size: 'sm',
    sortable: false
  },
  edit: {
    key: 'dealer_amfinance_id',
    name: '',
    size: 'sm',
    sortable: false,
    component: Table.Edit,
  }
}