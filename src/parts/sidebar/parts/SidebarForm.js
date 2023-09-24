import React from 'react';

// DEPENDENCIES
import { isFunction } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL FUNCTIONS
import { sidebarActions } from 'actions.js';
import { doCallback } from 'functions.js';

// CORE COMOPNENTS
import Form from 'core/form/Form';
import Button from 'core/tools/Button';

// LOCAL COMPONENTS
import SidebarFooter from './SidebarFooter';

// STYLES
import styles from './sidebarForm.module.scss';

// MAIN COMPONENT
const FormSidebar = compose(
  connect(
    null,
    { ...sidebarActions }
  )
)(({
  children,
  showButton=true,
  body = {},
  buttons: {
    show: showButtons = showButton,
    cancel: {
      icon,
      onCancel,
      show: showCancel = true,
      ...cancel
    } = {},
    submit: {
      show: showSubmit = true,
      ...submit
    } = {}
  } = {},
  onSuccess,
  disabled,
  // REDUX DISPATCH
  toggle,
  close,
  // REST
  ...props
}) => (
  <Form
    className={styles.form}
    onSuccess={data => {
      doCallback(onSuccess, data);
      close();
    }}
    {...props}
  >
    {formikBag => (
      <div className={styles.inner}>
        <Form.Body
          className={styles.body}
          disabled={disabled}
          {...body}
        >
          {isFunction(children) ? children(formikBag) : children}
        </Form.Body>
        {showButtons &&
          <SidebarFooter className={styles.footer}>
            <Form.Row>
              <Form.Col>
                {showCancel &&
                  <Button.Cancel
                    icon={Object.assign({}, {
                      use: 'arrow-left',
                      order: 1
                    }, icon)}
                    justify="between"
                    onClick={() => {
                      doCallback(onCancel);
                      close();
                    }}
                    disabled={disabled}
                    {...cancel}
                  />
                }
              </Form.Col>
              <Form.Col>
                {showSubmit &&
                  <Button.Save
                    variant="primary"
                    label="Submit"
                    disabled={disabled}
                    {...submit}
                  />
                }
              </Form.Col>
            </Form.Row>
          </SidebarFooter>
        }
      </div>
    )}
  </Form>
))

// EXPORT
export default FormSidebar;
