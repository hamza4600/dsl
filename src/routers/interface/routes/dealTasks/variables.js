// GLOBAL VARIABLES
import { RETAIL_LEASE } from 'codes.js';
import { INTERFACE } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions';

// GLOBAL COMPONENTS
import Table from 'parts/table/Table';

// LOCAL COMPONENTS
import TasksBadge from './tools/TasksBadge';
import TradeTableCell from '../../tools/TradeTableCell';

// STYLES
import styles from './dealTasks.module.scss';

// EXPORTS
export const SETTINGS = {
  path: INTERFACE.dealTasks,
  recordIDKey: 'stock_num'
};

export const COLUMNS = {
  tasks: {
    key: 'task_cnt',
    label: 'Tasks',
    size: 'xs',
    className: styles.tasks,
    component: TasksBadge
  },
  deliveredDate: {
    key: 'delivered_date',
    name: 'Delivered Date',
    label: 'Date',
    size: 'md',
    component: Table.Date
  },
  deliveredAge: {
    key: 'delivered_age',
    name: 'Delivered Age',
    label: 'DAge',
    align: 'center',
    className: styles.center,
    size: 'xs'
  },
  customerName: {
    key: 'customer_name',
    name: 'Customer Name',
    label: 'Customer',
    size: 'md'
  },
  saleType: {
    key: 'sale_type_code_first',
    name: 'Purchase/Lease',
    label: 'P/L',
    size: 'xs',
    component: Table.Code,
    codes: RETAIL_LEASE
  },
  stockNum: {
    key: 'stock_num',
    inventoryIDKey: 'daily_sales_inventory_id',
    name: 'Stock Number',
    label: 'Stock#',
    size: 'md',
    component: Table.View
  },
  age: {
    key: 'age',
    label: 'Age',
    size: 'xs',
    className: styles.center
  },
  trades: {
    key: 'trades',
    label: 'Trade',
    size: 'lg',
    component: p => <TradeTableCell {...p} amountKey="trade_in_allowance" />,
    sortable: false
  },
  frontEndGross: {
    key: 'front_end_gross',
    name: 'Front End Gross',
    label: 'Frt Gross',
    size: 'md',
    component: Table.Number.Dollars
  },
  amGross: {
    key: 'am_gross',
    label: 'AM Gross',
    size: 'md',
    component: Table.Number.Dollars
  },
  fiGross: {
    key: 'fl_gross',
    label: 'FI Gross',
    size: 'md',
    component: Table.Number.Dollars
  },
  totalGross: {
    key: 'total_gross',
    label: 'Total Gross',
    size: 'md',
    component: Table.Number.Dollars
  },
  salesPerson: {
    key: 'salesperson',
    label: 'Sales Person',
    size: 'md'
  },
  fmManager: {
    key: 'fm_manager',
    label: 'FM Manager',
    size: 'md'
  }
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
