import React, { Children, cloneElement } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// MAIN COMPONENT
const Header = ({ children }) => (
  <div className="d-flex flex-wrap">
    {Children.map(children, (child, i) =>
      !child
        ? null
        : cloneElement(
            child,
            Object.assign(
              {
                key: i,
                className: clsx('mr-3', child.props.className)
              },
              child.props
            )
          )
    )}
  </div>
);

// EXPORT
export default Header;
