import React, { useState } from 'react';

// DEPENDENCIES
import get from 'lodash/get';
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

// MAIN COMPONENT
const InventoryDetail = ({
                           children,
                           title="Inventory",
                           onEditClick,
                           buttons,
                           headerRight=null,
                           ...props
                         }) => {
  const [record, setRecord] = useState({});

  const { isAdd, isView, isEdit } = useRecordView();

  const formatRecord = ({
    date_created,
    purchase_date,
    aryDocumentAttachment: a = [],
    aryPriceAdjustmentHistory,
    aryTrackCode,
    aryStatusLog,
    aryActivityLog,
    aryDMSSyncLog,
    aryTrackCodeStatusHistory,
    ...record
  } = {}) => {
    const dateCreated = isAdd ? new Date() : safeDate(date_created);
    const purchaseDate = isAdd ? new Date() : safeDate(purchase_date);
    return {
      ...record,
      date_created: dateCreated ? format(dateCreated, DATE_FORMATS.dateTime) : '',
      purchase_date: purchaseDate ? format(purchaseDate, DATE_FORMATS.date) : '',
      dummy: {
        aryPriceAdjustmentHistory,
        aryTrackCode,
        aryStatusLog,
        aryActivityLog,
        aryDMSSyncLog,
        aryTrackCodeStatusHistory
      }
    };
  };

  const formatParams = ({ date_created, ...v }) => ({
    ...v,
    purchase_method_id: get(v, 'purchase_method_id[0]', v.purchase_method_id),
    location_type_id: get(v, 'location_type_id[0]', v.location_type_id) || 3 // default to 3
  });

  const { stock_num, vehicle_year, make, model } = record;

  return (
    <Record.Update
      title={title}
      label={title}
      endpoints={{
        get: ENDPOINTS.inventory.getRecord,
        single: ENDPOINTS.inventory.single
      }}
      buttonsBefore
      buttons={buttons}
      initialValues={{
        date_created: isAdd ? format(new Date(), DATE_FORMATS.dateTime) : '',
        is_order: '0',
        located_at_dealership: 1,
        purchase_date: format(new Date(), DATE_FORMATS.date),
        purchase_method_id: 2,
        invoice_cost_with_inventory_pack: 0,
        invoice_cost_with_repair_invoice: 0
      }}
      formatRecord={formatRecord}
      formatParams={formatParams}
      onLoadRecord={r => setRecord(r)}
      headerTools={[ <HeaderData stockNo={stock_num} year={vehicle_year} make={make} model={model} onEditClick={onEditClick} />]}
      headerRight={headerRight}
      usePreloader={!isView}
      {...Object.assign((isAdd || isEdit) && {
        successMessage: isEdit ? `Stock# ${stock_num} has been updated.` : ''
      }, props)}
    >
      {children}
    </Record.Update>
  );
};

// EXPORT
export default InventoryDetail;
