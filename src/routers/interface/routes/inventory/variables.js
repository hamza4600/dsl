// GLOBAL VARIABLES
import {
  DETAILS,
  EMISSION,
  HOMENET_STATUS,
  IMV_STATUS,
  INSPECTION,
  INVENTORY_LOCATION,
  INVENTORY_STATUS,
  KEY_STATUS,
  NEW_USED,
  PICTURE_STATUS,
  RETAIL_WHOLESALE,
  SPARE_KEY_STATUS,
  WARRANTY_STATUS
} from 'codes.js';
import { INTERFACE } from 'pathnames.js';
import { ENDPOINTS } from 'endpoints';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Number from 'core/tools/Number';
import Table from 'parts/table/Table';

// DEPENDENCIES
import moment from 'moment';

// LOCAL COMPONENTS
import { formatDate } from 'functions';
import PriceAdjustment from './tools/PriceAdjustment';
import PriceAfterAdjustment from './tools/PriceAfterAdjustment';

// EXPORTS

const st = {
  header: 'Status',
  tips: [
    {
      label: 'PS ',
      description: '= Pre-Stock: The originating deal of this trade-in has not been delivered.'
    },
    {
      label: 'O ',
      description: `= Order: Vehicle is sold, marked as order and is still in inventory and 
    it's deal is in Order section.`
    },
    {
      label: 'I ',
      description: '= In Stock: Vehicle is cleared for sale.'
    },
    {
      label: 'S ',
      description: `= Vehicle is sold but not delivered and is still in inventory and
   it's deal is in AM / Finance section. `
    },
    {
      label: 'F ',
      description: '= Fallout: Vehicle was once sold and not delivered and deal was terminated.'
    },
    {
      label: 'B ',
      description: '= Backout: Vehicle was once sold and delivered and deal was terminated.'
    }
  ]
};
const loc = {
  header: 'LOC',
  tips: [
    {
      label: '(PSL) ',
      description: 'Purchased - At Source Location.'
    },
    {
      label: '(PIT) ',
      description: 'Purchased - In Transit.'
    },
    {
      label: '(CAD) ',
      description: 'Checked In and At Dealership Location.'
    },
    {
      label: '(CND) ',
      description: 'Checked In and Not At Dealership Location.'
    }
  ]
};

const src = {
  header: 'Inventory Source',
  tips: [
    {
      label: 'D - ',
      description: 'Dealer DX'
    },
    {
      label: 'M - ',
      description: 'Manufacturer'
    },
    {
      label: 'O - ',
      description: 'Other'
    },
    {
      label: 'P - ',
      description: 'Purchase'
    },
    {
      label: 'T - ',
      description: 'Trade'
    }
  ]
};

export const SETTINGS = {
  path: INTERFACE.inventory,
  recordIDKey: 'stock_num'
};

