import React, { useContext } from 'react';

// CONTEXT
import { MenuContext } from '../helpers/menuContext';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

// STYLES
import styles from './collapseToggle.module.scss';

// MAIN COMPONENT
const CollapseToggle = () => {

  // ACCORDION CONTEXT
  const { menuCollapse, toggleMenuCollapse } = useContext(MenuContext);

  // RENDER
  return (
    <Button
      className={styles.toggle}
      variant="custom"
      icon={menuCollapse ? 'chevron-right' : 'chevron-left'}
      onClick={() => toggleMenuCollapse()}
      outline
    />
  )
}

export default CollapseToggle;
