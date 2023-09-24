import React, { useCallback } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import isFunction from 'lodash/isFunction';

// CORE COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './downloadButton.module.scss';
import { documentFetch } from 'functions';

// MAIN COMPONENT
const DownloadButton = ({
  className,
  file,
  meta: {
    fileName
  },
  uploadID,
  viewArgs
}) => {
  // CALLBACKS
  const downloadFile = useCallback((url) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
  }, [fileName]);

  const handleClick = useCallback(
    async () => {
      if (viewArgs) {
        const { endpoint, ...args } = isFunction(viewArgs) ? viewArgs(uploadID) : viewArgs || {};
        
        documentFetch({
          endpoint,
          loadingMessage: 'Downloading file',
          errorMessage: 'Unable to downlown file.',
          onSuccess: downloadFile,
          ...args
        });
      } else {
        const blob = new Blob([file], { type: file.type });
        const url = window.URL.createObjectURL(blob);
        downloadFile(url);
      }
    },
    [viewArgs, uploadID, downloadFile, file]
  )

  // RENDER
  return (
    <Button.Link
      className={clsx(
        className,
        styles.button,
        'mr-2'
      )}
      label={fileName}
      onClick={handleClick}
    />
  )
}

export default DownloadButton;
