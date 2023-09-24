import React from 'react';
// BOOTSTRAP COMPONENTS
import clsx from 'clsx';
import styles from './assignmentName.module.scss'

// MAIN COMPONENT
const AssignmentName = ({ children, className }) => {
    let text = children?.length ? children?.split(' ') : '';
    text = text?.length > 1 ? `${text[0]} ${text[1].slice(0, 1)}.` : text;

    return (
        <div className={clsx('pl-1', styles.align, className)}>
            {text}
        </div>
    );
};

// EXPORT
export default AssignmentName;