export const COLUMNS = {
  // Dates
  purchased: {
    key: 'purchase_date',
    name: 'Purchased Date',
    label: 'PDate',
    format: formatDate,
    size: 'sm'
  },
  delivered: {
    key: 'delivered_date',
    name: 'Delivered Date',
    label: 'DDate',
    format: formatDate,
    size: 'sm'
  },
  funded: {
    key: 'funded_date',
    name: 'Funded Date',
    label: 'FDate',
    format: formatDate,
    size: 'sm'
  },
  // Vehicle Info
  stockNum: {
    key: 'stock_num',
    name: 'Stock Number',
    label: 'Stock#',
    size: 'md',
    stateKeys: ['daily_sales_inventory_id_list'],
    component: Table.View,
    includeCurrentPath: true
  },
  makeModel: {
    key: 'make_model',
    name: 'Vehicle Year, Make & Model',
    label: 'Vehicle',
    size: 'lg'
  },
  mileage: {
    key: 'mileage',
    name: 'Total Mileage',
    label: 'Miles',
    size: 'sm',
    component: Number.Miles
  },
  // Inventory Info
  saleType: {
    key: 'sales_type',
    name: 'Retail/Wholesale',
    label: 'R/W',
    size: 'xs',
    // align: 'center',
    component: Table.Variants,
    codes: RETAIL_WHOLESALE
  },
  newUsed: {
    key: 'new_used',
    name: 'New/Pre-Owned',
    label: 'N/P',
    size: 'xs',
    // align: 'center',
    component: Table.Variants,
    codes: NEW_USED
  },
  age: {
    key: 'age',
    name: 'Inventory Age',
    label: 'Age',
    // align: 'center',
    size: 'xs'
  },
  source: {
    key: 'inventory_source_code',
    name: 'Inventory Source',
    label: 'SRC',
    tooltips: src,
    size: 'xs',
    // align: 'center',
    placement: 'right',
    component: Table.Variants,
  },
  status: {
    key: 'inventory_status',
    name: 'Inventory Status',
    tooltips: st,
    label: 'ST',
    size: 'xs',
    align: 'center',
    placement: 'left',
    component: Table.Variants,
    codes: INVENTORY_STATUS
  },
  location: {
    key: 'inventory_location',
    name: 'Inventory Location',
    tooltips: loc,
    label: 'LOC',
    size: 'xs',
    // align: 'center',
    placement: 'right',
    component: Table.Variants,
    codes: INVENTORY_LOCATION
  },
  // Prices
  acv: {
    key: 'acv',
    name: 'Actual Cash Value',
    label: 'ACV',
    size: 'md',
    component: Table.Number.Dollars
  },
  dmsInvoice: {
    key: 'dms_invoice',
    name: 'DMS Invoice',
    label: 'DMS Inv',
    size: 'md',
    component: Table.Number.Dollars
  },
  advertisedPrice: {
    key: 'advertised_price',
    label: 'Advertised',
    name: 'Advertised Price',
    size: 'md',
    component: Table.Number.Dollars
  },
  priceAdjustmnet: {
    key: 'adjustment_price',
    label: '+/- Adjustment',
    name: '+/- Adjustment ',
    price: 'advertised_price',
    imv:   'imv_price',
    sortable:false,
    component: PriceAdjustment,
    size: 'xl'
  },
  // IMV
  imvTrim: {
    key: 'imv_trim',
    label: 'IMV Trim',
    name: 'IMV Trim ',
    size: 'sm',
    component: Table.Code,
    codes: IMV_STATUS
  },

  imvEngine: {
    key: 'imv_engine',
    label: 'IMV Engine',
    name: 'IMV Engine ',
    size: 'sm',
    component: Table.Code,
    codes: IMV_STATUS
  },

  imvTrans: {
    key: 'imv_trans',
    label: 'IMV Trans',
    name: 'IMV Trans ',
    size: 'sm',
    component: Table.Code,
    codes: IMV_STATUS
  },

  imvOptions: {
    key: 'imv_options',
    label: 'IMV Options',
    name: 'IMV Options ',
    size: 'md',
    component: Table.Code,
    codes: IMV_STATUS
  },

  imvHighPrice: {
    key: 'imv_high_price',
    label: 'IMV High',
    name: 'IMV High Price',
    size: 'md',
    component: Table.Number.Dollars
  },

  imvFairPrice: {
    key: 'imv_fair_price',
    label: 'IMV Fair',
    name: 'IMV Fair Price',
    size: 'md',
    component: Table.Number.Dollars
  },
  imvGoodPrice: {
    key: 'imv_good_price',
    label: 'IMV Good',
    name: 'IMV Good Price',
    size: 'md',
    component: Table.Number.Dollars
  },
  imvFairDifference: {
    key: 'imv_fair_price_difference',
    label: '+/- IMV',
    name: '+/- IMV Price',
    size: 'md',
    component: Table.Number.Dollars
  },
  imvLabel: {
    key: 'imv_label',
    label: 'IMV Label',
    name: 'IMV Label.',
    size: 'md'
  },
  imvUpdated: {
    key: 'imv_updated',
    label: 'Last IMV Update',
    name: 'Update',
    format: formatDate,
    size: 'md'
  },

  imvPrice: {
    key: 'imv_price',
    name: 'Price After Adjustment ',
    price: 'adjusted_price',
    label: 'Price after adjustment',
    size: 'md'
  },
  priceAfterAdjustmnet: {
    key: 'adjusted_price',
    name: 'Price After Adjustment ',
    label: 'Price after adjustment',
    sortable:false,
    size: 'lg',
    component: PriceAfterAdjustment
  },

  // STATUSES
  warranty: {
    key: 'warranty',
    name: 'Warranty Type',
    label: 'WT',
    size: 'xs',
    align: 'center',
    component: Table.Code,
    codes: WARRANTY_STATUS
  },
  key: {
    key: 'key_status_code',
    name: 'Key Info',
    label: 'KEY',
    size: 'xs',
    foo: 'bar',
    align: 'center',
    component: Table.Variants,
    codes: KEY_STATUS
  },
  spareKey: {
    key: 'spare_key_status_code',
    name: 'Spare Key',
    label: 'SPR',
    size: 'xs',
    align: 'center',
    component: Table.Variants,
    codes: SPARE_KEY_STATUS
  },
  homenet: {
    key: 'homenet_status_code',
    name: 'Homenet',
    label: 'HNT',
    size: 'xs',
    align: 'center',
    component: Table.Variants,
    codes: HOMENET_STATUS
  },
  detail: {
    key: 'detail_status_code',
    name: 'Detail & Cleanup Status',
    label: 'DTL',
    size: 'xs',
    align: 'center',
    component: Table.Variants,
    codes: DETAILS
  },
  inspection: {
    key: 'inspection_status_code',
    name: 'Inspection Status',
    label: 'INS',
    size: 'xs',
    align: 'center',
    component: Table.Variants,
    codes: INSPECTION
  },
  emission: {
    key: 'emission_status_code',
    name: 'Emission Status',
    label: 'EMI',
    size: 'xs',
    align: 'center',
    component: Table.Variants,
    codes: EMISSION
  },
  picture: {
    key: 'picture_status_code',
    name: 'Picture Status',
    label: 'PIC',
    size: 'xs',
    align: 'center',
    component: Table.Variants,
    codes: PICTURE_STATUS
  },
  miscellaneous: {
    key: 'miscellaneous_status_code',
    name: 'Miscellaneous Status',
    label: 'MSC',
    size: 'xs',
    align: 'center',
    component: Table.Variants,
    codes: DETAILS,
    sortable: false
  }
};

