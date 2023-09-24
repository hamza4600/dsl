// GLOBAL COMPONENTS
import Table from 'parts/table/Table';

// LOCAL COMPONENTS
import { formatDate, makePath } from "functions";
import SAStatusCell from "./tools/SAStatusCell";
import AssignmentCell from "./tools/AssignmentCell";
import OpenDetailsCell from "./tools/OpenDetailsCell";

import { INTERFACE } from 'pathnames';

const STATUS = {
  header: 'Status',
  tips: [
    {
      label: 'S : ',
      description: 'Sold'
    },
    {
      label: 'O : ',
      description:'Order'
    },
    {
      label: 'F : ',
      description:'Fallout'
    },
    {
      label: 'AMFI : ',
      description:'Sale from order'
    },
  ]
};


const AM_TIME = {
  header: 'AM Time',
  tips: [
    {
      label: 'Line 1 : ',
      description: 'Time when AM assignment occured.'
    },
    {
      label: 'Line 2 : ',
      description:'Time when F&I Gross was entered.'
    },
  ]
};

const FM_TIME = {
  header: 'FM Time',
  tips: [
    {
      label: 'Line 1 : ',
      description: 'Time when FM assignment occured.'
    },
    {
      label: 'Line 2 : ',
      description:'Time when F&I Gross was entered.'
    },
  ]
};

const FM_STATUS = {
  header: 'FM Time Status',
  tips: [
    {
      label: '',
      icon:'success',
      description: ' FM assignment & Gross has been entered.'
    },
    {
      label: '',
      icon:'warning',
      description:' Missing F&I gross.'
    },
  ]
};

const AM_STATUS = {
  header: 'AM Time Status',
  tips: [
    {
      label: '',
      icon:'success',
      description: ' AM assignment & Gross has been entered.'
    },
    {
      label: '',
      icon:'warning',
      description:' Missing AM gross.'
    },
  ]
};

const SA_1 = {
  header: 'SA1',
  tips: [
    {
      label: '',
      description: 'Factory or Purchase Invoice'
    }
  ]
}
const SA_2 = {
  header: 'SA2',
  tips: [
    {
      label: '',
      description: 'Executed Deal Packege'
    }
  ]
}

const N_P = {
  header: 'N/P',
  tips: [
    {
      label: 'N : ',
      description: 'New'
    },
    {
      label: 'P : ',
      description: 'Pre-owned'
    }
  ]
}
const R_W = {
  header: 'R/W',
  tips: [
    {
      label: 'R : ',
      description: 'Retial'
    },
    {
      label: 'W : ',
      description: 'Wholesale'
    }
  ]
}

