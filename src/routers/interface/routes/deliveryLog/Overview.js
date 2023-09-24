import React, { useContext } from 'react';

import { Col, Row } from 'react-bootstrap';

// GLOBAL COMPONENTS
import Main from 'parts/main/Main';
import Title from 'parts/title/Title';
import Filters from 'parts/filters/Filters';
import Table from 'parts/table/Table';
import MobileTableEntry from 'parts/table/layout/MobileTableEntry';
import TableHeaderCell from 'parts/table/layout/TableHeaderCell';

// LOCAL COMPONENTS
import { THIS_MONTH, TODAY } from 'timeFormats';
import { ENDPOINTS } from 'endpoints';
import { getListData, ListContext } from 'helpers/getListData';
import { DEELIVEREY_LOG_TYPE} from 'codes';
import { ACTIONS, DATE_HEADING, DELIVERED_COLUMNS, OVERVIEW_HEADER, OVERVIEW_UPER_TABEL_BODY, OVERVIEW_UPER_TABEL_HEADING } from './variables';

//STYLE
import clsx from 'clsx';
import style from './overView.module.scss';
import TableEntryCell from 'parts/table/layout/TableEntryCell';
import Card from 'parts/card/Card';
// import cellStyles from '';

// CHILD COMPONENTS
const Divider = () => <div className={clsx(
  'divider',
  style.divider
)} />;

// MAIN COMPONENT
const Overview =({
    lastCol,
    children,
    // REDUX STATE
    mobile
  }) =>  {

  // CONTEXT
  const {
    result = [],
    columns = [],
    data={},
  } = useContext(ListContext) || {}; 
  
  // RENDER
  return (
    <Main>
      <Title documentTitle="Delivery Log -> OverView-" title="Delivery Log" />
      <Filters> 
        <Filters.Date.Range />
        <Filters.Button.SalesType />
        <Filters.Button.NewUsed />
        <Filters.Sort className='ml-auto' />
      </Filters>
      <div>
        <Card className="rounded border">
          <Row className='mr-0 ml-0'>
          {OVERVIEW_HEADER.map((val, index) => <Col className="border pt-3 pb-3" key={index}>
            <div className={style.had}>{val.name}</div>
            <div className={clsx('mt-3',style.hadVal)}>{data[val.key]}</div>
            </Col>)}
          </Row>
        </Card>
        {data && (
          <div className="border">
            <Table.Header rowNumber={false}>
              {OVERVIEW_UPER_TABEL_HEADING.map(({ label, className, size, sortable }, index) => (
                <TableHeaderCell
                  key={index}
                  className={clsx(style[label], style[size], className,'text-center')}
                  sortable={sortable}
                  size={size}
                  sortKey={label}
                  label={label}
                />
              ))}
            </Table.Header>
            <Table.Body className={clsx(style.tableContent)}>
              {OVERVIEW_UPER_TABEL_BODY.map((user, j) => {
                return (
                  <Table.Entry key={j} action={false}>
                    {user.values.map((item, index) => (
                      <TableEntryCell key={index} size={item.size}>
                        {data[item.key] || item.label}
                      </TableEntryCell>
                    ))}
                  </Table.Entry>
                );
              })}
            </Table.Body>
          </div>
        )}
        {result?.map((resultData, i) => {
          const numRows = resultData?.overview_sale_records.length + 1;
          const tableHeight = `calc(3rem * ${numRows})`;
          const ind = columns.findIndex(element => element.name === lastCol)
          return (
            resultData.totalday_net !== '0' &&
            (mobile?.mobile ? (
              <div key={i}>
                <h3 className="heading text-primary">{resultData?.delivered_date}</h3>
                {resultData?.overview_sale_records?.map((record, j) => (
                  <div key={`i${j}`} className={clsx(style.container, 'pl-2 pr-1')}>
                    <MobileTableEntry ind={ind} columns={columns} children={children} record={record} />
                  </div>
                ))}
              </div>
            ) : (
              resultData?.overview_sale_records.length > 0 && (
                <div className={style.container} style={numRows < 10 ? { minHeight: `${tableHeight}` } : {}} key={i}>
                  <Row className="pb-2">
                    {DATE_HEADING.map((record, index) => (
                      <Col key={index} className="m-0 p-0" md={record.colSize}>
                        {record.name && (
                          <>
                            <Divider />
                            <div className={clsx('pl-3 mb-2 d-inline-block', record.class)}>{record.name}</div>
                          </>
                        )}
                        <div className={clsx('pl-3 mb-2 d-inline-block', record.class, record.date && style.dateHeading)}>
                          {resultData[record.key]}
                        </div>
                      </Col>
                    ))}
                  </Row>

                  <div className="border">
                    <Table.Header rowNumber={false} />
                    <Table.Body className={clsx(numRows < 10 && style.tableContent)}>
                      {resultData?.overview_sale_records.map((user, j) => {
                        return <Table.Entry key={j} record={user} columns={columns} />;
                      })}
                    </Table.Body>
                  </div>
                </div>
              )
            ))
          );
        })}
      </div>
    </Main>
  );}

// EXPORT
export default getListData(Overview, {
  key: 'overview',
  fetchArgs: {
    endpoint: ENDPOINTS.delivereyLog.delivered,
    params:{
      deliveryLogType: DEELIVEREY_LOG_TYPE.OverView.code
    },
  },
  defaults: {
    order: 'ASC',
    sort : 'delivered_date',
    startDate: THIS_MONTH,
    endDate: TODAY
  },
  
  columns: [
    {
      ...DELIVERED_COLUMNS.time,
      xs: 2
    },
    {
      ...DELIVERED_COLUMNS.saleStatus,
      xs: 1
    },
    {
      ...DELIVERED_COLUMNS.overViewSalePerson,
      xs: 3
    },
    {
      ...DELIVERED_COLUMNS.overViewCustomer,
      xs: 4
    },
    {
      ...DELIVERED_COLUMNS.age,
      xs: 1
    },
    {
      ...DELIVERED_COLUMNS.newUsed,
      xs: 1
    },
    {
      ...DELIVERED_COLUMNS.purchaseLease,
      xs: 1
    },
    {
      ...DELIVERED_COLUMNS.overViewSaleType,
      xs: 1
    },
    {
      ...DELIVERED_COLUMNS.stockNumber,
      md: 4
    },
    {
      ...DELIVERED_COLUMNS.makeModel,
      xs: 3
    },
    {
      ...DELIVERED_COLUMNS.trade,
      lg: 4
    },
    {
      ...DELIVERED_COLUMNS.overViewFrontendGross,
      xs: 3
    },
    {
      ...DELIVERED_COLUMNS.amGross,
      xs: 4
    },
    {
      ...DELIVERED_COLUMNS.fiGross,
      xs: 3
    },
    {
      ...DELIVERED_COLUMNS.fe_be_gross_bp,
      xs: 2
    },
    {
      ...DELIVERED_COLUMNS.dealerPack,
      xs: 4
    },
    {
      ...DELIVERED_COLUMNS.fe_be_gross_ap,
      xs: 2
    },
  ],
  actions: [
    ACTIONS.openSales
  ]
});