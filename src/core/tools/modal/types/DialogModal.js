import React, { cloneElement} from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { isEmpty } from 'lodash';
import { compose } from 'redux';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// LOCAL HELPERS
import { modalLightbox } from '../helpers/modalLightbox';

// BOOTSTRAP COMPONENTS
import { Col, Row, Modal } from 'react-bootstrap';

// CORE COMPONENTS
import Form from 'core/form/Form';
import Button from 'core/tools/Button';

// STYLES
import styles from './dialogModal.module.scss';

// MAIN COMPONENT
const DialogModal = compose(
  modalLightbox
)(({
  className,
  variant = 'primary',
  graphic,
  title,
  body,
  form: {
    onSuccess,
    ...form
  } = {},
  wrapper: Wrapper = !isEmpty(form) ? Form : 'div',
  buttons = [],
  closeButton = false,
  onClose
}) => (<>
  {closeButton &&
    <Button
      variant="light"
      className={styles.close}
      icon="cancel"
      onClick={onClose}
      block={false}
    />
  }
  <Modal.Dialog
    className={clsx(
      styles.dialog,
      className
    )}
    centered
  >
    <Wrapper
      {...Object.assign({}, !isEmpty(form) ? {
        onSuccess: data => {
          doCallback(onSuccess, data);
          onClose();
        },
        ...form
      } : {})}
    >
      {(title || graphic) &&
        <Modal.Header className={styles.header}>
          {graphic &&
            <div className={styles.graphic}>
              {graphic}
            </div>
          }
          {title &&
            <Modal.Title as="h3" className={clsx(
              styles.title,
              `text-${variant}`
            )}>
              {title}
            </Modal.Title>
          }
        </Modal.Header>
      }
      {body &&
        <Modal.Body as="h4" className={styles.body}>
          {body}
        </Modal.Body>
      }
      {buttons.length > 0 &&
        <Modal.Footer className={styles.footer}>
          <div>
            <Row className={styles.buttons}>
              {buttons.map((button, i) => !button ? null : (
                <Col key={i} xs={12}>
                  {cloneElement(button, {
                    onClick: () => button.props.type === 'submit' ? undefined : onClose(button.props.onClick),
                    fullWidth: true
                  })}
                </Col>
              ))}
            </Row>
          </div>
        </Modal.Footer>
      }
    </Wrapper>
  </Modal.Dialog>
</>))

// EXPORT
export default DialogModal;
