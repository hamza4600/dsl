// GLOBAL VARIABLES
import { INTERFACE, SETTINGS } from 'pathnames.js';

// GLOBAL FUNCITONS
import { makePath } from 'functions';

//GLOBAL COMPONENTS
import Table from 'parts/table/Table';

// EXPORTS
export const DEALER_FORM_SETTINGS = {
  path: makePath(INTERFACE.settings, SETTINGS.dealerForms),
  recordIDKey: 'dealer_form_id',
}

export const COLUMNS = {
  dateUpdated: {
    key: 'date_updated',
    label: 'Date Updated',
    size: 'md',
    sortable: false
  },
  formName: {
    key: 'form_name',
    label: 'Form Name',
    size: 'md',
    sortable: false
  },
  createdUserFullName: {
    key: 'created_user_full_name',
    label: 'Name',
    size: 'md',
    sortable: false
  },
  isActive: {
    key: 'is_active',
    label: 'Active',
    size: 'sm',
    sortable: false,
    component: Table.Boolean
  },
  isGlobal: {
    key: 'is_global',
    label: 'Global',
    size: 'sm',
    sortable: false,
    component: Table.Boolean
  },
  edit: {
    key: 'dealer_form_id',
    name: '',
    size: 'sm',
    sortable: false,
    component: Table.Edit
  }
}