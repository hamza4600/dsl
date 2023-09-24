import React, { useContext, useMemo, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// LOCAL VARIABLES
import { ACTIONS, SEARCH_FILTER_COLUMN, SETTINGS } from './variables';


// GLOBAL HELPERS
import { getListData, ListContext } from 'helpers/getListData';

// GLOBAL COMPONENTS
import Table from 'parts/table/Table';
import Title from 'parts/title/Title';
import MobileTableEntry from 'parts/table/layout/MobileTableEntry';
import clsx from 'clsx';
//STYLE
import style from './globalSearch.module.scss';


const DealSearch = compose(connect(({ mobile }) => ({ mobile })))(
    ({
      lastCol,
      children,
      // REDUX STATE
      mobile
    }) => {
      const [dealList, showDealList] = useState(false)

      const { data : {deal}, columns = [] } = useContext(ListContext) || {};
      const empty = useMemo(
        () => deal?.records?.length < 1,
        [deal]
        )

       let dealCount=deal?.total_records || 0;
       const handelcontent=() => showDealList((state) => !state)
  return (
    <>
    <div className={style.searchHeading} onClick={handelcontent}>
     <Title
          title={`Deal Search : ${dealCount}`}
        />
    </div>
      {dealList && (empty ? (
        <h4 className={style.message}>No Records Found</h4>
      ) : (
        deal?.records.map(({ deal_date, deals = [] }, i) => {
          const numRows = deals.length + 1;
          const tableHeight = `calc(3rem * ${numRows})`;
          const date = new Date(deal_date).toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });
      const ind = columns.findIndex(element => element.name === lastCol)

          return (
            mobile.mobile?<>
            <h3 className='heading text-primary'>{date}</h3>
            {deals?.map((record, i) =>(
                <div key={i} className={clsx(style.container, 'pl-2 pr-1')}>
                  <MobileTableEntry 
                  ind={ind} 
                  columns={columns} 
                  children={children} 
                  result={deal?.records} 
                  record={record} />
                </div>
              )
            )}</>:
            <div className={style.container} style={numRows < 10 ? { minHeight: `${tableHeight}` } : {}} key={i}>
              <h3 className='text-primary'>{date}</h3>
              <Table.Header deal={deal} rowNumber={false} />
              <Table.Body className={numRows < 10 && style.tableContent}>
                {deals?.map((user, j) => {
                  return <Table.Entry key={j} record={user} columns={columns} />;
                })}
              </Table.Body>
            </div>
          );
        })
      ))}
    </>
  );
})

// EXPORT
export default getListData(DealSearch, {
  key: 'dealSearch',
  fetchArgs: {
    endpoint: ENDPOINTS.globalSearch.search
  },
  columns: [
    {
      ...SEARCH_FILTER_COLUMN.salesTime,
      sm: 2
    },
    {
      ...SEARCH_FILTER_COLUMN.stat,
      xs: 1
    },
    {
      ...SEARCH_FILTER_COLUMN.salesmanName,
      sm: 3
    },
    {
      ...SEARCH_FILTER_COLUMN.customerName,
      md: 3
    },
    {
      ...SEARCH_FILTER_COLUMN.ageDeal,
      xs: 1
    },
    {
      ...SEARCH_FILTER_COLUMN.newUsed,
      xs: 3
    },
    {
      ...SEARCH_FILTER_COLUMN.purchaseLease,
      xs: 1
    },
    {
      ...SEARCH_FILTER_COLUMN.retailWhole,
      xs: 1
    },
    {
      ...SEARCH_FILTER_COLUMN.stockDeal,
      md: 8
    },

    {
      ...SEARCH_FILTER_COLUMN.vehicleInfoDeal,
      xs: 8
    },
    {
      ...SEARCH_FILTER_COLUMN.trade,
      xs: 8
    },
    {
      ...SEARCH_FILTER_COLUMN.frtGross,
      md: 8
    },
    {
      ...SEARCH_FILTER_COLUMN.amGross,
      xs: 8
    },
    {
      ...SEARCH_FILTER_COLUMN.fiGross,
      xs: 8
    },
    {
      ...SEARCH_FILTER_COLUMN.totalGross,
      xs: 8
    },
  ],
  actions: [
    ACTIONS.openSales
  ]
});
  