import React, { useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import format from 'date-fns/format';
import isDate from 'lodash/isDate';

// GLOBAL VARIABLES
import { UPLOAD } from 'defaults.js';
import { DATE_FORMATS } from 'globals.js';

// CORE COMPONENTS
import Sprite from 'core/tools/Sprite';

// LOCAL COMPONENTS
import DeleteButton from './DeleteButton';
import DownloadButton from './DownloadButton';

// STYLES
import styles from './uploadItem.module.scss';

// MAIN COMPONENT
const UploadItem = props => {

  // PROPS
  const {
    file,
    meta: {
      fileName,
      uploadedBy,
      uploadedOn
    },
    success,
    error,
    allowDownload = UPLOAD.allowDownload,
    viewArgs,
  } = props

  // MEMOS
  const attribution = useMemo(
    () => {
      const attribution = [];
      if (uploadedBy) attribution.push(`by ${uploadedBy}`);
      if (uploadedOn && isDate(new Date(uploadedOn))) attribution.push(`on ${format(new Date(uploadedOn), DATE_FORMATS.dateTime)}`);
      return attribution;
    },
    [uploadedBy, uploadedOn]
  )

  // RENDER
  return (
    <div className={clsx(
      styles.item,
      error && styles.error
    )}>
      <div className="d-flex align-items-center flex-wrap">
        {(file || viewArgs) && allowDownload ? (
          <DownloadButton viewArgs={viewArgs} {...props} />
        ) : (
          <span className={styles.label}>{fileName}</span>
        )}
        {attribution.length > 0 &&
          <small className={styles.attribution}>
            ({attribution.join(' ')})
          </small>
        }
      </div>
      {success || error ? (
        <DeleteButton {...props} />
      ) : (
        <Sprite.Loader className={styles.loader} />
      )}
    </div>
  )
}

export default UploadItem;
