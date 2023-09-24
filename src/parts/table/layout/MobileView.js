import React, { useContext, useMemo} from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import clsx from 'clsx';

import { ListContext } from 'helpers/getListData';
import MobileTableEntry from './MobileTableEntry';

import style from './mobileView.module.scss';
const MobileView = compose(
    connect(
      ({ mobile })=> ({ mobile })
    )
  )(({
    children,
    lastCol,
    // REDUX STATE
    mobile
  }) => {
    const {columns =[], result = [] } = useContext(ListContext) || {};
    const ind = columns.findIndex(element => element.name === lastCol)
  
    //MEMOS
  const empty = useMemo(
    () => !children && result.length < 1,
    [children, result]
  )

  return (
    <div className={style.empty}>
      {!empty ? (
        result?.map((record, i) => {
          return (
            <div key={i} className={clsx(style.container, 'pl-2 pr-1')}>
              <MobileTableEntry 
              rowNumber={'#'+(i+1)} 
              ind={ind} 
              columns={columns} 
              children={children} 
              result={result} 
              record={record} />
            </div>
          );
        })
      ) : (
        <h4 className={style.message}>No Records Found</h4>
      )}
    </div>
  );
})

export default MobileView