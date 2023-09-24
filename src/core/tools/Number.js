import React, { forwardRef, useMemo } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { isEmpty } from 'lodash';
import NumberFormat from 'react-number-format';

// GLOBAL VARIABLES
import { NUMBER_FORMATS } from 'numberFormats.js';

// STYLES
import styles from './number.module.scss';

// MAIN COMPONENT
const Number = forwardRef(({
  children,
  as: Wrapper = 'span',
  className,
  value = children,
  schema,
  numberFormat = NUMBER_FORMATS[schema] || {},
  placeholder = numberFormat.placeholder || <>&ndash;</>,
  ...props
}, ref) => {

  // MEMOS
  const Component = useMemo(
    () => ({
      children,
      className: wrapperClassName
    }) => (
      <Wrapper
        className={clsx(
          className,
          wrapperClassName
        )}
        schema={schema}
        ref={ref}
        {...props}
      >{children}</Wrapper>
    ),
    [className, schema, props, ref]
  )

  // RENDER
  return isEmpty(numberFormat) ? ( // vo number formatting requested
    <Component>{value}</Component>
  ) : value === undefined || value === null || value === '' ? ( // vo value provided
    <Component className={styles.empty}>{placeholder}</Component>
  ) : isNaN(value) ? ( // value not a number
    <Component className={styles.muted}>-</Component>
  ) : (
    <NumberFormat
      displayType="text"
      renderText={formattedValue => (
        <Component
          className={clsx(
            'number-format',
            styles.numberFormat
          )}
        >{formattedValue}</Component>
      )}
      value={parseFloat(value)}
      {...numberFormat}
    />
  )
})

// CHILD COMPONENTS
Number.Dollars = props => <Number schema="dollars" {...props} />;
Number.Miles   = props => <Number schema="miles" {...props} />;

// EXPORT
export default Number;
