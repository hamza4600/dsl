// DEPENDENCIES
import values from 'lodash/values';

// GLOBAL VARIABLES
import { NEW_USED } from 'codes.js';
import { INTERFACE } from 'pathnames.js';
import { ENDPOINTS } from 'endpoints.js';

// GLOBAL FUNCTIONS
import { getByCode } from 'codes.js';
import { makePath } from 'functions.js';

// GLOBAL COMPONENTS
import Table from 'parts/table/Table';

// LOCAL COMPONENTS
import AssignmentCell from './tools/AssignmentCell';
import OpenDetailsCell from './tools/OpenDetailsCell';
import SAStatusCell from '../../tools/SAStatusCell';
import TradeTableCell from '../../tools/TradeTableCell';

// EXPORTS
export const SETTINGS = {
  path: INTERFACE.amFinance,
  recordIDKey: 'stock_num'
};

// OPTIONS

export const PRINT_OPTIONS = [
  { value: ENDPOINTS.sales.print.buyersOrder, label: 'Buyers Order' },
  { value: ENDPOINTS.sales.print.recap, label: 'Gross Recap' },
  { value: ENDPOINTS.sales.print.cleanUp, label: 'Clean Up Form' },
  { value: ENDPOINTS.sales.print.twg, label: 'TWG Cancellation' }
];

export const IS_FINANCED = [
  {
    value: 1,
    label: 'Bank'
  },
  {
    value: 0,
    label: 'Customer (Cash)'
  }
];

export const DSL_CUSTOMER_SOURCE_ID = [
  {
    value: 1,
    label: 'Personal Check'
  },
  {
    value: 2,
    label: 'Customer Bank'
  },
  {
    value: 3,
    label: 'Other'
  }
];

export const COLUMNS = {
  rowNumber: {
    key: '',
    label: '',
    xs: 12,
    sm: 6,
    xl: 1,
    sortable: false
  },
  purchased: {
    key: 'sales_time',
    label: 'Time',
    xs: 12,
    sm: 6,
    xl: 2
  },
  salesperson: {
    key: 'sales_man1_full_name',
    label: 'Slsperson',
    xs: 12,
    sm: 6,
    xl: 3
  },
  customer: {
    key: 'customer1_full_name',
    label: 'Customer',
    xs: 12,
    sm: 6,
    xl: 3
  },
  type: {
    key: 'new_used',
    label: 'Type',
    xs: 12,
    sm: 6,
    xl: 2,
    component: CodeCell
  },
  ss: {
    key: 'sales_status_code',
    label: 'SS',
    xs: 12,
    sm: 6,
    xl: 2
  },
  rl: {
    key: 'sale_type_category_code',
    label: 'R/L',
    xs: 12,
    sm: 6,
    xl: 1
  },
  stockNum: {
    key: 'stock_num',
    label: 'Stock #',
    name: 'stockNum',
    xs: 12,
    sm: 6,
    xl: 2,
    component: ({ children, rowValues, ...p }) => (
      <Table.View {...p} to={makePath(INTERFACE.inventory, 'view', rowValues.daily_sales_inventory_id)}>
        {children}
      </Table.View>
    )
  },
  vehicle: {
    key: 'make_model',
    label: 'Vehicle',
    xs: 12,
    sm: 6,
    xl: 2
  },
  trade: {
    key: 'arrTrades',
    label: 'Trade',
    xs: 12,
    sm: 6,
    xl: 3,
    component: p => <TradeTableCell {...p} className="p-0 text-left" amountKey="invoice_cost" />,
    sortable: false
  },
  frtGross: {
    key: 'frontend_gross',
    label: 'Frt Gross',
    xs: 12,
    sm: 6,
    xl: 2
  },
  openDetail: {
    key: 'sales_id',
    xs: 12,
    sm: 6,
    xl: 1,
    component: OpenDetailsCell,
    sortable: false
  },
  am: {
    key: 'am_assignment_name_last_initial',
    label: 'AM',
    xs: 24,
    sm: 12,
    lg: 9,
    xl: 9,
    component: p => <AssignmentCell {...p} statusKey="am_assignment_status" timeKey="am_time" />
  },
  fm: {
    key: 'fm_assignment_name_last_initial',
    label: 'FM',
    xs: 24,
    sm: 12,
    lg: 9,
    xl: 9,
    component: p => <AssignmentCell {...p} statusKey="fm_assignment_status" timeKey="fm_time" />
  },
  sa1: {
    key: 'sa1',
    label: '',
    xs: 8,
    lg: 2,
    xl: 2,
    component: p => <SAStatusCell {...p} label="SA1" />,
    sortable: false
  },
  sa2: {
    key: 'sa2',
    label: '',
    xs: 8,
    lg: 2,
    xl: 2,
    component: p => <SAStatusCell {...p} label="SA2" />,
    sortable: false
  },
  sa3: {
    key: 'sa3',
    label: '',
    xs: 8,
    lg: 2,
    xl: 2,
    component: p => <SAStatusCell {...p} label="SA3" />,
    sortable: false
  }
};

function CodeCell({ children }) {
  return <span>{getByCode(values(NEW_USED), children).label}</span>;
}

export const AMFI_PRODUCTS = [
  { productName: 'Lojack' },
  { productName: 'Cilajet' },
  { productName: 'CNA Tire and Wheel' },
  { productName: 'Expel Clear Bra' },
  { productName: 'product cost unlocked' },
  { productName: 'Resource 3 for 1 protection' },
  { productName: 'Resource CPO wrap VSC' },
  { productName: 'Resource Dent' },
  { productName: 'Resource Driver Plus/Maint.' },
  { productName: 'Resource Key Replacement' },
  { productName: 'Resource Platinum Plus' },
  { productName: 'Resource VSC' },
  { productName: 'Resource Windshield' },
  { productName: 'Axle, Wheel and Tire' }
];
