import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL FUNCTIONS
import { randomID } from 'functions.js';

// MEDIA
import logo from 'img/logo.svg';

// STYLES
import styles from './image.module.scss';
import colors from 'css/custom/export/_colors.scss';

// MAIN COMPONENT
const Image = ({
  id,
  className,
  href,
  use,
  width,
  height = width,
  stroke,
  fill,
  useStroke = !!colors[stroke],
  useFill = !!colors[fill] || (!stroke && !useStroke),
}) => !href ? null : (
  <svg
    id={id || `${!!use ? `${use}-` : ''}${randomID()}`}
    className={clsx(
      styles.image,
      className
    )}
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
  >
    {useFill &&
      <use
        className={clsx(
          'fill',
          styles.fill,
          styles[fill]
        )}
        href={!!use ? `${href}#${use}` : href}
      />
    }
    {useStroke &&
      <use
        className={clsx(
          'stroke',
          styles.stroke,
          styles[stroke]
        )}
        href={!!use ? `${href}#${use}` : href}
      />
    }
  </svg>
)

Image.Logo = ({
  id = 'brand-logo',
  className,
  use = 'lg',
  width = use === 'sm' ? styles['logo-small'] : styles['logo-width'],
  height = use === 'sm' ? styles['logo-small'] : styles['logo-height'],
  ...props
}) => (
  <Image
    {...props}
    href={logo}
    use={use}
    id={id}
    className={clsx(
      styles.logo,
      className
    )}
    width={width}
    height={height}
  />
)

Image.Logo.Small = props => (
  <Image.Logo
    use="sm"
    width={styles['logo-small']}
  />
)

export default Image;
