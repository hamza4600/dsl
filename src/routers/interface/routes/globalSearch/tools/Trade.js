import Table from 'parts/table/Table';
import React from 'react'

const Trade = ({record}) => {
    const {trades} =record
  return (
    <div>
      {trades?.map((trade, i) => (
        <div key={i} className='pt-1'>
          <span> &nbsp;
            {trade?.vehicle_year}
            </span>
            <span> &nbsp;
            {trade.model}
            </span>
            <span> 
            {trade.make} &nbsp;
          </span>
          : <span>{trade?.acv}</span>
          <div className='pl-2'>
            (<Table.View>{trade.stock_num}</Table.View>)
          </div>
        </div>
      ))}
    </div>
  );
}

export default Trade