// OPTIONS
export const INVENTORY_LOCATIONS = [
  {
    label: 'Purchased - At Source Location (PSL)',
    value: 1
  },
  {
    label: 'Purchased - In Transit (PIT)',
    value: 2
  },
  {
    label: 'Incoming New Vehicle from Factory (INC)',
    value: 5
  }
];

export const PURCHASE_METHOD = [
  {
    label: 'Trade',
    value: 1
  },
  {
    label: 'Purchase',
    value: 2
  }
];

export const INVENTORY_SOURCE_IDS = {
  PURCHASE_FROM_CUSTOMER_FOR_INVENTORY: 3,
  MANUFACTURER: 4,
  PURCHASE_FROM_OTHER: 6,
  TRADE: 7,
  DEALER_DX: 8
};

export const FILE_TYPE_IDS = {
  FACTORY_INVOICE_NEW: 1,
  OTHER_NEW: 2,
  PURCHASE_INVOICE_USED: 3,
  OTHER_USED: 4,
  MSRP_STICKER_NEW: 5,
  BILL_OF_LADING_NEW: 6,
  BILL_OF_LADING_USED: 7,
  DX_DOCUMENTS_NEW: 8,
  DX_DOCUMENTS_USED: 9,
  INVENTORY_DETAIL_NEW: 10,
  INVENTORY_DETAIL_USED: 11,
  REPAIR_INVOICE_NEW: 12,
  REPAIR_INVOICE_USED: 13
};

export const LOCATION_TYPE_IDS = {
  CAD: 3
};

export const LOCATION_TYPE = [
  {
    name: 'Purchased - At Source Location',
    key: 'PSL'
  },
  {
    name: 'Purchased - In Transit',
    key: 'PIT'
  },
  {
    name: 'Checked In and At Dealership',
    key: 'CAD'
  },
  {
    name: 'Checked In and Not At Dealership',
    key: 'CND'
  },
  {
    name: 'Incoming New Vehicle from Factory',
    key: 'INC'
  }
];

export const LOCATION_CHECK_LIST = [
  {
    label: 'Purchased - At Source Location (PSL)',
    value: 'PSL'
  },
  {
    label: 'Purchased - In Transit (PIT)',
    value: 'PIT'
  },
  {
    label: 'Incoming New Vehicle from Factory (INC)',
    value: 'INC'
  }
];

