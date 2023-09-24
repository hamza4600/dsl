import React, { useState } from 'react';

// DEPENDENCIES
import format from 'date-fns/format';

// GLOBAL VARIABLES
import { DATE_FORMATS } from 'globals.js';
import { ENDPOINTS } from 'endpoints.js';

// GLOBAL FUNCTIONS
import { safeDate } from 'functions.js';

// HELPERS
import useRecordView from 'helpers/getRecordView';

// GLOBAL COMPONENTS
import Record from 'parts/record/Record';
import HeaderData from '../../../tools/HeaderData';
import ActionTab from '../view/parts/ActionTab';

// MAIN COMPONENT
const SalesDetail = ({ children, title = 'Sales', onEditClick, buttons }) => {
  const { isAdd, isView } = useRecordView();
  const [record, setRecord] = useState({});

  const formatRecord = ({
    date_created,
    aryChecklist,
    aryComment,
    aryDealerAMFinance,
    aryDownPayment,
    aryRebate,
    arySpotInstruction,
    inventory,
    ...record
  } = {}) => {
    const dateCreated = safeDate(date_created);
    return {
      ...record,
      ...inventory,
      date_created: dateCreated ? format(dateCreated, DATE_FORMATS.dateTime) : '',
      dummy: {
        aryChecklist,
        aryComment,
        aryDealerAMFinance,
        aryDownPayment,
        aryRebate,
        arySpotInstruction
      }
    };
  };

  const { stock_num, vehicle_year, make, model } = record.inventory || {};

  return (
    <Record.Update
      title={title}
      label={title}
      endpoints={{
        get: ENDPOINTS.sales.getSales,
        single: ENDPOINTS.sales.single
      }}
      buttonsBefore
      buttons={buttons}
      initialValues={{
        date_created: isAdd ? format(new Date(), DATE_FORMATS.dateTime) : ''
      }}
      formatRecord={formatRecord}
      onLoadRecord={r => setRecord(r)}
      headerTools={[
        <HeaderData stockNo={stock_num} year={vehicle_year} make={make} model={model} onEditClick={onEditClick} />
      ]}
      headerRight={isView ? <ActionTab /> : null}
      usePreloader={!isView}
    >
      {children}
    </Record.Update>
  );
};

// EXPORT
export default SalesDetail;
