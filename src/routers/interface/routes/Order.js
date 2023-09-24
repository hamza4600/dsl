import React, { useContext, useState } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL COMPONENTS
import Main from 'parts/main/Main';
import { ENDPOINTS } from 'endpoints.js';

// LOCAL COMPONENTS
import Title from 'parts/title/Title';
import DownloadButton from '../tools/DownloadButton';
import PrintButton from '../tools/PrintButton';

// LOCAL VARIABLES
import { ACTIONS, COLUMNS } from './orders/variables';

// GLOBAL HELPERS
import { getListData, ListContext } from 'helpers/getListData';
import { ALL_TIME, TODAY } from 'timeFormats.js';

// GLOBAL COMPONENTS
import Filters from 'parts/filters/Filters';
import Table from 'parts/table/Table';
import MobileTableEntry from 'parts/table/layout/MobileTableEntry';
import Tooltip from 'core/tools/Tooltip';
import TableScrollbox from 'parts/table/layout/TableScrollbox';

// STYLES
import styles from './orders/order.module.scss';


// MAIN COMPONENT
const Order = compose(connect(({ mobile }) => ({ mobile })))(
  ({
    lastCol,
    children,
    // REDUX STATE
    mobile
  }) => {
  const {
    result = [],
    columns = [],
    preferences: { filters }
  } = useContext(ListContext) || {}; 
  const [icon, setIcon] = useState('arrow-down')

  let newResults = [];
  const duplicatedNewArrayDate = result.map(item => item.sales_date);

  const newArray = [...new Set(duplicatedNewArrayDate)];

  newResults = newArray.map(item => {
    return {
      date: new Date(item).toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      array: result.filter(items => {
        return items.sales_date === item && items;
      })
    };
  });
  return (
    <Main>
        <Title
        documentTitle="Orders"
          title="Order"
          tools={[
            <PrintButton />,
            <Tooltip tip="Export to Excel">
              <DownloadButton endpoint={ENDPOINTS.sales.list.order} filters={filters} />
            </Tooltip>
          ]}
          />
        <Filters>
          <Filters.Date.Range />
          <Filters.Button.SalesType />
          <Filters.Button.NewUsed />
          <Filters.Select.SoldDate setIcon={setIcon} icon={icon} showIcon={true} />
        </Filters>
          <TableScrollbox>
        <div>
          {newResults?.map(({ date, array = [] }, i) => {
            const numRows = array.length + 1;
            const tableHeight = `calc(3rem * ${numRows})`;
            const ind = columns.findIndex(element => element.name === lastCol);
            return mobile.mobile ? (
              <div key={i}>
                <h3 className="heading text-primary">{date}</h3>
                {array?.map((record, j) => (
                  <div key={`i${j}`} className={clsx(styles.container, 'pl-2 pr-1')}>
                    <MobileTableEntry ind={ind} columns={columns} children={children} record={record} isFolder={true}/>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.container} style={numRows < 10 ? { minHeight: `${tableHeight}` } : {}} key={i}>
                <h2 className="text-uppercase large">{date}</h2>
                <div className="border">
                  <Table.Header rowNumber={false} />
                  <Table.Body className={clsx(numRows < 10 && styles.tableContent)}>
                    {array?.map((user, j) => (
                      <Table.Entry key={j} record={user} columns={columns} />
                    ))}
                  </Table.Body>
                </div>
              </div>
            );
          })}
        </div>
      </TableScrollbox>
    </Main>
  );
});
// EXPORT
export default getListData(Order, {
  key: 'order',
  fetchArgs: {
    endpoint: ENDPOINTS.sales.list.order
  },
  defaults : {
    order: 'D',
    sort : 'sales_time',
    endDate:  TODAY,
    startDate: ALL_TIME,
  },
  columns: [
    {
      ...COLUMNS.estimatedDeliveryDate,
      xs: 3
    },
    {
      ...COLUMNS.salesStatusCode,
      xs: 1
    },
    {
      ...COLUMNS.sisperson,
      xs: 3
    },
    {
      ...COLUMNS.customerName,
      xs: 3
    },
    {
      ...COLUMNS.age,
      xs: 1
    },
    {
      ...COLUMNS.newUsed,
      xs: 1
    },
    {
      ...COLUMNS.purchaseLease,
      xs: 1
    },
    {
      ...COLUMNS.retail,
      xs: 1
    },
    {
      ...COLUMNS.stockNumber,
      lg: 3
    },
    {
      ...COLUMNS.makeModel,
      xs: 3
    },
    {
      ...COLUMNS.trade,
      lg: 2
    },
    {
      ...COLUMNS.frontendGross,
      xs: 3
    },
    {
      ...COLUMNS.amAssignmentUser,
      xs: 2
    },
    {
      ...COLUMNS.amTime,
      xs: 3
    },
    {
      ...COLUMNS.amStatus,
      xs: 1
    },
    {
      ...COLUMNS.fmAssignmentUser,
      xs: 2
    },
    {
      ...COLUMNS.fmTime,
      xs: 3
    },
    {
      ...COLUMNS.fmStatus,
      xs: 1
    },
    {
      ...COLUMNS.sa1,
      xs: 1
    },
    {
      ...COLUMNS.sa2,
      xs: 1
    },
    {
      ...COLUMNS.sa3,
      xs: 1
    },
  ],
  actions: [
    ACTIONS.openSales
  ]
});
