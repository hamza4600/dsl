import React, { useCallback, useContext } from 'react';

// DEPENDENCIES
import format from 'date-fns/format';

// CONTEXT
import { ListContext } from 'helpers/getListData';

// GLOBAL VARIABLES
import { DATE_FORMATS } from 'globals.js';

// GLOBAL FUNCTIONS
import { documentFetch } from 'functions.js';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// MAIN COMPONENT
const DownloadButton = ({ endpoint, fileName, filters = {}, type = 'xls/xlsx'}) => {
  const {
    preferences: {
      filters: filterList
    } = {}
  } = useContext(ListContext) || {};
  const extension = type.slice(type.lastIndexOf('/') + 1);
  const handleDownload = useCallback(() => {
    if (!endpoint) return;

    documentFetch({
      endpoint,
      params:  { ...filters, downloadExcel: true },
      accept: type,
      contentType: type,
      mimeType: type,
      loadingMessage: 'Downloading records',
      errorMessage: 'Unable to download records.',
      onSuccess: url => {
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName || 'download'}_${format(new Date(), DATE_FORMATS.date)}.${extension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    });
  }, [endpoint, extension, fileName, filterList, type]);

  return <Button.Link onClick={handleDownload} icon="download-excel" />;
};

// EXPORT
export default DownloadButton;
