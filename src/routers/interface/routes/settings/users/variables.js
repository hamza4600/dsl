// GLOBAL FUNCITONS
import { makePath } from 'functions';

// GLOBAL VARIABLES
import { SETTINGS } from 'pathnames.js';

// EXPORTS
export const USER_SETTINGS = {
  path: makePath(SETTINGS.user),
  recordIDKey: 'site_user_id'
}

export const COLUMNS = {
  firstName: {
    key: 'first_name',
    label: 'First Name',
    size: 'sm',
    sortable: false
  },
  lastName: {
    key: 'last_name',
    label: 'Last Name',
    size: 'sm',
    sortable: false
  },
  cell: {
    key: 'cell_phone_number',
    label: 'Cell',
    size: 'sm',
    sortable: false
  },
  email: {
    key: 'email_address',
    label: 'Email',
    size: 'lg',
    sortable: false
  },
  lastLogin: {
    key: 'last_login_date',
    name: 'Last Login',
    size: 'sm',
    sortable: false
  }
}