// GLOBAL VARIABLES
import { INTERFACE, SETTINGS as PATH_SETTINGS } from 'pathnames.js';
import { NEW_USED } from 'codes.js';

// GLOBAL FUNCITONS
import { makePath } from 'functions';

// GLOBAL COMPONENTS
import Table from 'parts/table/Table';

// EXPORTS
export const SETTINGS = {
  path: makePath(INTERFACE.settings, PATH_SETTINGS.customerRebates),
  recordIDKey: 'dealer_rebate_id',
}

export const COLUMNS = {
  updatedOn: {
    key:       'date_updated',
    name:      'Updated On',
    label:     'Updated On',
    size:      'sm',
    component:  Table.Date
  },
  effectiveDate: {
    key:       'effective_date',
    name:      'Effective Date',
    label:     'Date',
    size:      'sm',
    component:  Table.Date
  },
  expirationDate: {
    key:       'expiration_date',
    name:      'Expiration Date',
    label:     'Date',
    size:      'sm',
    component:  Table.Date
  },
  newUsed: {
    key:       'new_used',
    name:      'New/Pre-Owned',
    label:     'N/P',
    size:      'xs',
    align:     'center',
    sortable:  false,
    numeric:   true,
    codes:     NEW_USED,
    component: Table.Code,
  },
  rebateTitle: {
    key:       'rebate_title',
    label:     'Title',
    size:      'md',
    sortable:  false,
  },
  rebateProgramCode: {
    key:       'rebate_program_code',
    label:     'Program Code',
    size:      'md',
    sortable:  false,
  },
  rebateAmount: {
    key:       'rebate_amount',
    label:     'Amount',
    size:      'xs',
    sortable:  false,
    component:  Table.Number.Dollars,
  },
  autoRebate: {
    key:       'auto_rebate',
    label:     'Auto Apply',
    size:      'xs',
    sortable:  false,
    component:  Table.Boolean,
  },
  createdUser: {
    key:       'created_user_full_name',
    label:     'User',
    size:      'md',
    sortable:  false,
  },
  isActive: {
    key:       'is_active',
    name:      'Active/Inactive',
    label:     'Active',
    size:      'xs',
    align:     'center',
    sortable:  false,
    component:  Table.Boolean,
  }
}
