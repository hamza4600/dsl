import React from 'react';

// BOOTSTRAP DEPENDENCIES
import { Accordion } from 'react-bootstrap';

// GLOBAL COMPONENTS 
import Button from 'core/tools/Button';
import Table from 'parts/table/Table';

// STYLES
import style from './style.module.scss';

const Collapse = ({ data, index, title }) => (
  <div className={style.container} key={index}>
    <Accordion defaultActiveKey={"0"}>
      <Accordion.Toggle className={style.toggle_button} as={Button} eventKey={index.toString()} label={title} variant="link"  >
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={index.toString()} key={index} >
        <Table>
          <Table.Header />
          <Table.Body>
            {data.map((user, i) => {
              return (
                <Table.Entry
                  key={i}
                  record={user}
                  rowNumber={(i+1).toString()}
                />
              )
            })}
          </Table.Body>
        </Table>
      </Accordion.Collapse>
    </Accordion>
  </div>
)

export default Collapse;
