import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// LOCAL VARIABLES
import { COLUMNS, ACTIONS, SETTINGS } from './dealTasks/variables';

// GLOBAL HELPERS
import { getListData, ListContext } from 'helpers/getListData';

// GLOBAL COMPONENTS
import Main from 'parts/main/Main';
import Button from 'core/tools/Button';

// LOCAL COMPONENTS
import Title from 'parts/title/Title';
import Filters from 'parts/filters/Filters';
import Table from 'parts/table/Table';
import Tasks from './dealTasks/parts/Tasks';
import MobileTableEntry from 'parts/table/layout/MobileTableEntry';
import TableActions from 'parts/table/layout/TableActions';
import Sprite from 'core/tools/Sprite';

// REACT BOOTSTRAP COMPONENTS
import { Accordion, Col, Row} from 'react-bootstrap';

// STYLES
import styles from './dealTasks.module.scss';
import clsx from 'clsx';

// MAIN COMPONENT
const DealTasks =compose(connect(({ mobile }) => ({ mobile })))( 
  ({
    //REDUX STATE
    mobile,
  }) => {

  // CONTEXT
  const { result, columns, updateContext } = useContext(ListContext);

  // After completing or un-completing a task the list should not be reloaded
  // so need to be able to update the list row task_cnt value without reloading the list
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(result || []);
  }, [result]);
  const ind = columns.findIndex(element => element.name === 'fm_manager')
  
  return (
    <Main>
      <Title
        documentTitle="Deal Tasks"
        title="Deal Tasks"
        tools={[<Button.Link icon="print" />, <Button.Link icon="download-excel" />]}
      />

      <Filters>
        <Filters.Search />
      </Filters>

      {mobile.mobile ? (
        result?.map((record, i) => {
          return (
            <Accordion key={i} className={styles.accordion}>
              <div className={clsx(styles.container, 'pl-2 pr-1')}>
                <Row className={clsx(styles.label, styles.tableRow, 'pl-2')}>
                  <Col className="p-0 m-0">#{i + 1}</Col>
                  <Col className="mr-auto m-0 p-0">
                    <TableActions className={clsx(styles.actions, 'ml-2')} record={record} />
                  </Col>
                </Row>
                <MobileTableEntry ind={ind} columns={columns} result={result} record={record} />
                <Row className={clsx(styles.taskBorder, 'm-0 p-0 mt-n1 ml-n2 mr-n1')}>
                  <Accordion.Toggle eventKey={record.sales_id} className="m-auto pb-3 pt-3">
                    <Sprite className={clsx('btn-sprite', styles.iconColor)} use="chevron-down" size="xl" />
                  </Accordion.Toggle>
                  <Tasks
                    mobile={mobile.mobile}
                    eventKey={record.sales_id}
                    tasks={record.tasks}
                    reloadTasks={() => updateContext({ type: 'updateSettings', reload: true })}
                    rowIndex={i}
                    updateList={setList}
                  />
                </Row>
              </div>
            </Accordion>
          );
        })
      ) : (
        <Table>
          <Table.Header />
          <Table.Body className={styles.body}>
            {list.map((record, ri) => (
              <Accordion key={ri} className={styles.accordion}>
                <Table.Entry record={record} rowNumber={(ri + 1).toString()}>
                  {columns.map(({ key, className, inventoryIDKey = key, ...column } = {}, ci) => (
                    <Table.Entry.Cell
                      key={ci}
                      eventKey={record.sales_id}
                      value={record[key]}
                      className={className}
                      inventoryId={record[inventoryIDKey]}
                      {...column}
                    />
                  ))}
                </Table.Entry>
                <Tasks
                  eventKey={record.sales_id}
                  tasks={record.tasks}
                  reloadTasks={() => updateContext({ type: 'updateSettings', reload: true })}
                  rowIndex={ri}
                  updateList={setList}
                />
              </Accordion>
            ))}
          </Table.Body>
        </Table>
      )}
    </Main>
  );
})

// EXPORT
export default getListData(DealTasks, {
  key: SETTINGS.path,
  fetchArgs: {
    endpoint: ENDPOINTS.dealTasks.list,
    params: {}
  },
  settings: SETTINGS,
  columns: [
    COLUMNS.tasks,
    COLUMNS.deliveredDate,
    COLUMNS.deliveredAge,
    COLUMNS.customerName,
    COLUMNS.saleType,
    COLUMNS.stockNum,
    COLUMNS.age,
    COLUMNS.trades,
    COLUMNS.frontEndGross,
    COLUMNS.amGross,
    COLUMNS.fiGross,
    COLUMNS.totalGross,
    COLUMNS.salesPerson,
    COLUMNS.fmManager
  ],
  actions: [
    ACTIONS.openSales
  ]
});
