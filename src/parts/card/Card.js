import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';

// BOOTSTRAP COMPONENTS
import { Card as BootstrapCard } from 'react-bootstrap';

// STYLES
import styles from './card.module.scss';

// MAIN COMPONENT
const Card = ({
  children,
  className,
  header,
  body,
  footer,
  title,
  tools,
  ...props
}) => (
  <BootstrapCard
    className={clsx(
      styles.card,
      className
    )}
    {...props}
  >
    {(!!header || !!title || !!tools) &&
      <Header>
        {header}
        {!!title &&
          <Title>{title}</Title>
        }
        {!!tools &&
          <Tools>
            {tools}
          </Tools>
        }
      </Header>
    }
    {children}
    {!!body &&
      <Body>{body}</Body>
    }
    {!!footer &&
      <Footer>{footer}</Footer>
    }
  </BootstrapCard>
)

// CHILD COMPONENTS
const Header = ({
  children,
  className,
  ...props
}) => (
  <BootstrapCard.Header
    className={clsx(
      styles.header,
      className
    )}
    {...props}
  >{children}</BootstrapCard.Header>
)
const Body = ({
  children,
  className,
  ...props
}) => (
  <BootstrapCard.Body
    className={clsx(
      styles.body,
      className
    )}
    {...props}
  >{children}</BootstrapCard.Body>
)
const Footer = ({
  children,
  className,
  ...props
}) => (
  <BootstrapCard.Footer
    className={clsx(
      styles.footer,
      className
    )}
    {...props}
  >{children}</BootstrapCard.Footer>
)
const Title = ({
  children,
  className,
  ...props
}) => (
  <BootstrapCard.Title
    as="h3"
    className={clsx(
      styles.title,
      className
    )}
    {...props}
  >{children}</BootstrapCard.Title>
)
const Tools = ({
  children,
  className,
  ...props
}) => (
  <div
    className={clsx(
      styles.tools,
      className
    )}
    {...props}
  >{children}</div>
)
const Divider = ({
  className
}) => (
  <hr
    className={clsx(
      styles.divider,
      className
    )}
  />
)

Card.Header  = Header;
Card.Body    = Body;
Card.Footer  = Footer;
Card.Title   = Title;
Card.Divider = Divider;

// EXPORT
export default Card;
