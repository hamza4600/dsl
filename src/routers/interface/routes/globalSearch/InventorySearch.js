import React, { useContext, useMemo, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// LOCAL VARIABLES
import { SEARCH_FILTER_COLUMN, SETTINGS } from './variables';

// GLOBAL FUNCTIONS

// GLOBAL HELPERS
import { getListData, ListContext } from 'helpers/getListData';

// GLOBAL COMPONENTS
import Table from 'parts/table/Table';
import Title from 'parts/title/Title';
import MobileTableEntry from 'parts/table/layout/MobileTableEntry';

//STYLE
import style from './globalSearch.module.scss';
import clsx from 'clsx';


const InventorySearch = compose(connect(({ mobile }) => ({ mobile })))(
    ({
      lastCol ='',
      children,
      // REDUX STATE
      mobile
    }) => {

      const [inventoryList, showInventoryList] = useState(false)
      const { data : {inventory}, columns = [] } = useContext(ListContext) || {};
      const empty = useMemo(
        () => inventory?.records?.length < 1,
        [inventory]
      )

      let inventoryCount=inventory?.total_records || 0;

      const ind = columns.findIndex(element => element.name === lastCol)
      const numRows = inventory?.records?.length + 1;
          const tableHeight = `calc(3rem * ${numRows})`;
          const handelcontent=() => showInventoryList((state) => !state)
  return (
    <>
    <div className={style.searchHeading} onClick={handelcontent}>
    <Title
          title={`Inventory Search: ${inventoryCount}`}
          
        />
    </div>
        
      {inventoryList && (empty ? (
        <h4 className={style.message}>No Records Found</h4>
      ) : (
       mobile.mobile? inventory?.records.map((record, i) => {
        return (
          <div key={i} style={numRows < 10 ? { minHeight: `${tableHeight}` } : {}} className={clsx(style.container, 'pl-2 pr-1')}>
            <MobileTableEntry 
            rowNumber={'#'+(i+1)} 
            ind={ind} 
            columns={columns} 
            children={children} 
            result={inventory?.records} 
            record={record} />
          </div>
        );
      }): <div className='pb-5'>
          <Table.Header deal={inventory} />
          <Table.Body className={numRows < 10 && style.tableContent}>
            {inventory?.records.map((user, j) => {
              return <Table.Entry key={j} record={user} columns={columns} rowNumber={j + 1} />;
            })}
          </Table.Body>
        </div>
      ))}
      </>
  );
})

// EXPORT
export default getListData(InventorySearch, {
    key: 'inventorySearch',
    fetchArgs: {
      endpoint: ENDPOINTS.globalSearch.search,
    },
    columns: [
      {
        ...SEARCH_FILTER_COLUMN.date,
        xs:2
      },
      {
        ...SEARCH_FILTER_COLUMN.inventoryType,
        xs:1
      },
      {
        ...SEARCH_FILTER_COLUMN.age,
        xs: 1
      },
      {
        ...SEARCH_FILTER_COLUMN.stock,
        md: 8
      },
      {
        ...SEARCH_FILTER_COLUMN.vehicleInfo,
        xs: 8
      },
      {
        ...SEARCH_FILTER_COLUMN.mileage,
        xs: 2
      },
      {
        ...SEARCH_FILTER_COLUMN.acv,
        xs: 8
      },
      {
        ...SEARCH_FILTER_COLUMN.dmsInvoice,
        xs: 8
      },
      {
        ...SEARCH_FILTER_COLUMN.inventorySource,
        xs: 8
      },
      {
        ...SEARCH_FILTER_COLUMN.inventoryStatus,
        
      },
    ]
  })
  