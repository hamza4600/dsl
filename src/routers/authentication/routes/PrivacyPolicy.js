import React from 'react';

// GLOBAL COMPONENTS
import Image from 'core/tools/Image';

// GLOBAL VARIABLES
import { AUTHENTICATION } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// ROUTER COMPONENTS
import { Link, withRouter } from 'react-router-dom';

// GLOBAL FUNCTIONS
import { LOGO_TITLE} from 'globals.js';

import styles from './privacyPolicy.module.scss';
import { PRIVACY_POLICY_TERMS } from '../variables';
import clsx from 'clsx';
import { compose } from 'redux';

const PrivacyPolicy = compose(withRouter)(() => (
  <div>
    <Link
      className={styles.branding}
      to={makePath(AUTHENTICATION.login)}
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
    <div className={clsx('container', styles.container)}>
      {
        PRIVACY_POLICY_TERMS.map(({ title, paragraphs }) =>
          <div className={styles.term} key={`${title}`}>
            <h2>{title}</h2>
            {paragraphs.map((element, index) => <p key={`${title}-${index}`}>{element}</p>)}

          </div>)}
    </div>
  </div>
));

export default PrivacyPolicy;