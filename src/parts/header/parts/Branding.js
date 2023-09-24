import React, { useContext } from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL VARIABLES
import { LOGO_TITLE} from 'globals.js';
import { INTERFACE } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// CONTEXT
import { MenuContext } from 'parts/menu/helpers/menuContext';

// ROUTER COMPONENTS
import { Link } from 'react-router-dom';

// GLOBAL COMPONENTS
import Image from 'core/tools/Image';

// STYLES
import styles from './branding.module.scss';

// MAIN COMPONENT
const Branding = props => {

  // ACCORDION CONTEXT
  const { menuCollapse } = useContext(MenuContext);

  // RENDER
  return (
    <Link
      className={clsx(
        styles.branding,
        !!menuCollapse && styles.collapse
      )}
      to={makePath(INTERFACE.dailySales)}
    >
      <div className={styles.initial}>
        <Image.Logo
          className={styles.logo}
          use="sm"
          width={32}
          height={32}
        />
      </div>
      <div className={styles.full}>
        <Image.Logo
          className={styles.logo}
          width={83}
          height={32}
        />
        <h3 className={styles.title}>{LOGO_TITLE}</h3>
      </div>
    </Link>
  )
}

// EXPORT
export default Branding
