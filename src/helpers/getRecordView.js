import { useMemo } from 'react';

// DEPENDENCIES
import camelCase from 'lodash/camelCase';
import { useLocation } from 'react-router-dom';

// MAIN COMPONENT
const useRecordView = () => {
  const { pathname } = useLocation();

  const view = pathname.match(/(?:\/)(.*?)(?=\/)/)?.[1];

  const isView = useMemo(
    () => ({
      isView: pathname.includes('/view/'),
      isEdit: pathname.includes('/edit/'),
      isAdd: pathname.includes('/add/')
    }),
    [pathname]
  );

  return { ...isView, view: camelCase(view) };
};

// EXPORT
export default useRecordView;
