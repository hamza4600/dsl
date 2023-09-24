import React from 'react';

// GLOBAL FUNCTIONS
import { SITE_TITLE } from 'globals.js';

// MAIN COMPONENT
export const documentTitle = Component => ({
  documentTitle,
  // REST
  ...props
}) => {

  document.title = documentTitle ? `${documentTitle} | ${SITE_TITLE}` : SITE_TITLE;

  return  <Component {...props} />;
}
