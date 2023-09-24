import React, { cloneElement} from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { compose } from 'redux';

// LOCAL HELPERS
import { modalLightbox } from 'core/tools/modal/helpers/modalLightbox';

// BOOTSTRAP COMPONENTS
import { Modal, Row, Col } from 'react-bootstrap';

// STYLES
import styles from './modal.module.scss';

// MAIN COMPONENT
const DialogModal = compose(
  modalLightbox
)(({
  className,
  variant = 'primary',
  title,
  body,
  buttons = [],
  onClose
}) => (
  <Modal.Dialog
    className={clsx(
      styles.dialog,
      className
    )}
    centered
  >
    {title &&
      <Modal.Header
        className={styles.header}
        closeButton
      >
        <Modal.Title as="h3" className={clsx(
          styles.title,
          `text-${variant}`
        )}>
          {title}
        </Modal.Title>
      </Modal.Header>
    }
    {body &&
      <Modal.Body className={styles.body}>
        {body}
      </Modal.Body>
    }
    {buttons.length > 0 &&
      <Modal.Footer className={styles.footer}>
        <Row>
          {buttons.map((button, i) => !button ? null : (
            <Col key={i} xs={12}>
              {cloneElement(button, {
                onClick: () => onClose(button.props.onClick),
                fullWidth: true
              })}
            </Col>
          ))}
        </Row>
      </Modal.Footer>
    }
  </Modal.Dialog>
))

// EXPORT
export default DialogModal;
