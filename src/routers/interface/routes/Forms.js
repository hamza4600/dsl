import React, { useContext, useEffect, useState } from 'react';

// GLOBAL COMPONENTS
import Main from 'parts/main/Main';

// LOCAL COMPONENTS
import Title from 'parts/title/Title';
import { getListData, ListContext } from 'helpers/getListData';
import { ENDPOINTS } from 'endpoints';
import { ACTIONS, COLUMNS } from './form/variables';
import Filters from 'parts/filters/Filters';
import Table from 'parts/table/Table';
import clsx from 'clsx';
import { Col } from 'react-bootstrap';
import TableHeader from 'parts/table/layout/TableHeader';
import TableEntry from 'parts/table/layout/TableEntry';
import TableActions from 'parts/table/layout/TableActions';

// STYLES
import style from './form/form.module.scss';
import Sprite from 'core/tools/Sprite';


// MAIN COMPONENT
const Forms = () => {
  const {
    result = [],
    columns = [],
    preferences: { showColumns,filters }
  } = useContext(ListContext) || {};

 

  const [newResults, setNewResults] = useState([])
  
  
  useEffect(() => {
    let typeResults = [
      { label: 'Finance', icon:'dollar', records: result.filter(item => item.form_department === 'Finance' && item) || [] },
      { label: 'Training', icon:'training', records: result.filter(item => item.form_department === 'General' && item) || [] },
      { label: 'Sales', icon:'notePage', records: result.filter(item => item.form_department === 'Sales' && item) || [] }
    ];
   
    setNewResults(typeResults)
  }, [result])
  


  return (
    <Main>
      <Title documentTitle="Forms" title="Forms" />
      <Filters>
        <Filters.Select.InventorySource />
        <Filters.Search />
      </Filters>
      <TableHeader>
        {showColumns?.map((key, i) => {
          const { className, ...column } = columns.find(column => column.key === key) || {};
          return <Col className={clsx(column.colSize, 'p-0 align-items-center d-flex')}>{column.label}</Col>;
        })}
      </TableHeader>

      {newResults?.map((typeResult, index) => {
        const tableHeight = typeResult.records?.length + 1 || 0;
        console.log(typeResult.icon);
        return (
          <div
            className={style.container}
            style={tableHeight < 10 ? { minHeight: `calc(4rem * ${tableHeight})` } : {}}
            key={index}
          >
            <div className={clsx(style.heading, 'mt-5 pb-3')}>
            <Sprite use={typeResult.icon} size='lg' className='mt-1'/>
            <p >{typeResult?.label}</p>
            </div>
            <div className={style.tableContainer} >
            {typeResult.records?.map((record, j) => {
              return (
                <TableEntry className={clsx('table-entry-row')} record={record} >
                  <Col className='d-flex align-items-center' sm={2}><div>{j + 1}</div></Col>
                  {showColumns?.map((key, i) => {
                    const {
                      className,
                      component: Component = Col,
                      ...column
                    } = columns.find(column => column.key === key) || {};
                    return (
                      <Col className='d-flex' sm={column?.col}>
                      <Component  key={i} className={clsx('p-0 align-items-center d-flex')}>
                        {record[key]}
                      </Component>
                      </Col>
                    );
                  })}
                  <Col sm={2}>
                  <TableActions record={record} header={true} />
                  </Col>
                </TableEntry>
              );
            })}
            </div>
          </div>
        );
      })}
    </Main>
  );}

// EXPORT
export default getListData(Forms, {
  key: 'form',
  fetchArgs: {
    endpoint: ENDPOINTS.admin.dealerForm.list
  },

  columns: [
    {
      ...COLUMNS.formName,
      sm: 3
    },
    {
      ...COLUMNS.description,
      md: 5
    },
    {
      ...COLUMNS.instruction,
      sm: 3
    }
  ],
  actions: [
    ACTIONS.view
  ]
});
