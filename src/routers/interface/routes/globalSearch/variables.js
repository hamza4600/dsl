import { GLOBAL_SEARCH } from "codes";
import { makePath } from "functions";
import Table from "parts/table/Table";
import { INTERFACE } from "pathnames";

import Trade from "./tools/Trade";

export const SETTINGS = {
    path: INTERFACE.inventory,
    recordIDKey: 'stock_num'
  };

  const st = {
    header: 'Status',
    tips: [
      {
        label: '',
        description: 'In Stock'
      },
      {
        label: '',
        description: `Pre Stoke`
      },
      {
        label: '',
        description: 'Sold'
      },
      {
        label: '',
        description: 'Order'
      },
      {
        label: '',
        description: 'Fallout'
      },
      {
        label: '',
        description: 'Backout'
      },
      {
        label: '',
        description: 'Wholesale'
      },
      {
        label: '',
        description: 'Delivered'
      },
      {
        label: '',
        description: 'WS Delivered'
      },
      {
        label: '',
        description: 'Returned'
      },
      {
        label: '',
        description: 'Funded'
      },
      {
        label: '',
        description: 'WS Funded'
      },
      {
        label: '',
        description: 'Retuned Funded'
      },
    ]
  };


  const time = {
    header: 'Time',
    tips: [
      {
        label: '',
        description: 'Time when deal was entered into the system.'
      },
    ]
  };
  const inventory = {
    header: 'Inventory Type',
    tips: [
      {
        label: '',
        description: 'List all types here.'
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
export const SEARCH_FILTER_COLUMN = {
  date: {
    key: 'purchase_date',
    name: 'Date ',
    label: 'Date',
    sortable: false,
    size: 'sm'
  },
  inventoryType: {
    key: 'inventory_type',
    name:      ' ',
    label:     '',
    icon: 'info',
    tooltips: inventory,
    placement:'right',
    size: 'xs',
    sortable: false
  },
  age: {
    key: 'age',
    name: 'Age ',
    label: 'Age',
    sortable: false,
    // align: 'center',
    size: 'xs'
  },
  stock: {
    key: 'stock_num',
    name: 'Stock# ',
    sortable: false,
    label: 'Stock#',
    size: 'lg'
  },
  vehicleInfo: {
    key: 'vehicle_info',
    name: 'Vehicle Info. ',
    sortable: false,
    label: 'Vehicle Info',
    size: 'sm',
    component: Table.View
  },
  mileage: {
    key: 'mileage',
    name: 'Mileage ',
    sortable: false,
    label: 'Mileage',
    size: 'sm',
    component: Number.Miles
  },
  acv: {
    key: 'acv',
    name: 'ACV ',
    sortable: false,
    label: 'ACV',
    size: 'sm',
    component: Number.Dollars
  },
  dmsInvoice: {
    key: 'dms_invoice',
    name: 'DMS Invoice ',
    label: 'DMS Invoice',
    sortable: false,
    size: 'sm',
    component: Number.Dollars
  },
  inventorySource: {
    key: 'inventory_source',
    name: 'Source ',
    label: 'Source',
    sortable: false,
    size: 'md'
  },
  inventoryStatus: {
    key: 'inventory_status',
    name: 'Status ',
    label: 'Status',
    badge: false,
    sortable: false,
    tooltips: st,
    // align: 'center',
    placement:'left',
    size: 'md',
    component: Table.Code,
    codes: GLOBAL_SEARCH
  },

  //DEAL COLUMNS
  salesTime: {
    key: 'sales_time',
    name: 'Time ',
    label: 'Time',
    tooltips: time,
    placement: 'right',
    size: 'sm'
  },
  stat: {
    key: 'sales_status_code',
    name: 'Stat ',
    label: 'Stat',
    tooltips: stat,
    color: 'text-danger',
    placement: 'right',
    size: 'xs'
  },
  salesmanName: {
    key: 'sales_man_name',
    name: 'Sisperson 1/2 ',
    label: 'Sisperson 1/2',
    className:'pl-2',
    size: 'sm',
    component:Table.AssignmentName,
  },
  customerName: {
    key: 'customer_full_name',
    name: 'Customer 1/2 ',
    label: 'Customer 1/2',
    className:'pl-2',
    size: 'md',
  },
  ageDeal: {
    key: 'age',
    name: 'Age ',
    label: 'Age',
    // align: 'center',
    size: 'sm'
  },
  newUsed: {
    key: 'new_used',
    name: 'N/P ',
    label: 'N/P',
    tooltips: N_P,
    placement: 'right',
    className:'pl-4',
    // align: 'center',
    size: 'sm'
  },
  purchaseLease: {
    key: 'sale_type_code',
    name: 'P/L ',
    label: 'P/L',
    tooltips: P_L,
    placement: 'right',
    // align: 'center',
    size: 'xs'
  },
  retailWhole: {
    key: 'sale_type_category_code',
    name: 'R/W ',
    label: 'R/W',
    tooltips: R_W,
    placement: 'right',
    // align: 'center',
    size: 'xs'
  },
  stockDeal: {
    key: 'stock_num',
    name: 'Stock # ',
    label: 'Stock#',
    size: 'md',
    component: Table.View
  },
  vehicleInfoDeal: {
    key: 'vehicle_info',
    name: 'Vehicle Info ',
    label: 'Vehicle Info',
    size: 'sm'
  },
  trade: {
    key: 'trades',
    name: 'Trade ',
    label: 'Trade',
    size: 'lg',
    component: Trade
  },
  frtGross: {
    key: 'frt_gross',
    name: 'Frt Gross ',
    label: 'Frt Gross',
    size: 'sm',
    component: Number.Dollars
  },
  amGross: {
    key: 'am_gross',
    name: 'AM Gross ',
    label: 'Am Gross',
    align: 'center',
    size: 'xs'
  },
  fiGross: {
    key: 'fi_gross',
    name: 'F&I Gross ',
    label: 'F&I Gross',
    size: 'sm',
    component: Number.Dollars
  },
  totalGross: {
    key: 'total_gross',
    name: 'Ttl Gross ',
    label: 'Ttl Gross',
    size: 'sm'
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
