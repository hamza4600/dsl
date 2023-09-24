import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import NumberFormat from 'react-number-format';

// REACT ROUTER COMPONENTS
import { Link } from 'react-router-dom';

// GLOBAL VARIABLES
import { INTERFACE } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// GLOBAL COMPONENTS
import Table from 'parts/table/Table';

// STYLES
import styles from './tradeTableCell.module.scss';

// MAIN COMPONENT
const TradeTableCell = ({ className, children, amountKey, ...props }) => (
  <Table.Cell className={clsx(styles.trades, className)} {...props}>
    {children.map(m => (
      <div key={m.daily_sales_inventory_id} className={styles.trade}>
        <div className="d-flex flex-wrap">
          <span className="mr-1">{m.vehicle}:</span>
          <NumberFormat
            displayType="text"
            prefix="$"
            value={parseFloat(m[amountKey])}
            decimalScale={2}
            fixedDecimalScale
          />
        </div>
        <span>
          (
          <Link
            className={styles.link}
            to={makePath(INTERFACE.inventory, 'view', m.daily_sales_inventory_id)}
          >
            {m.stock_num}
          </Link>
          )
        </span>
      </div>
    ))}
  </Table.Cell>
);

// EXPORT
export default TradeTableCell;
