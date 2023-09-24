import React from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { COPYRIGHT, LOGO_TITLE, VERSION } from 'globals.js';
import { AUTHENTICATION } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { alertFunctions, makePath } from 'functions.js';

// MEDIA
import { ReactComponent as Background } from 'img/login-bg.svg';
import { ReactComponent as BackgroundDark } from 'img/login-bg-dark.svg';
import { ReactComponent as BackgroundSmall } from 'img/login-bg-sm.svg';

// GLOBAL HELPERS
import { documentTitle } from 'helpers/documentTitle';
import { scrollToTop } from 'helpers/scrollToTop';

// BOOTSTRAP COMPONENTS
import { Col, Row } from 'react-bootstrap';

// ROUTER COMPONENTS
import { Link } from 'react-router-dom';

// GLOBAL COMPONENTS
import Alert from 'core/tools/alert/Alert';
import Button from 'core/tools/Button';
import Form from 'core/form/Form';
import Image from 'core/tools/Image';

// STYLES
import styles from './page.module.scss';

// MAIN COMPONENT
const Page = compose(
  documentTitle,
  scrollToTop
)(({
  children,
  title,
  message,
  args,
  footer,
  back,
  // REST
  ...props
}) => (
  <Row className={styles.row}>
    <Col className={clsx(
      styles.col,
      styles.form
    )} xs={24}>
      <div className={styles.bgContainer}>
        <Background className={clsx(
          styles.bg,
          styles.bgLg
        )} />
        <BackgroundSmall className={clsx(
          styles.bg,
          styles.bgSm
        )} />
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.branding}>
              <Image.Logo />
              <h3>{LOGO_TITLE}</h3>
            </div>
            <h1 className={styles.title}>
              {title}
              {back &&
                <Button.Link
                  className={styles.back}
                  variant="secondary"
                  icon={{
                    use: 'arrow-left',
                    order: 1
                  }}
                  {...back}
                />
              }
            </h1>
            {[].concat(Array.isArray(message) ? message : [message]).map((text, i) => (
              <h3
                key={i}
                className={styles.subtitle}
              >{text}</h3>
            ))}
          </div>
          <div className={styles.body}>
            <Alert.Router className={styles.alerts} limit="1" />
            <Form
              messageFunctions={alertFunctions}
              {...args}
            >
              {children}
            </Form>
          </div>
          <div className={styles.footer}>
            <p>
              <Link
                className={styles.link}
                to={makePath(AUTHENTICATION.terms)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Service
              </Link>
              {" "}|{" "}
              <Link
                className={styles.link}
                to={makePath(AUTHENTICATION.privacy)}
                target="_blank"
                rel="noopener noreferrer"
              >
              Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Col>
    <Col className={clsx(
      styles.col,
      styles.sidebar
    )}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.footer}>
            <p>
              {COPYRIGHT}
            </p>
            <p>
              v{VERSION}
              <span className={styles.separator}>|</span>
              {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.bgContainer}>
        <BackgroundDark className={styles.bg} />
      </div>
    </Col>
  </Row>
))

Page.Footer = ({
  children
}) => (
  <div className={styles.formFooter}>
    {children}
  </div>
)

export default Page;
