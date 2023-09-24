import React from 'react';

// LOCAL VARIABLES
import {TRACKING_TYPES} from '../../../variables';

// LOCAL COMPONENTS
import InfoWrapper from '../InfoWrapper';

// STYLE
import VehicleManagementItem from '../VehicleManagementItem';
import {useFormikContext} from "formik";


// MAIN COMPONENT
const VehicleManagement = ({ inventoryId }) => {
  const { values } = useFormikContext();
  const {
    dummy = {
      aryTrackCode: [],
      aryTrackCodeStatusHistory: []
    },
    date_created } = values;
  const { aryTrackCode = [], aryTrackCodeStatusHistory = [] } = dummy;

  // RENDER
  return (
    <InfoWrapper title="Vehicle Management">
      {aryTrackCode?.map(
        (
          { tracking_type_id, tracking_code_name, tracking_code_color, tracking_code_id, ...trackItem },
          index
        ) => {
          const trackingTypeData = TRACKING_TYPES.find(({ id }) => id === tracking_type_id);

          return trackingTypeData && <VehicleManagementItem
            key={`${trackingTypeData.label}-${index}`}
            history={aryTrackCodeStatusHistory.filter(({ tracking_type }) => tracking_type === trackingTypeData.key)}
            inventoryId={inventoryId}
            trackingTypeId={tracking_type_id}
            trackingCodeId={tracking_code_id}
            trackingType={trackingTypeData.key}
            trackingCodeName={tracking_code_name}
            title={trackingTypeData.label}
            color={tracking_code_color}
            createdAt={date_created}
          />}
      )}
  </InfoWrapper>)
};

// EXPORT
export default VehicleManagement;
