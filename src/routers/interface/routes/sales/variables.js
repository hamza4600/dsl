import { ENDPOINTS } from 'endpoints.js';

export const PRINT_OPTIONS = [
  { value: ENDPOINTS.sales.print.buyersOrder, label: 'Buyers Order' },
  { value: ENDPOINTS.sales.print.recap, label: 'Gross Recap' },
  { value: ENDPOINTS.sales.print.cleanUp, label: 'Clean Up Form' },
  { value: ENDPOINTS.sales.print.twg, label: 'TWG Cancellation' }
];

export const OWE_ITEM_COLUMNS = [
  {
    key: 'item_cost',
    label: '#',
    size: 1
  },{
    key: 'item_price',
    label: 'Amount',
    size: 3
  },{
    key: 'item_name',
    name: 'item_name',
    label: 'Description',
    size: 9
  }
];

export const OTHER_ITEM_COLUMNS = [
  {
    key: 'item_cost',
    label: '#',
    size: 1
  },{
    key: 'other_item_cost',
    label: 'Amount',
    size: 3
  },{
    key: 'other_item',
    name: 'other_item',
    label: 'Description',
    size: 9
  }
];

export const BANK_FEE_COLUMNS = [
  {
    key: 'item_cost',
    label: '#',
    size: 1
  },{
    key: 'item_Amount',
    label: 'Amount',
    size: 3
  },{
    key: 'item_name',
    name: 'item_name',
    label: 'Description',
    size: 9
  }
];

export const DEALER_PACK_COLUMNS = [
  {
    key: 'item_cost',
    label: '#',
    size: 1
  },{
    key: 'item_Amount',
    label: 'Dealer Pack',
    size: 3
  },{
    key: 'item_name',
    name: 'item_name',
    label: 'Description',
    size: 9
  }
];

export const DEALER_INCENTIVE_COLUMNS = [
  {
    key: 'item_cost',
    label: '#',
    size: 1
  },{
    key: 'item_Amount',
    label: 'Dealer Incentive',
    size: 3
  },{
    key: 'item_name',
    name: 'item_name',
    label: 'Description',
    size: 9
  }
];

export const CUSTOMER_TYPES = [
  {
    label: 'Individual',
    value: '1'
  },{
    label: 'Organization',
    value: '2'
  }
];

export const SALE_TYPES = [
  {
    label: 'Retail',
    value: '1'
  },{
    label: 'Wholesale',
    value: '2'
  }
];

export const SALES_TABS = [
  {
    label: 'Comments',
    sprite: 'comments',
    counterKey: 'commentsCount',
    key: 'C'
  },{
    label: 'Recent Activity',
    sprite: 'activity',
    key: 'A'
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

export const CUSTOMER_IS_EMPLOYEE = [
  {
    label: 'Yes',
    value: 'true'
  },{
    label: 'No',
    value: 'false'
  }
];

export const TRUE_FALSE = [
  {
    label: 'Yes',
    value: 'true'
  },{
    label: 'No',
    value: 'false'
  }
];

export const PURCHASE_TYPES = [
  {
    label: 'Purchase',
    value: '1'
  },{
    label: 'Lease',
    value: '2'
  }
];

export const FILE_TYPE_IDS = {
  FACTORY_INVOICE_NEW: 1,
  PURCHASE_INVOICE_USED: 2,
  MSRP_STICKER_NEW: 3
};
