import React, { forwardRef } from 'react';

// LOCAL COMPONENTS
import Col from '../../../parts/Col';
import Label from '../../../parts/Label';
import Row from '../../../parts/Row';

// MAIN COMPONENT
export const inputLabel = Component => forwardRef(({
  children,
  label,
  ...props
}, ref) => (
    <Row>
      <Label
        {...props}
        {...(typeof label === 'object' ? label : {
          label
        })}
      />
      <Col>
        <Component {...props} children={children} ref={ref} />
      </Col>
    </Row>
))
