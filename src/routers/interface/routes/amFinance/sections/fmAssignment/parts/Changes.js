import React from 'react';

// DEPENDENCIES
import { useFormikContext } from 'formik';

// GLOBAL COMPONENTS
import CountBadge from 'core/tools/CountBadge';

// MAIN COMPONENT
export default function Changes() {
  const { values } = useFormikContext() || {};
  const { number_of_times_fm_manager_updated, fm_days_diff_between_sales_update } = values;

  return (
    <div className="d-flex align-items-center">
      <div className="mr-3 text-nowrap">
        Changes{' '}
        <CountBadge
          count={number_of_times_fm_manager_updated}
          color={number_of_times_fm_manager_updated ? 'orange' : undefined}
        />
      </div>
      {+fm_days_diff_between_sales_update > 0 ? (
        <div className="text-nowrap">
          Days{' '}
          <CountBadge
            count={fm_days_diff_between_sales_update}
            color={fm_days_diff_between_sales_update ? 'orange' : undefined}
          />
        </div>
      ) : null}
    </div>
  );
}