export const VEHICLE_INFO_GENERAL = [
  {
    key: 'stock_num',
    label: 'Stock #'
  },
  {
    key: 'vin_num',
    label: 'VIN #'
  },
  {
    key: 'new_used',
    label: 'Type',
    renderValue: value => (!!value ? 'New' : 'Pre-Owned')
  },
  {
    key: 'located_at_dealership',
    name: 'locatedAtDealership',
    label: 'Is The Vehicle Physically At The Dealership?',
    component: props => <Form.YesNo size="sm" {...props} />
  },
  {
    key: 'location_type_id',
    label: 'Location',
    renderValue: value => {
      return value ? `${LOCATION_TYPE[value - 1].name} (${LOCATION_TYPE[value - 1].key})` : '-';
    }
  },
  {
    key: 'location_comments',
    label: 'Location Comments'
  },
  {
    key: 'vehicle_year',
    label: 'Year'
  },
  {
    key: 'make',
    label: 'Make'
  },
  {
    key: 'model',
    label: 'Model'
  },
  {
    key:'model_code',
    label: 'Model Code'
  },
  {
    key: 'vehicle_trim',
    label: 'Trim'
  },
  {
    key: 'body_style',
    label: 'Body Style'
  },
  {
    key: 'engine',
    label: 'Engine'
  },
  {
    key: 'transmission_name',
    label: 'Transmission'
  },
  {
    key: 'drivetrain_name',
    label: 'Drivetrain'
  },
  {
    key: 'ext_color',
    label: 'Exterior'
  },
  {
    key: 'int_color',
    label: 'Interior'
  },
  {
    key: 'warranty_type_name',
    label: 'Warranty Type'
  },
  {
    key: 'mileage',
    label: 'Mileage'
  }
];

export const VEHICLE_INFO_PURCHASE_INFO = [
  {
    key: 'date_created',
    label: 'Date Added',
    renderValue: value => moment(value).format('MM/DD/YYYY')
  },
  {
    key: 'created_by',
    label: 'Added By'
  },
  {
    key: 'purchase_date',
    label: 'Purchase Date',
    renderValue: value => moment(value).format('MM/DD/YYYY')
  },
  {
    key: 'acquired_salesperson_name',
    label: 'Acquired By',
    forbiddenCodes: ['S', 'PS', 'I']
  },
  {
    key: 'appraised_by',
    label: 'Appraised By',
    forbiddenCodes: ['S', 'PS', 'O', 'I', 'F', 'B']
  },
  {
    key: 'age_of_vehicle',
    label: 'Age',
    renderValue: value => `${value || 0} days`
  },
  {
    key: 'inventory_source_method_name',
    label: 'Source Method',
    hasDate: true,
    dateKey: 'purchase_date'
  },
  {
    key: 'inventory_source',
    label: 'Source'
  },
  {
    key: 'source_name',
    label: 'Source Name'
  }
];

export const PRINT_OPTIONS = [
  {
    label: 'Vehicle Info',
    endpoint: ENDPOINTS.print.inventory.vehicleInfo
  },
  {
    label: 'Buyer\'s Guide',
    endpoint: ENDPOINTS.print.inventory.buyersGuide
  },
  {
    label: 'Permission to Drive',
    endpoint: ENDPOINTS.print.inventory.permissionToDrive
  },
  // {
  //   label: 'Request/Pending Detail Form',
  //   endpoint: ENDPOINTS.print.inventory.requestDetail
  // },
  // {
  //   label: 'Cleanup Form',
  //   endpoint: ENDPOINTS.print.inventory.requestCleanup,
  //   //IF STATUS SOLD ADD TO PATH ?salesId=:salesID
  // }
];

export const CONVERT_REASON = [
  {
    label: 'Mileage is over limit',
    key: 'mileage-over-limit',
    value: 1
  },
  {
    label: 'Age of vehicle',
    key: 'age-of-vehicle',
    value: 2
  },
  {
    label: 'Other',
    key: 'other',
    value: 3
  }
];

export const INVENTORY_TABS = [
  {
    label: 'Sales',
    sprite: 'delivery-log',
    counterKey: 'salesCount',
    key: 'S'
  },
  {
    label: 'Comments',
    sprite: 'comments',
    counterKey: 'commentsCount',
    key: 'C'
  },
  {
    label: 'Activity',
    sprite: 'activity',
    key: 'A'
  }
];

