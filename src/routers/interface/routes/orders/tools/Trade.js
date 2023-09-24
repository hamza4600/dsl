import React from 'react';
// BOOTSTRAP COMPONENTS
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { makePath } from 'functions';
import { INTERFACE } from 'pathnames';
import styles from './tradeCell.module.scss';


// MAIN COMPONENT
const Trade = ({children}) => {
    return (
        <div>
            {children.length ? <div className={clsx(styles.textAlign)}>
                <p className='m-0'>{children[0].vehicle_year} {children[0].make}</p>
                <p className='m-0'>{children[0].model} {`$${children[0].acv.toFixed(2)}`}</p>
                <Link to={makePath(INTERFACE.inventory, 'view', children[0]?.daily_sales_inventory_id)} >({children[0].stock_num})</Link >
                </div> : <></>}
        </div>
    );
};

// EXPORT
export default Trade;
