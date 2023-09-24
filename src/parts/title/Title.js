import { documentTitle } from 'helpers/documentTitle';
import React, { cloneElement } from 'react';
import { compose } from 'redux';

// STYLES
import styles from './title.module.scss';

// MAIN COMPONENT
const Title = compose(
  documentTitle,
)(({
  children,
  title,
  tools
}) => !title ? null : (
  <div className={styles.container}>
    <h2 className={styles.title}>{title || children}</h2>
    {!!tools &&
      <div className={styles.tools}>
        <div className={styles.row}>
          {tools.map((tool, i) => cloneElement(tool, {
            key: i,
            ...tool.props
          }))}
        </div>
      </div>
    }
  </div>
))

// EXPORT
export default Title;