export const VEHICLE_STATUS = [
  {
    value: 'Sold',
    key: 'S'
  },
  {
    value: 'Pre Stock',
    key: 'PS'
  },
  {
    value: 'Order',
    key: 'O'
  },
  {
    value: 'In Stock',
    key: 'I'
  },
  {
    value: 'Fallout',
    key: 'F'
  },
  {
    value: 'Backout',
    key: 'B'
  }
];

export const ACTIVITY_LABELS = {
  date_created: 'Date Added',
  created_by: 'Added By',
  purchase_date: 'Purchase Date',
  acquired_salesperson_name: 'Acquired By',
  appraised_by: 'Appraised By',
  age_of_vehicle: 'Age',
  inventory_source_method_name: 'Source Method',
  inventory_source: 'Source',
  source_name: 'Source Name',
  leadar_api_request: 'LeadAR API',
  attachment_filename: 'File Attachment',
  retail_price: 'Retail Price',
  invoice_cost: 'Invoice Cost',
  stock_num: 'Stock #',
  vin_num: 'VIN #',
  new_used: 'Type',
  located_at_dealership: 'Is The Vehicle Physically At The Dealership?',
  location_type_id: 'Location',
  location_comments: 'Location Comments',
  vehicle_year: 'Year',
  make: 'Make',
  model: 'Model',
  vehicle_trim: 'Trim',
  body_style: 'Body Style',
  engine: 'Engine',
  transmission_name: 'Transmission',
  drivetrain_name: 'Drivetrain',
  ext_color: 'Exterior',
  int_color: 'Interior',
  warranty_type_name: 'Warranty Type',
  mileage: 'Mileage'
};

export const TRACKING_TYPES = [
  {
    id: 2,
    key: 'keyInfo',
    label: 'Key Info',
  },
  {
    id: 3,
    key: 'spareKey',
    label: 'Spare Key',
    options: [
      {label: 'Need to Ask Customer', value: 25},
      {label: 'None', value: 5},
      {label: 'Customer to Provide', value: 6},
      {label: 'Available', value: 7},
      {label: 'Given to Customer', value: 24}
    ]
  },
  {
    id: 4,
    key: 'homenet',
    label: 'Homenet',
  },
  {
    id: 6,
    key: 'detailCleanUp',
    label: 'Detail & Clean Up',
    options: [
      {label: 'Need to Determine', value: 26},
      {label: 'None', value: 9},
      {label: 'Request / Pending Detail', value: 10},
      {label: 'Request / Pending Detail to Clean Up', value: 11},
      {label: 'Completed', value: 12}
    ]
  },
  {
    id: 7,
    key: 'inspection',
    label: 'Inspection',
    options: [
      {label: 'Need to Determine', value: 30},
      {label: 'None', value: 135},
      {label: 'Request / Pending Inspection', value: 133},
      {label: 'Completed', value: 14},
    ]
  },
  {
    id: 8,
    key: 'emission',
    label: 'Emission',
    options: [
      {label: 'Need to Determine', value: 29},
      {label: 'None', value: 136},
      {label: 'Request / Pending', value: 134},
      {label: 'Completed', value: 16},
    ]
  },
  {
    id: 9,
    key: 'photo',
    label: 'Photos',
    options: [
      {label: 'None', value: 137},
      {label: 'No Photos Available', value: 19},
      {label: 'Available', value: 20},
    ]
  },
  {
    id: 10,
    key: 'misc',
    label: 'Miscellaneous'
  },
];

export const IMV_ADJUSTMENT_PRICE_OPTIONS = [
  {
    label: 'By Selling Price',
    icon: '$',
    value: 1
  },
  {
    label: 'By Selling Price in %',
    icon: '%',
    value: 2
  },
  {
    label: 'By IMV Price',
    icon: '$',
    value: 3
  },
  {
    label: 'By IMV Price in %',
    icon: '%',
    value: 4
  }
]

export const IMV_RESULTS_KEYS = [
  {key: 'updatedon', label: 'Updated on'},
  {key: 'adPriced', label: 'Advertised Price'},
  {key: 'imvHigh', label: 'IMV High'},
  {key: 'imvFair', label: 'IMV Fair'},
  {key: 'imvGood', label: 'IMV Good'},
  {key: 'aboveBelowIMF', label: 'Above/Below IMF Fair'},
  {key: 'imvLabel', label: 'IMV Label'}
];