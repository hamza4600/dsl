import React from 'react';

// BOOTSTRAP COMPONENTS
import clsx from 'clsx';
import { Row as BootstrapRow } from 'react-bootstrap';

// MAIN COMPONENT
const Row = ({ children, className }) => <BootstrapRow className={clsx('mx-0', className)}>{children}</BootstrapRow>;

// EXPORT
export default Row;
