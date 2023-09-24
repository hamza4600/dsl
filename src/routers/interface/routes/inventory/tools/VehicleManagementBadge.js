import React from 'react';

// REACT COMPONENTS
import Table from 'parts/table/Table';

// MAIN COMPONENT
const VehicleManagementBadge = ({
  children,
  lookupData = [],
  ...props
}) => {

  const {
    vehicle_management_name,
    vehicle_management_code,
    vehicle_management_color = vehicle_management_code ? 'secondary' : undefined
  } = lookupData.find(o => o.vehicle_management_id === children) || {};

  return (
    <Table.Badge
      variant={vehicle_management_color}
      tip={vehicle_management_name}
      {...props}
    >
      {children || vehicle_management_code}
    </Table.Badge>
  )
}

// EXPORT
export default VehicleManagementBadge;
