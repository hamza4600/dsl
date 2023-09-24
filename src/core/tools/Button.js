import React, { forwardRef } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { isString } from 'lodash';

// GLOBAL VARIABLES
import { BUTTON, LINK } from 'defaults.js';

// ROUTER COMPONENTS
import { Link } from "react-router-dom";

// BOOTSTRAP COMPONENTS
import { Button as BootstrapButton } from 'react-bootstrap';

// CORE COMPONENTS
import Sprite from 'core/tools/Sprite';

// STYLES
import styles from './button.module.scss';

// MAIN COMPONENT
const Button = forwardRef(({
  children,
  className,
  type = 'button',
  variant = BUTTON.variant,
  label = children,
  icon,
  link,
  size,
  iconColor='',
  fullWidth = !link,
  justify = link ? 'start' : !!label && !!icon ? 'between' : 'center',
  outline,
  solid = !link && !outline,
  round = BUTTON.round,
  square = !!icon && !children && !label,
  onClick,
  to,
  focus,
  disabled = type !== 'submit' && !onClick && !to,
  href,
  ...props
}, ref) => {
  
  // PROPS
  const sprite = Object.assign({
    order: link ? LINK.spriteOrder : BUTTON.spriteOrder,
    size:  BUTTON.spriteSize
  }, isString(icon) ? {
    use: icon
  } : icon);
  
  // RENDER
  return !label && !icon ? null : (
    <BootstrapButton
      as={to ? Link : undefined}
      className={clsx(
        styles.btn,
        styles[variant],
        styles[size],
        styles[justify],
        !!fullWidth && 'w-100',
        !!link && [styles.link, 'btn-link'],
        !!outline && [styles.outline, 'btn-outline'],
        !!solid && [styles.solid, 'btn-solid'],
        !!round && [styles.round, 'btn-round'],
        !!square && [styles.square, 'btn-square'],
        !!focus && [styles.focus, 'focus'],
        !!disabled && [styles.disabled, 'disabled'],
        className
      )}
      variant={variant}
      type={type}
      onClick={onClick}
      to={to}
      block={false}
      size={size}
      disabled={disabled}
      ref={ref}
      href={href}
    >
      {!!icon &&
        <div className={clsx(
          'btn-icon',
          styles.icon,
          styles[`order-${sprite.order}`],
          styles[sprite.size]
        )}>
          <Sprite
            {...sprite}
            className={clsx(
              'btn-sprite',
              styles[iconColor],
              styles.sprite,
              sprite.className
            )}
            use={sprite.use}
          />
          {sprite.hover &&
            <Sprite
              {...sprite}
              className={clsx(
                'btn-sprite',
                styles.sprite,
                styles.hoverSprite,
                sprite.className
              )}
              use={sprite.hover}
            />
          }
        </div>
      }
      {!!label &&
        <span className={clsx(
          'btn-label',
          styles.label
        )}>
          {label}
        </span>
      }
    </BootstrapButton>
  )
})

// BUTTON TYPES
Button.Link   = props => <Button link {...props} />;
Button.Cancel = props => <Button label="Cancel" {...BUTTON.cancel} {...props} />;
Button.Add    = props => <Button label="Add" {...BUTTON.add} {...props} />;
Button.Submit = props => <Button type="submit" label="Submit" {...BUTTON.submit} {...props} />;
Button.Save   = props => <Button type="submit" label="Save" {...BUTTON.save} {...props} />;
Button.Delete = props => <Button label="Delete" {...BUTTON.delete} {...props} />;

// EXPORT
export default Button;
