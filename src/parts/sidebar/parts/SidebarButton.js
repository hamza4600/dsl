import React, { useCallback } from 'react';

// DEPENDENCIES
import { compose } from 'redux';
import { connect } from 'react-redux';

// GLOBAL FUNCTIONS
import { sidebarActions } from 'actions.js';
import { doCallback } from 'functions';

// CORE COMPONENTS
import Button from 'core/tools/Button';

// MAIN COMPONENT
const SidebarButton = compose(
  connect(
    null,
    { ...sidebarActions }
  )
)(({
  name,
  onClick,
  // REDUX DISPATCH
  toggle,
  close,
  // REST
  ...props
}) => {

  // CALLBACKS
  const handleClick = useCallback(
    e => {
      doCallback(onClick, e);
      if (name) toggle(name);
      else close();
    },
    [name, onClick, toggle, close]
  )

  // RENDER
  return (
    <Button
      onClick={handleClick}
      {...props}
    />
  )
})

// EXPORT
export default SidebarButton;
