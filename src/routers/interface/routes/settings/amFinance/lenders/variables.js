// GLOBAL FUNCITONS
import { makePath } from 'functions';

// GLOBAL VARIABLES
import { AM_FINANCE, INTERFACE } from 'pathnames.js';

// GLOBAL COMPONENTS
import Table from 'parts/table/Table';

// EXPORTS
export const SETTINGS = {
  path: makePath(INTERFACE.amFinance, AM_FINANCE.lenders),
  recordIDKey: 'dsl_lender_id',
}

export const COLUMNS = {
  // LENDERS
  lender: {
    key:       'lender_name',
    label:     'Lender',
    size:      'lg',
    sortable:  false,
  },
  updatedOn: {
    key:       'date_updated',
    label:     'Updated On',
    size:      'sm',
    sortable:  false,
    component: Table.Date
  },
  updatedBy: {
    key:       'updated_by',
    label:     'User',
    size:      'sm',
    sortable:  false,
  },
  isActive: {
    key:       'is_active',
    name:      'Active/Inactive',
    label:     'Active',
    size:      'sm',
    align:     'center',
    sortable:  false,
    component: Table.Boolean,
  },
  edit: {
    key:       'dsl_lender_id',
    name:      '',
    size:      'sm',
    sortable:  false,
    component:  Table.Edit,
  },
}
