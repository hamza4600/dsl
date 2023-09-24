export const SITE_TITLE = 'Daily Sales Log (DSL)';
export const LOGO_TITLE = 'Daily Sales Log '
export const SHORT_TITLE = 'DSL';
export const PATH = 'dsl';
export const VERSION = process.env.REACT_APP_VERSION;
export const COPYRIGHT = '© Geneva Media Services LLC';

export const ENVIRONMENTS = {
  dev: {
    hostname: process.env.REACT_APP_DEV_API_HOST,
    url: process.env.REACT_APP_DEV_API_URL,
    key: process.env.REACT_APP_DEV_API_KEY
  },
  test: {
    hostname: process.env.REACT_APP_TEST_API_HOST,
    url: process.env.REACT_APP_TEST_API_URL,
    key: process.env.REACT_APP_TEST_API_KEY
  },
  stage: {
    hostname: process.env.REACT_APP_STAGE_API_HOST,
    url: process.env.REACT_APP_STAGE_API_URL,
    key: process.env.REACT_APP_STAGE_API_KEY
  },
  prod: {
    hostname: process.env.REACT_APP_PROD_API_HOST,
    url: process.env.REACT_APP_PROD_API_URL,
    key: process.env.REACT_APP_PROD_API_KEY
  }
};

export const DEBUG = false;

// UI

export const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 1250,
  xl: 1800
};

export const VARIANTS = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];

export const TIMES = {
  configurationTimerLength: 12, // in hours
  modalDuration: 2, // in seconds
  reauthWarningTime: 2, // in minutes
  sessionTimerLength: 5, // in seconds
  transitionDuration: 150, // in milliseconds
  tooltipDelay: 500 // in milliseconds
};

export const MENU_WIDTHS = {
  sm: true,
  lg: false
};

export const TABLE_ROWS = {
  default: 50,
  options: [10, 25, 50, 100]
};

export const SORT_ORDER = {
  ascending: 'A',
  descending: 'D'
};

export const MODAL_PRIORITY = {
  low: -1,
  default: 0,
  high: 2,
  override: 3
};

// DEFAULT OPTIONS

export const YEAR_LENGTH = 2;

// DATA

export const DELIVERY_METHOD = {
  email: 'E',
  text: 'T'
};

export const USER_ROLE = [
  {
    name: 'Application Admin',
    key: 'APPADM'
  },
  {
    name: 'Application Master',
    key: 'APMSTR'
  },
  {
    name: 'Application User',
    key: 'APPUSR'
  },
  {
    name: 'Dealership Store Admin',
    key: 'DADMIN'
  }
];

export const IMV_LABELS = ['Fair', 'Good', 'Great', 'High', 'Overpriced'];

export const PRODUCT_TYPES = ['AM', 'F&I'];
export const NEW_USED_TYPES = ['Pre-Owned', 'New'];

// DATES

export const DATE_FORMATS = {
  date: 'MM/dd/yyyy',
  dateTime: 'MM/dd/yyyy h:mm aa'
};
