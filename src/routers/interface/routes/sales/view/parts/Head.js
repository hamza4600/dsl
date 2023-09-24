import React from 'react';
import { useParams } from 'react-router-dom';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import format from 'date-fns/format';
import Date from 'core/form/control/types/date/Date';

// GLOBAL VARIABLES
import { DATE_FORMATS } from 'globals.js';

// GLOBAL FUNCTIONS
import { documentFetch, makePath } from 'functions.js';

// STYLE
import styles from './head.module.scss';
import PrintButton from './Print';

const Head = () => {
  const { recordID } = useParams();
  const handlePrint = (endpoint, filename) => {
    documentFetch({
      endpoint: makePath(endpoint, recordID),
      accept: 'pdf',
      contentType: 'pdf',
      mimeType: 'application/pdf',
      loadingMessage: 'Downloading records',
      errorMessage: 'Unable to download records.',
      onSuccess: url => {
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.click(window.open);
        a.download = `${filename || 'download'}_${format(new Date(), DATE_FORMATS.date)}.${'pdf'}`;
      }
    });
  };

  const handleBackout = () => {};
  const handleCarryover = () => {};
  const handleEPost = () => {};

  // RENDER
  return (
    <div className={styles.container}>
      <div className={styles['container--left']}>
        <PrintButton onPrint={handlePrint} />
        <Button onClick={handleBackout} outline fullWidth={false} label="Backout" icon="arrow" size="sm" />
        <Button onClick={handleCarryover} outline fullWidth={false} label="Carryover" icon="arrow" size="sm" />
        <Button onClick={handleEPost} outline fullWidth={false} label="E-Post" icon="email" size="sm" />
      </div>
    </div>
  );
};

// EXPORT
export default Head;
