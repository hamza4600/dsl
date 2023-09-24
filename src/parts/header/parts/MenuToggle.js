import React, { useContext, useEffect, useState } from 'react';

// CONTEXT
import { MenuContext } from 'parts/menu/helpers/menuContext';

// LOCAL COMPONENTS
import HeaderButton from '../layout/HeaderButton';

// MAIN COMPONENT
const MenuToggle = props => {

  // ACCORDION CONTEXT
  const { toggleMenuShow, menuShow } = useContext(MenuContext);
  
  // RENDER
  return (
    <HeaderButton
      icon={menuShow ? 'cancel' : 'menu'}
      onClick={() => toggleMenuShow()}
      {...props}
    />
  );
}

// EXPORT
export default MenuToggle
