import { formatDate, makePath } from "functions";
import Table from "parts/table/Table";
import { INTERFACE } from "pathnames";
import Vsd from "./parts/Vsd";

export const COLUMNS = {
    // Dates
    ddate: {
      key: 'sales_time',
      name: 'Purchased Date',
      label: 'PDate',
      format: formatDate,
      size: 'sm'
    },
    customer: {
      key: 'customer1_full_name',
      name: 'Customer',
      label: 'Customer ',
      size: 'sm'
    },
    slsperson: {
      key: 'sales_man1_full_name',
      name: 'Slsperson',
      label: 'Slsperson ',
      size: 'sm'
    },
    fiManager: {
      key: 'fm_assignment_user_full_name',
      name: 'FI Manger',
      label: 'FI Manager ',
      size: 'sm'
    },
    // Vehicle Info
    stockNum: {
      key: 'stock_num',
      name: 'Stock# ',
      label: 'Stock#',
      size: 'lg',
      multiValues: true,
      component:Vsd
    },
    makeModel: {
      key: 'Vehicle',
      name: 'Vehicle',
      label: 'Vehicle ',
      size: 'lg'
    },
    vin_num: {
      key: 'vin_num',
      name: 'Vin ',
      label: 'Vin',
      size: 'lg',
      component:Vsd,
    },
    deal: {
      key: 'deal_number',
      name: 'Dealer Pack',
      label: 'Dealer Pack ',
      size: 'sm',
      component:Vsd
     
    },
    totalAm_gross: {
      key: 'total_am_gross',
      name: 'FE Gross AP',
      label: 'FE Gross AP ',
      size: 'xs',
    },
    AP_gross: {
      key: 'frontend_gross_ap',
      name: 'FE Gross AP',
      label: 'FE Gross AP ',
      size: 'sm',
    },
    Bp_gross: {
      key: 'fe_gross_bp',
      name: 'FE Gross BP',
      label: 'FE Gross BP ',
      size: 'sm',
      component:Vsd
    },
    Fm_gross: {
      key: 'fm_gross',
      name: 'FE Gross AP',
      label: 'FE Gross AP ',
      size: 'xs',
    },
    Be_gross: {
      key: 'backend_gross',
      name: 'FE Gross AP',
      label: 'FE Gross AP ',
      size: 'xs',
    },
  };
  export const ACTIONS = {
    openSales: {
      icon: {
        use: 'folder',
        hover: 'folder-open'
      },
      to: ({ stock_num }) => makePath(INTERFACE.sales, 'view', stock_num)
    }
  };