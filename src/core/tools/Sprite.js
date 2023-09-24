import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// GLOBAL VARIABLES
import { SPRITE } from 'defaults.js';

// MEDIA
import sprite from 'img/sprite.svg';

// LOCAL COMPONENTS
import Image from '../tools/Image';

// STYLES
import styles from './sprite.module.scss';

// MAIN COMPONENT
const Sprite = ({
  className,
  href = sprite,
  use,
  size = SPRITE.size,
  width = styles[`size-${size}`] || styles['size-sm'],
  height = styles[`size-${size}`] || styles['size-sm'],
  ...props
}) => !use ? null : (
  <Image
    className={clsx(
      'sprite',
      styles.sprite,
      styles[size],
      className
    )}
    href={href}
    use={use}
    width={width}
    height={height}
    {...props}
  />
)

Sprite.Loader = ({
  className,
  ...props
}) => (
  <Sprite
    {...props}
    className={clsx(
      styles.spin,
      className
    )}
    use="loader"
  />
)

export default Sprite;
