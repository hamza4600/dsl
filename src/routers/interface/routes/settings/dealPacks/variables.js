// GLOBAL FUNCITONS
import { makePath } from 'functions';

// GLOBAL VARIABLES
import { NEW_USED } from 'codes';
import { INTERFACE, SETTINGS as PATH_SETTINGS } from 'pathnames.js';

//GLOBAL COMPONENTS
import Table from 'parts/table/Table';

// EXPORTS
export const PAGE_SETTINGS = {
  path:        makePath(INTERFACE.settings, PATH_SETTINGS.inventoryPacks),
  recordIDKey: 'dealer_pack_id',
}

export const COLUMNS = {
  // DEAL PACKS
  updatedOn: {
    key:       'date_updated',
    label:     'Updated On',
    size:      'md',
    sortable:  false,
    component: Table.Date
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
  packTitle: {
    key:       'pack_title',
    label:     'Title',
    size:      'md',
    sortable:  false,
  },
  packAmount: {
    key:       'pack_amount',
    label:     'Amount',
    size:      'xs',
    sortable:  false,
    component:  Table.Number.Dollars,
  },
  isActive: {
    key:       'is_active',
    name:      'Active/Inactive',
    label:     'Active',
    size:      'xs',
    align:     'center',
    sortable:  false,
    component:  Table.Boolean,
  },
  updatedBy: {
    key:       'updated_by',
    label:     'User',
    size:      'sm',
    sortable:  false,
  },
  edit: {
    key:       'dealer_pack_id',
    name:      '',
    size:      'xs',
    sortable:  false,
    component:  Table.Edit,
  },
}
