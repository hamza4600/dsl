import DailySalesAdd from "./parts/DailySalesAdd";
import EntryWIthIcon from "./parts/EntryWithIcon";

export const DAILY_SALES_TYPES = ['New Deliveries', 'Pre-Owned Deliveries'];
export const DAILY_SALES_OPTIONS = [
  {
    key   : 'new',
    label : 'New',
    value : 'New Deliveries',
    count : 0,
  },
  {
    key   : 'preowned',
    label : 'Preowned',
    value : 'Pre-Owned Deliveries',
    count : 0,
  },
  {
    key   : 'all',
    label : 'All',
    value : '',
    count : 0,
  }
]

export const DAILY_SALES_KEYS = {
  totalSold    : { label: 'Sold'     , icon: 'sold' },
  amfi         : { label: 'AM/FI'    , icon: 'am-finance' },
  totalFallout : { label: 'Fallout'  , icon: 'fallout' },
  totalOrder   : { label: 'Order'    , icon: 'order' },
  total        : { label: 'Delivery' , icon: 'delivery' },
  backout      : { label: 'Backout'  , icon: 'backout' }
}

export const DAILY_SALES_COLUMNS = {
  delivereyType:{
    key       : 'delivery_type',
    size      : 'sm',
    xs        : 3,
  },
  add:{
    key       : 'add',
    size      : 'md',
    xs        : 9,
    component : DailySalesAdd,
  },
  totalSold:{
    key       : 'totalSold',
    iconName  : 'Sold',
    icon      : 'sold',
    size      : 'xs',
    xs        : 2,
    component : EntryWIthIcon,
  },
  amFi:{
    key       : 'amfi',
    iconName  : 'AM/FI',
    icon      : 'am-finance',
    size      : 'xs',
    xs        : 2,
    component : EntryWIthIcon,
  },
  fallout:{
    key       : 'totalFallout',
    iconName  : 'Fallout',
    icon      : 'fallout',
    size      : 'xs',
    xs        : 2,
    component : EntryWIthIcon,
  },
  order:{
    key       : 'totalOrder',
    iconName  : 'Order',
    icon      : 'order',
    size      : 'xs',
    xs        : 2,
    component : EntryWIthIcon,
  },
  sales:{
    key       : 'totalSales',
    iconName  : 'Delivery',
    icon      : 'delivery',
    size      : 'xs',
    xs        : 2,
    component : EntryWIthIcon,
  },
  backout:{
    key       : 'backout',
    iconName  : 'Backout',
    icon      : 'backout',
    size      : 'xs',
    xs        : 2,
    component : EntryWIthIcon,
  },
  total:{
    key       : 'total',
    iconName  : 'Total',
    icon      : '',
    size      : 'xs',
    isLast    : true,
    xs        : 2,
    component : EntryWIthIcon,
  }
};

export const INVENTORY_DATA_LABELS = {
  stock_num         : 'Stock #',
  vin_num           : 'VIN #',
  vehicle_year      : 'Year',
  make              : 'Make',
  model             : 'Model',
  vehicle_trim      : 'Trim',
  body_style        : 'Body Style',
  engine            : 'Engine',
  transmission_name : 'Transmission',
  drive_train       : 'Drivetrain',
  ext_color         : 'Exterior',
  int_color         : 'Interior',
  age_of_vehicle    : 'Age',
  mileage           : 'Mileage',
  current_mileage   : 'Current Mileage',
};

export const INVENTORY_DATA_FOOTER = {
  retail_price     : 'Retail',
  internet_price   : 'Internet',
}
