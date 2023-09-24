// GLOBAL FUNCTIONS
import { RETAIL_WHOLESALE } from 'codes';
import { formatDate, makePath } from 'functions';
import OpenSalesCell from '../orders/tools/OpenDetailsCell'
// GLOBAL COMPONENTS
import Table from 'parts/table/Table';
import { INTERFACE } from 'pathnames';
import Trade from './Overview/tools/Trade';

const time = {
  header: 'Time',
  tips: [
    {
      label: '',
      description: 'Time when deal was entered into the system.'
    },
  ]
};

const stat = {
  header: 'Time',
  tips: [
    {
      label: 'D - ',
      description: 'Delivered'
    },
    {
      label: 'D - ',
      description: 'Delivered/Backout',
      classNames:'text-danger'
    },
    {
      label: 'B - ',
      description: 'Backout'
    },
  ]
};
const N_P = {
  header: 'N/P',
  tips: [
    {
      label: 'N: ',
      description: 'New'
    },
    {
      label: 'P: ',
      description: 'Pre-powned'
    },
  ]
};
const P_L = {
  header: 'P/L',
  tips: [
    {
      label: 'P: ',
      description: 'Purchase'
    },
    {
      label: 'L: ',
      description: 'Lease'
    },
  ]
};
const R_W = {
  header: 'R/W',
  tips: [
    {
      label: 'R: ',
      description: 'Retail'
    },
    {
      label: 'W: ',
      description: 'Wholesale'
    },
  ]
};
export const DELIVERED_COLUMNS = {
  deliveryData: {
    key: 'delivered_date',
    name: 'Delivered Date',
    label: 'DDate',
    format: formatDate,
    size: 'sm'
  },

  //overView
  time: {
    key: 'delivered_date',
    name: 'Time',
    label: 'Time ',
    tooltips: time,
    placement: 'right',
    sortable: false,
    size: 'sm'
  },
  saleStatus: {
    key: 'sales_status_code',
    icon: 'info',
    name: ' ',
    label: '',
    tooltips: stat,
    hoverTip: false,
    // tooltips: STATUS,
    placement: 'right',
    size: 'xs',
    sortable: false
  },
  overViewCustomer: {
    key: 'customer1',
    name: 'Customer 1/2',
    label: 'Customer 1/2 ',
    size: 'md',
    sortable: false,
    xs: 2
  },
  overViewSalePerson: {
    key: 'salesperson1',
    name: 'Slsperson 1/2',
    label: 'Slsperson 1/2 ',
    sortable: false,
    size: 'md',
    xs: 2
  },

  customer: {
    key: 'customer1_name',
    name: 'Customer Name',
    label: 'Customer',
    size: 'sm',
    xs: 3
  },
  age: {
    key: 'age',
    name: 'Age ',
    label: 'Age',
    sortable: false,
    align: 'center',
    size: 'xs'
  },
  newUsed: {
    key: 'new_used',
    name: 'New/Used',
    label: 'N/P',
    sortable: false,
    tooltips: N_P,
    placement: 'right',
    align: 'center',
    size: 'xs'
  },
  saleSubtype: {
    key: 'sale_subtype_code',
    name: 'Sale Subtype',
    label: 'SS',
    tooltips: N_P,
    placement: 'right',
    sortable: false,
    align: 'center',
    size: 'sm'
  },
  purchaseLease: {
    key: 'purchase_lease',
    name: 'Purchase Lease',
    label: 'P/L',
    tooltips: P_L,
    placement: 'right',
    sortable: false,
    align: 'center',
    size: 'xs'
  },
  saleType: {
    key: 'sale_type',
    name: 'Retail/Wholesale',
    label: 'R/W',
    size: 'xs',
    align: 'center',
    component: Table.Variants,
    codes: RETAIL_WHOLESALE
  },
  overViewSaleType: {
    key: 'sale_type_category_code',
    name: 'Retail/Wholesale',
    label: 'R/W',
    sortable: false,
    tooltips: R_W,
    placement: 'right',
    size: 'xs',
    align: 'center',
    component: Table.Variants,
    codes: RETAIL_WHOLESALE
  },
  stockNumber: {
    key: 'stock_num',
    name: 'Stock Number',
    label: 'Stock #',
    sortable: false,
    component: Table.View,
    size: 'md',
    xs: 6
  },
  vehicle: {
    key: 'vehicle',
    name: 'Vehicle',
    label: 'Vehicle',
    size: 'sm'
  },
  makeModel: {
    key: 'vehicle',
    name: 'Vehicle Info',
    label: 'Vehicle',
    sortable: false,
    size: 'md'
  },
  trade: {
    key: 'aryTrade',
    name: 'Trade ',
    label: 'Trade',
    size: 'lg',
    component: Trade
  },
  frontendGross: {
    key: 'frontend_gross_before_pack',
    name: 'Frontend Gross Before Pack',
    label: 'Frt Gross BP',
    size: 'sm'
  },
  overViewFrontendGross: {
    key: 'fe_gross_bp',
    name: 'Frontend Gross Before Pack',
    label: 'Frt Gross BP',
    sortable: false,
    size: 'sm'
  },
  amGross: {
    key: 'am_gross',
    name: 'AM Gross',
    label: 'AM Gross',
    sortable: false,
    size: 'sm'
  },
  fiGross: {
    key: 'fi_gross',
    name: 'F&I Gross',
    label: 'FI Gross',
    sortable: false,
    size: 'sm'
  },
  fe_be_gross_bp: {
    key: 'total_fe_be_gross_bp',
    name: 'Total FE & BE Gross BP',
    label: 'Total FE & BE Gross BP ',
    sortable: false,
    size: 'sm'
  },
  fe_be_gross_ap: {
    key: 'total_fe_be_gross_ap',
    name: 'Total FE & BE Gross AP',
    label: 'Total FE & BE Gross AP ',
    sortable: false,
    placement: 'left',
    size: 'sm'
  },
  backendGross: {
    key: 'backend_gross_before_pack',
    name: 'BE Gross ',
    label: 'BE Gross',
    sortable: false,
    size: 'sm'
  },

  dealerPack: {
    key: 'dealer_pack_total',
    name: 'Dealer Pack ',
    label: 'Dealer Pack',
    sortable: false,
    size: 'sm'
  },
  totalBpGross: {
    key: 'total_fe_be_gross_before_pack',
    name: 'Total FE & BE Gross BP ',
    label: 'Total FE & BE Gross BP',
    size: 'md'
  },
  totalApGross: {
    key: 'total_fe_be_gross_after_pack',
    name: 'Total FE & BE Gross BP ',
    label: 'Total FE & BE Gross BP',
    size: 'md'
  },
  salesPerson: {
    key: 'salesperson1',
    name: 'Salesperson',
    label: 'Salesperson',
    size: 'sm',
    xs: 3
  },
  salesManager: {
    key: 'salesmanager1',
    name: 'Sales Manager',
    label: 'Sales Manager',
    size: 'sm',
    xs: 3
  },
  fmManager: {
    key: 'fm_manager',
    name: 'FM Manager',
    label: 'FM Manager',
    size: 'sm',
    xs: 3
  },
  totalTasks: {
    key: 'total_tasks',
    name: 'Total Tasks',
    label: 'Tasks',
    align: 'center',
    size: 'sm'
  },
};
export const ACTIONS = {
  openSales: {
    icon: {
      use: 'folder',
      hover: 'folder-open'
    },
    to: ({ sales_id }) => makePath(INTERFACE.sales, 'view', sales_id)
  }
};

