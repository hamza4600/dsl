import React from 'react';
// BOOTSTRAP COMPONENTS
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { makePath } from 'functions';
import { INTERFACE } from 'pathnames';
import styles from './trade.module.scss';


// MAIN COMPONENT
const Trade = ({children}) => (
      <div className={clsx(styles.textAlign)}>
        <div>

       
        {children.length ? (
          children.map((trade, i) => (
            <div className={clsx(styles.text)} key={i}>
              <p className="m-0">
                {trade.vehicle_year} {trade.make} {trade.model}:
              </p>
              <p className="m-0">
                {` ${trade.acv} `}
                <Link to={makePath(INTERFACE.inventory, 'view', trade?.daily_sales_inventory_id)}>
                  ({children[0].stock_num})
                </Link>
              </p>
            </div>
          ))
        ) : (
          <></>
        )}
         </div>
      </div>
    );

// EXPORT
export default Trade;
