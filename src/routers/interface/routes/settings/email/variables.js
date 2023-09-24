// GLOBAL VARIABLES
import { INTERFACE, SETTINGS as SETTINGS_PATHS } from 'pathnames.js';

// GLOBAL COMPONENTS
import { makePath } from 'functions';

// LOCAL COMPONENTS
import Table from 'parts/table/Table';

// EXPORTS
export const SETTINGS = {
  path:        makePath(INTERFACE.settings, SETTINGS_PATHS.emailSettings),
  recordIDKey: 'dealer_email_setting_id',
}

export const COLUMNS = {
  name: {
    key:       'dealer_email_setting_type_name',
    label:     'Template Name',
    size:      'md',
    sortable:  false,
  },
  description: {
    key:       'dealer_email_setting_type_description',
    label:     'Description',
    size:      'lg',
    sortable:  false,
  },
  active: {
    key:       'is_active',
    name:      'Active/Inactive',
    label:     'Active',
    size:      'sm',
    align:     'center',
    sortable:  false,
    component:  Table.Boolean,
  },
  edit: {
    key:       'dealer_email_setting_id',
    label:     '',
    size:      'sm',
    sortable:  false,
    component: Table.Edit
  },
}

export const ACTION = {
  LOAD_DATA: 'LOAD_DATA',
  UPDATE_ACTIVE: 'UPDATE_ACTIVE',
  ADD_RECIPIENT: 'ADD_RECIPIENT',
  UPDATE_RECIPIENT: 'UPDATE_NAME',
  DETELE_RECIPIENT: 'DETELE_RECIPIENT',
}