export const DATE_HEADING =[
 { 
  key: 'delivered_date',
  class:'text-uppercase large pl-4',
  date:true,
  colSize:'10',
  size: 'xl'
},
{ 
  key: 'totalday_sold',
  name: 'Sold',
  colSize:'2',
  size: 'sm'
},
{ 
  key: 'totalday_amfi',
  name: 'AM/FI',
  colSize:'2',
  class:' m-0 p-0',
  size: 'sm'
},{ 
  key: 'totalday_fallout',
  name: 'fall',
  colSize:'2',
  size: 'sm'
},{ 
  key: 'totalday_order',
  name: 'Order',
  colSize:'2',
  size: 'sm'
},
{ 
  key: 'totalday_delivered',
  name: 'Dilivered',
  colSize:'2',
  size: 'sm'
},
{ 
  key: 'totalday_backout',
  name: 'Bout',
  colSize:'2',
  size: 'sm'
},
{ 
  key: 'totalday_net',
  name: 'net',
  colSize:'2',
  size: 'sm'
},
]

export const OVERVIEW_UPER_TABEL_HEADING =[
  { 
    key:'',
    label: 'Type',
    sortable:false,
    size: 'xl'
  },
  { 
    key:'',
    label: 'Total',
    sortable:false,
    size: 'lg'
  },
  { 
    key:'',
    label: 'Bachout',
    sortable:false,
    size: 'lg'
  },
  { 
    key:'',
    label: 'Net',
    sortable:false,
    size: 'lg'
  },
  { 
    key:'',
    label: 'Avg',
    sortable:false,
    size: 'lg'
  },
  
  
]