const P_L = {
  header: 'P/L',
  tips: [
    {
      label: 'P : ',
      description: 'Purchase'
    },
    {
      label: 'L : ',
      description: 'Lease'
    }
  ]
}
export const COLUMNS = {
    estimatedDeliveryDate:{
      key:       'estimated_delivery_date',
      name:      'Est. Delivery time of order.',
      label:     'Est. Delv.',
      format:    formatDate, 
      size:      'sm',
      color:     'text-danger'
    },
    salesStatusCode:{
      key:       'sales_status_code',
      icon:     'info',
      name:     ' ',
      label:    '',
      hoverTip:   false,
      tooltips: STATUS,
      placement: 'right',
      size:      'xs',
      sortable: false,
    },
    sisperson:{
      key:       'sales_man1_full_name',
      name:      'Slsperson 1/2 ',
      label:     'Slsperson 1/2',
      size:      'md',
      component: Table.SisNameCell,
    },
    customerName:{
      key:       'customer1_full_name',
      name:      'Customer 1/2 ',
      label:     'Customer 1/2',
      size:      'md',
      component: Table.SisNameCell,
    },
    age:{
      key:       'age_of_vehicle',
      name:      'Age ',
      label:     'Age',
      size:      'xs'
    },
    newUsed:{
      key:       'new_used',
      name:      'New/Pre-Owned',
      label:     'N/P',
      tooltips:   N_P,
      placement: 'right',
      sortable: false,
      size:      'xs'
    },
    purchaseLease:{
      key:       'purchase_lease',
      name:      'P: purchase L:Lease',
      label:     'P/L',
      tooltips:   P_L,
      placement: 'right',
      sortable: false,
      size:      'xs'
    },
    retail:{
      key:       'sale_type_category_code',
      name:      'Estimated Delivery Date',
      label:     'R/W',
      tooltips:   R_W,
      placement: 'right',
      sortable: false,
      size:      'xs'
    },
    stockNumber:{
      key:       'stock_num',
      name:      'Stock# ',
      label:     'Stock#',
      component: Table.View,
      size:      'lg'
    },
    makeModel:{
      key:       'make_model',
      name:      'Vehicle Info. ',
      label:     'Vehicle Info.',
      size:      'md'
    },
    trade:{
      key:       'arrTrades',
      name:      'Trade ',
      label:     'Trade',
      size:      'lg',
      padd:      'p-0',
      component: Table.Trade,
    },
    frontendGross:{
      key:       'frontend_gross',
      name:      'Frt Gross ',
      label:     'Frt. Gross',
      size:      'sm'
    },
    amAssignmentUser:{
      key:       'am_assignment_name_last_initial',
      name:      'AM ',
      label:     'AM',
      size:      'sm',
    },
    amTime:{
      key:       'am_time',
      name:      'Assignment Name',
      label:     'AM Time',
      tooltips: AM_TIME,
      placement: 'right',
      sortable:   false,
      size:      'sm',
      component: p => <AssignmentCell {...p} />
    },
    amStatus:{
      key:       'am_assignment_status',
      icon:      'info',
      sortable:   false,
      name:      ' ',
      label:     '',
      hoverTip:   false,
      tooltips: AM_STATUS,
      tipIcon:   'tick',
      placement: 'bottom',
      size:      'xs',
      component: p => <SAStatusCell {...p}  />,
    },
    fmAssignmentUser:{
      key:       'fm_assignment_name_last_initial',
      name:      'FM ',
      label:     'FM',
      size:      'sm',
    },
    fmTime:{
      key:       'fm_time',
      name:      'FM Time ',
      label:     'FM Time',
      tooltips: FM_TIME,
      placement: 'left',
      sortable:   false,
      size:      'sm',
      component: p => <AssignmentCell {...p} />
    },
    fmStatus:{
      key:       'fm_assignment_status',
      icon:      'info',
      name:      ' ',
      label:     '',
      sortable:   false,
      hoverTip:   false,
      tooltips: FM_STATUS,
      tipIcon:   'tick',
      placement: 'bottom',
      size:      'xs',
      component: p => <SAStatusCell {...p}  />,
    },
    sa1:{
      key:       'sa1',
      name:      'S1',
      label:     'SA1',
      tooltips: SA_1,
      placement: 'left',
      size:      'xs',
      component: p => <SAStatusCell {...p}  />,
    },
    sa2:{
      key:       'sa2',
      name:      'S2',
      label:     'SA2',
      tooltips: SA_2,
      placement: 'left',
      size:      'xs',
      component: p => <SAStatusCell {...p} />,
    },
    sa3:{
      key:       'sa3',
      name:      'Accounting Invoice/Bill of Sale',
      label:     'SA3',
      size:      'xs',
      component: p => <SAStatusCell {...p}  />,
    },
    openDetail: {
      key: 'daily_sales_inventory_id', // TODO: Get ID
      label:     '',
      xs: 12,
      sm: 6,
      xl: 1,
      sortable: false,
      component: OpenDetailsCell ,
    },
  }
  export const ACTIONS = {
    openSales: {
      icon: {
        use: 'folder',
        hover: 'folder-open'
      },
      to: ({ sales_id }) => makePath(INTERFACE.sales, 'view', sales_id)
    }
  };
  