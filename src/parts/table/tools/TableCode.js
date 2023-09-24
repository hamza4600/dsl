import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL FUNCTIONS
import { toNumber } from 'functions';
import { getByCode, getByNumeric } from 'codes.js';

// LOCAL COMPONENTS
import TableBadge from './TableBadge';

// STYLES
import styles from './tableCode.module.scss';

// MAIN COMPONENT
const TableCode = ({
  children,
  className,
  mobileView,
  codes,
  record,
  columnKey,
  tip,
  badge=true,
  numeric = false,
  value = numeric
    ? getByNumeric(codes, toNumber(children)).code
    : children,
  code = getByCode(codes, value) || {},
  ...props
}) => (
  <TableBadge
    className={clsx(
      'table-code',
      !mobileView && styles.code,
      code.variant && `text-${code.variant}`,
      className
    )}
    variant={code.variant}
    badge={badge && code.variant}
    tip={tip}
    value={value}
    {...props}
  />
);

// EXPORT
export default TableCode;