export const OVERVIEW_UPER_TABEL_BODY = [
  {
    values: [
      {
        label: 'Frontend Gross Before Pack',
        size: 'xl'
      },
      {
        key: 'fe_gross_bp_total',
        label: '',
        size: 'md'
      },
      {
        key: 'fe_gross_bp_backout',
        label: '',
        size: 'md'
      },
      {
        key: 'fe_gross_bp_net',
        label: '',
        size: 'md'
      },
      {
        key: 'fe_gross_bp_avg',
        label: '',
        size: 'md'
      },
    ],
    size: 'xl'
  },
  {
    values: [
      {
        label: 'Dealer Pack',
        size: 'xl'
      },
      {
        key: 'dealer_pack_total',
        label: '',
        size: 'md'
      },
      {
        key: 'dealer_pack_backout',
        label: '',
        size: 'md'
      },
      {
        key: 'dealer_pack_net',
        label: '',
        size: 'md'
      },
      {
        key: 'dealer_pack_avg',
        label: '',
        size: 'md'
      },
    ],
    size: 'xl'
  },
  {
    values: [
      {
        key: '',
        label: 'Frontend Gross After Pack',
        size: 'xl'
      },
      {
        key: 'fe_gross_ap_total',
        label: '',
        size: 'md'
      },
      {
        key: 'fe_gross_ap_backout',
        label: '',
        size: 'md'
      },
      {
        key: 'fe_gross_ap_net',
        label: '',
        size: 'md'
      },
      {
        key: 'fe_gross_ap_avg',
        label: '',
        size: 'md'
      },
    ],
    size: 'xl'
  },
  {
    values: [
      {
        key: '',
        label: 'AM Gross',
        size: 'xl'
      },
      {
        key: 'am_gross_total',
        label: '',
        size: 'md'
      },
      {
        key: 'am_gross_backout',
        label: '',
        size: 'md'
      },
      {
        key: 'am_gross_net',
        label: '',
        size: 'md'
      },
      {
        key: 'am_gross_avg',
        label: '',
        size: 'md'
      },
    ],
    size: 'md'
  },
  {
    values: [
      {
        key: '',
        label: 'F&I Gross',
        size: 'xl'
      },
      {
        key: 'fi_gross_total',
        label: '',
        size: 'md'
      },
      {
        key: 'fi_gross_backout',
        label: '',
        size: 'md'
      },
      {
        key: 'fi_gross_net',
        label: '',
        size: 'md'
      },
      {
        key: 'fi_gross_avg',
        label: '',
        size: 'md'
      },
    ],
    size: 'xl'
  },
  {
    values: [
      {
        key: '',
        label: 'Backend Gross',
        size: 'xl'
      },
      {
        key: 'be_gross_total',
        label: '',
        size: 'md'
      },
      {
        key: 'be_gross_backout',
        label: '',
        size: 'md'
      },
      {
        key: 'be_gross_net',
        label: '',
        size: 'md'
      },
      {
        key: 'be_gross_avg',
        label: '',
        size: 'md'
      },
    ],
    size: 'xl'
  },
  {
    values: [
      {
        key: '',
        label: 'Grand Total',
        size: 'xl'
      },
      {
        key: 'grand_total_total',
        label: '',
        size: 'md'
      },
      {
        key: 'grand_total_backout',
        label: '',
        size: 'md'
      },
      {
        key: 'grand_total_net',
        label: '',
        size: 'md'
      },
      {
        key: 'grand_total_avg',
        label: '',
        size: 'md'
      },
    ],
    size: 'xl'
  },
];

export const OVERVIEW_UPER_TABEL =[
  { 
    key: 'delivered_date',
    class:'text-uppercase large pl-4',
    date:true,
    colSize:'10',
    size: 'xl'
  },
  { 
    key: 'delivered_date',
    class:'text-uppercase large pl-4',
    date:true,
    colSize:'10',
    size: 'xl'
  },
  { 
    key: 'delivered_date',
    class:'text-uppercase large pl-4',
    date:true,
    colSize:'10',
    size: 'xl'
  },
  { 
    key: 'delivered_date',
    class:'text-uppercase large pl-4',
    date:true,
    colSize:'10',
    size: 'xl'
  },
  { 
    key: 'delivered_date',
    class:'text-uppercase large pl-4',
    date:true,
    colSize:'10',
    size: 'xl'
  },
]

export const OVERVIEW_HEADER =[
  {
    key:'actual_sold',
    name:'Sold',
  },
  {
    key:'actual_amfi',
    name:'AM/FI',
  },
  {
    key:'actual_fallout',
    name:'Fallout',
  },
  {
    key:'actual_order',
    name:'Order',
  },
  {
    key:'actual_delivered',
    name:'Delivered',
  },
  {
    key:'actual_backout',
    name:'Backout',
  },
  {
    key:'actual_net',
    name:'Net',
  },
]