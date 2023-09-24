import React, { useMemo } from 'react';

// DEPENDENCIES
// import clsx from 'clsx';
import format from 'date-fns/format';
import isDate from 'lodash/isDate';

// GLOBAL VARIABLES
import { BUTTON } from 'defaults.js';
import { DATE_FORMATS } from 'globals.js';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './uploadItem.module.scss';

// MAIN COMPONENT
const UploadItem = ({ meta: { fileName = 'file', fileId, uploadedBy, uploadedOn }, onDelete, onDownload }) => {
  // MEMOS
  const attribution = useMemo(() => {
    const attribution = [];
    if (uploadedBy) attribution.push(`by ${uploadedBy}`);
    if (uploadedOn && isDate(new Date(uploadedOn)))
      attribution.push(`on ${format(new Date(uploadedOn), DATE_FORMATS.dateTime)}`);
    return attribution;
  }, [uploadedBy, uploadedOn]);

  // RENDER
  return (
    <div className={styles.item}>
      <Button.Link className="mr-2" icon={BUTTON.delete.icon} onClick={() => onDelete(fileId)} />
      <div className="d-flex align-items-center flex-wrap">
        {onDownload ? (
          <Button.Link className="mr-2" label={fileName} onClick={() => onDownload(fileId, fileName)} />
        ) : (
          <span className={styles.label}>{fileName}</span>
        )}
        {attribution.length > 0 && <small className={styles.attribution}>({attribution.join(' ')})</small>}
      </div>
    </div>
  );
};

export default UploadItem;
