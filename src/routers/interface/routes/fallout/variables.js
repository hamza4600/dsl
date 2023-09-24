// GLOBAL COMPONENTS
import Table from 'parts/table/Table';

// LOCAL COMPONENTS
import SAStatusCell from "../orders/tools/SAStatusCell";
import AssignmentCell from "../orders/tools/AssignmentCell";
import OpenDetailsCell from "../orders/tools/OpenDetailsCell"

  //FALLOUT COLUMNS
  export const FALLOUTCOLUMNS = {
    time:{
      key:       'sales_time',
      name:      'Sales Time',
      label:     'Time',
      icon:      'info',
      size:      'sm',
      sortable: false,
    },
    salesStatusCode:{
      key:       'sales_status_code',
      icon:     'info',
      size:      'xs',
      sortable: false,
    },
    sisperson:{
      key:       'sales_man1_full_name',
      name:      'Salesman Name',
      label:     'Slsperson 1/2',
      size:      'sm'
    },
    customerName:{
      key:       'customer1_full_name',
      name:      'customer name',
      label:     'Customer 1/2',
      size:      'sm'
    },
    age:{
      key:       'age_of_vehicle',
      name:      'age',
      label:     'Age',
      size:      'xs'
    },
    newUsed:{
      key:       'new_used',
      name:      'New/Pre-Owned',
      label:     'N/P',
      sortable: false,
      size:      'xs'
    },
    purchaseLease:{
      key:       'purchase_lease',
      name:      'P: purchase L:Lease',
      label:     'P/L',
      sortable: false,
      size:      'xs'
    },
    retail:{
      key:       'sale_type_category_code',
      name:      'Estimated Delivery Date',
      label:     'R/W',
      sortable: false,
      size:      'xs'
    },
    stockNumber:{
      key:       'stock_num',
      name:      'Stock Number',
      label:     'Stock#',
      size:      'sm',
      component: Table.View
    },
    makeModel:{
      key:       'make_model',
      name:      'Vehicle Number',
      label:     'Vehicle Info.',
      size:      'md'
    },
    trade:{
      key:       'trade',
      name:      'Trade',
      label:     'Trade',
      size:      'xs'
    },
    frontendGross:{
      key:       'frontend_gross',
      name:      'Frontend Gross',
      label:     'Frt. Gross',
      size:      'sm'
    },
    amAssignmentUser:{
      key:       'am_assignment_name_last_initial',
      name:      'AM Name',
      label:     'AM',
      size:      'sm'
    },
    amTime:{
      key:       'am_time',
      name:      'Assignment Name',
      label:     'AM time',
      sortable:   false,
      size:      'sm',
      component: p => <AssignmentCell {...p} />
    },
    amStatus:{
      key:       'am_assignment_status',
      icon:      'info',
      sortable:   false,
      size:      'xs',
      component: p => <SAStatusCell {...p}  />,
    },
    fmAssignmentUser:{
      key:       'fm_assignment_name_last_initial',
      name:      'FM Name',
      label:     'FM',
      size:      'sm'
    },
    fmTime:{
      key:       'fm_time',
      name:      'FM Time',
      label:     'FM Time',
      sortable:   false,
      size:      'sm',
      component: p => <AssignmentCell {...p} />
    },
    fmStatus:{
      key:       'fm_assignment_status',
      icon:      'info',
      sortable:   false,
      size:      'xs',
      component: p => <SAStatusCell {...p}  />,
    },
    sa1:{
      key:       'sa1',
      name:      'S1',
      label:     'SA1',
      size:      'xs',
      component: p => <SAStatusCell {...p}  />,
    },
    sa2:{
      key:       'sa2',
      name:      'S2',
      label:     'SA2',
      size:      'xs',
      component: p => <SAStatusCell {...p} />,
    },
    sa3:{
      key:       'Sa3',
      name:      'S3',
      label:     'SA3',
      size:      'xs',
      component: p => <SAStatusCell {...p}  />,
    },
    openDetail: {
      key: 'stock_nums', // TODO: Get ID
      label:     '',
      xs: 12,
      sm: 6,
      xl: 1,
      sortable: false,
      component: OpenDetailsCell ,
    },
  }