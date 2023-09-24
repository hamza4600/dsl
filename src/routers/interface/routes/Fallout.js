import React, { useContext, useEffect, useState } from 'react';

// GLOBAL COMPONENTS
import Main from 'parts/main/Main';
import { ENDPOINTS } from 'endpoints.js';
import { THIS_MONTH } from 'timeFormats';

// LOCAL COMPONENTS
import Title from 'parts/title/Title';

// LOCAL VARIABLES
import { FALLOUTCOLUMNS } from './fallout/variables';

// GLOBAL HELPERS
import { getListData, ListContext } from 'helpers/getListData';
import { TODAY } from 'timeFormats.js';


import Filters from 'parts/filters/Filters';
import Table from 'parts/table/Table';
// STYLES
import style from './orders/order.module.scss';
import TableScrollbox from 'parts/table/layout/TableScrollbox';

// MAIN COMPONENT
const Fallout = () => {
  const { result = [], columns = [] } = useContext(ListContext) || {};
  //STATE
  const [newResults, setNewResults] = useState([])
  
  useEffect(() => {
  const duplicatedNewArrayDate = result.map( item => item.sales_date)
    const newArray=[...new Set(duplicatedNewArrayDate)]
    setNewResults(newArray.map((item) => {
      return {
        date : new Date(item).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}),
          array : result.filter((items) => {
            return items.sales_date === item && items
          })
        }
      }))
  }, [result])
  
  return(
  <Main>
    <Title
    documentTitle='Fallout'
      title="Fallout"
    />
    <Filters>
      <Filters.Date.Range />
      <Filters.Button.SalesType />
      <Filters.Button.NewUsed />

    </Filters>
    <div>
        {newResults?.map(({
          date,
          array = []
        }, i) => {
          const numRows = array.length + 1;
          const tableHeight = `calc(3rem * ${numRows})`;

          return (
            <div className={style.container} style={numRows < 10 ? { 'minHeight': `${tableHeight}`} : {}} key={i}>
              <h3 >{date}</h3>
              <TableScrollbox direction='horizontal'>

                <Table.Header rowNumber={false}/>
                <Table.Body className={numRows < 10 && style.tableContent}>
                  {array?.map((user, j) => {
                    return (
                      <Table.Entry
                        key={j}
                        record={user}
                        columns={columns}
                      />
                    )
                  })}
                </Table.Body>
                </TableScrollbox>
            </div>
          )
        })}
      </div>
  </Main>
)}
// EXPORT
export default getListData(Fallout, {
  key: 'fallout',
  fetchArgs: {
    endpoint: ENDPOINTS.sales.list.fallout
  },
  defaults: {
    startDate: THIS_MONTH,
    endDate: TODAY
  },
  columns: [
    {
      ...FALLOUTCOLUMNS.time,
      xs: 3
    },
    {
      ...FALLOUTCOLUMNS.salesStatusCode,
      xs: 1
    },
    {
      ...FALLOUTCOLUMNS.sisperson,
      xs: 3
    },
    {
      ...FALLOUTCOLUMNS.customerName,
      xs: 4
    },
    {
      ...FALLOUTCOLUMNS.age,
      xs: 1
    },
    {
      ...FALLOUTCOLUMNS.newUsed,
      xs: 1
    },
    {
      ...FALLOUTCOLUMNS.purchaseLease,
      xs: 1
    },
    {
      ...FALLOUTCOLUMNS.retail,
      xs: 1
    },
    {
      ...FALLOUTCOLUMNS.stockNumber,
      xs: 3
    },
    {
      ...FALLOUTCOLUMNS.makeModel,
      xs: 3
    },
    {
      ...FALLOUTCOLUMNS.trade,
      xs: 1
    },
    {
      ...FALLOUTCOLUMNS.frontendGross,
      xs: 3
    },
    {
      ...FALLOUTCOLUMNS.amAssignmentUser,
      xs: 3
    },
    {
      ...FALLOUTCOLUMNS.amTime,
      xs: 3
    },
    {
      ...FALLOUTCOLUMNS.amStatus,
      xs: 1
    },
    {
      ...FALLOUTCOLUMNS.fmAssignmentUser,
      xs: 3
    },
    {
      ...FALLOUTCOLUMNS.fmTime,
      xs: 3
    },
    {
      ...FALLOUTCOLUMNS.fmStatus,
      xs: 1
    },
    {
      ...FALLOUTCOLUMNS.sa1,
      xs: 1
    },
    {
      ...FALLOUTCOLUMNS.sa2,
      xs: 1
    },
    {
      ...FALLOUTCOLUMNS.sa3,
      xs: 1
    },
    {
      ...FALLOUTCOLUMNS.openDetail,
      xs: 1
    }
  ]
});
