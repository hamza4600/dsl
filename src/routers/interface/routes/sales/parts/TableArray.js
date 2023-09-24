import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// LOCAL COMPONENTS
import Form from 'core/form/Form';
import Button from 'core/tools/Button';
import Checkbox from 'core/form/control/types/checklist/parts/Checkbox';

// BOOTSTRAP COMPONENTS
import { Col, Row } from 'react-bootstrap';

//STYLES
import styles from './styles.module.scss';

const TableArray = ({ array, keys, columns, onRemoveClick, onHandleChange }) => {
  //Render
  return (
    <>
      {array?.length > 0 && (
        <div className="w-100 px-3 px-lg-0 border rounded">
          <div className="table-header border">
            <Row className="table-header-row m-0">
              {columns.map((col, c) => {
                return (
                  <Col key={c} lg={col.size} className="table-header-col">
                    <Form.Label>{col.label}</Form.Label>
                  </Col>
                );
              })}
            </Row>
          </div>
          <div className="table-entry">
            {Array.isArray(array)
              ? array.map((v, i) => (
                  <Row className={clsx('m-0', styles.entry)} key={i}>
                    <Col lg={1}>
                      <Form.Label>{i + 1}</Form.Label>
                    </Col>
                    {keys.map((valueKey, k) => {
                      return (
                        <Col key={k} lg={valueKey.size}>
                          {valueKey.key === 'item_add_as_task' ? (
                            <Checkbox
                              label="Add As Task"
                              id={'item_add_as_task'}
                              checked={v[valueKey.key]}
                              value={v[valueKey.key]}
                              onChange={e => {
                                onHandleChange(e, i);
                              }}
                            />
                          ) : (
                            <Form.Control
                              id={valueKey.key}
                              value={v[valueKey.key]}
                              onChange={e => {
                                onHandleChange(e, i);
                              }}
                            />
                          )}
                        </Col>
                      );
                    })}
                    <Col className={styles.col} lg={3}>
                      <Button.Delete
                        className="m-3"
                        onClick={() => {
                          onRemoveClick(i);
                        }}
                        outline
                        variant="secondary"
                        icon="cancel"
                        label=""
                        size="xs"
                        fullWidth={false}
                      />
                    </Col>
                  </Row>
                ))
              : null}
          </div>
        </div>
      )}
    </>
  );
};

// EXPORT
export default TableArray;
