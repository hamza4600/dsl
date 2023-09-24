import clsx from 'clsx';
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import TableEntryCell from './TableEntryCell';
import Button from 'core/tools/Button';
//STYLE
import style from './mobileView.module.scss';
import TableActions from './TableActions';

const MobileTableEntry = ({
    children,
    rowNumber,
    ind,
    columns,
    result,
    isFolder=false,
    header,
    record,
}) => {
    const newColumns = ind !== -1 ? columns.slice(0, ind + 1) : columns
    const adjustedPrice = record['adjusted_price'] || record['advertised_price']
  
    //LOCAL STATES
  const [priceAdjusted, setPriceAdjusted] = useState(adjustedPrice);
  const [icon, setIcon] = useState(adjustedPrice ?'good':'');
  return (
    <>
      {rowNumber && <Row className={clsx(style.label, style.tableRow, 'pl-2')}>{rowNumber} </Row>}
      {children ||
        newColumns?.map((column, j) => (
          <Row key={j} className={clsx(style.tableRow)}>
            <Col className={clsx(style.label, 'p-2')}>
              {column?.icon ? (
                <>
                  <span>{column['label']}</span>
                  <Button.Link className={clsx(style.icon)} icon={column?.icon} />
                </>
              ) : (
                column['label']
              )}
            </Col>
            <Col className={clsx(style.cell, 'p-0')}>
              <TableEntryCell
                record={record}
                columnKey={column.key}
                setPriceAdjusted={setPriceAdjusted}
                priceAdjusted={priceAdjusted}
                icon={icon}
                setIcon={setIcon}
                value={record[column.key]}
                mobileView={true}
                {...column}
              />
            </Col>
          </Row>
        ))}
      {isFolder && <Row className={clsx(style.tableRow, 'pt-3 pb-3')}>
        <Col className={clsx(style.cell, 'p-0')}>
          <TableActions className={style.actions} record={record} header={header} />
        </Col>
      </Row>}
    </>
  );
}

export default MobileTableEntry