import React, { createContext, useContext, useCallback, useMemo, useEffect, useReducer } from 'react';

// DEPENDENCIES
import _ from 'lodash';
import { useFormikContext } from 'formik';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints';

// LOCAL VARIABLES
import { ACTION } from './variables';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions';

// GLOBAL HELPERS
import { RecordContext } from 'helpers/getRecordData';

// GLOBAL COMPONENTS
import Card from 'parts/card/Card';
import Form from 'core/form/Form';
import Button from 'core/tools/Button';
import Record from 'parts/record/Record';

// BOOTSTRAP COMPONENTS
import { Container, Row, Col, Accordion } from 'react-bootstrap';

// STYLES
import styles from './update.module.scss';

// CONTEXT
export const ListContext = createContext(null);

// MAIN COMPONENT
const EmailSettingUpdate = () => (
  <Record.Update
    title="Email Setting"
    label="Email Setting"
    enableDelete
    endpoints={{
      single: ENDPOINTS.admin.emailSettings.single
    }}
    useFormik={false}
    initialValues={{
      is_active: 1,
      email_recipients: [],
      delete_email_recipients: []
    }}
  >
    <Card
      body={<FormBody/>}
    />
  </Record.Update>
);

// REDUCER
const INIT_STATE = {
  templateName: '',
  description: '',
  recipients: [],
  newRecipients: [],
  deletedRecipients: [],
  activities: [],
};

const reducer = (state, { type, ...action }) => {
  switch (type) {
    case ACTION.LOAD_DATA:
      return {
        ...state,
        ...action
      }

    case ACTION.ADD_RECIPIENT:
      {
        const _newRecipients = [...state.newRecipients];
        _newRecipients.push({
          dealer_email_recipient_id: `new_recipient_${_newRecipients.length + 1}`,
          email_address: '',
          full_name: ''
        });

        return {
          ...state,
          newRecipients: _newRecipients
        };
      }

    case ACTION.UPDATE_RECIPIENT:
      {
        const _recipients = [...state.recipients];
        const _newRecipients = [...state.newRecipients];

        const _recipient = _.find(_recipients, m => m.dealer_email_recipient_id === action.id);
        if (_recipient) {
          _recipient[action.prop] = action.value;
        }
        else {
          const _newRecipient = _.find(_newRecipients, m => m.dealer_email_recipient_id === action.id);
          if (_newRecipient) {
            _newRecipient[action.prop] = action.value;
          }

        }
        return {
          ...state,
          recipients: _recipients,
          newRecipients: _newRecipients
        };
      }

    case ACTION.DETELE_RECIPIENT:
      {
        const _recipients = [...state.recipients];
        const _newRecipients = [...state.newRecipients];
        const _deletedRecipients = [...state.deletedRecipients];

        let index = _.findIndex(_recipients, m => m.dealer_email_recipient_id === action.id);
        if (index !== -1) {
          _recipients.splice(index, 1);
          _deletedRecipients.push(state.recipients[index].dealer_email_recipient_id);
        }
        else {
          index = _.findIndex(_newRecipients, m => m.dealer_email_recipient_id === action.id);
          if (index !== -1) {
            _newRecipients.splice(index, 1);
          }
        }

        return {
          ...state,
          recipients: _recipients,
          newRecipients: _newRecipients,
          deletedRecipients: _deletedRecipients,
        }
      }

    default:
      return state;
  }
}

const FormBody = () => {
  // CONTEXT
  const { record } = useContext(RecordContext) || {};
  const { setFieldValue } = useFormikContext() || {};

  // REDUCER
  const [ context, updateContext ] = useReducer(reducer, INIT_STATE);

  const {
    templateName,
    description,
    activities,
    recipients,
    newRecipients,
    deletedRecipients
  } = context;

  const emailRecipients = useMemo(
    () => {
      return [...recipients, ...newRecipients].map(m => {
        const isNewRecipient = isNaN(m.dealer_email_recipient_id);
        return {
          email_address: m.email_address,
          full_name: m.full_name,
          dealer_email_recipient_id: isNewRecipient ? '' : m.dealer_email_recipient_id,
        }
      });
    },
    [recipients, newRecipients]
  );

  useEffect(
    () => {
      if (!record) return;

      updateContext({
        type: ACTION.LOAD_DATA,
        templateName: record.dealer_email_setting_type_name,
        description: record.dealer_email_setting_type_description,
        recipients: record.recipients || [],
        activities: record.activity_log || []
      })
    },
    [record]
  )

  useEffect(
    () => {
      doCallback(setFieldValue, 'email_recipients', emailRecipients)
    },
    [emailRecipients, setFieldValue]
  )

  useEffect(
    () => {
      doCallback(setFieldValue, 'delete_email_recipients', deletedRecipients)
    },
    [deletedRecipients, setFieldValue]
  )

  // CALLBACKS
  const onRecipientAdd = useCallback(
    () => {
      updateContext({
        type: ACTION.ADD_RECIPIENT
      })
    },
    [updateContext]
  );

  const onEmailChange = useCallback(
    (e, recipientId) => {
      updateContext({
        type: ACTION.UPDATE_RECIPIENT,
        id: recipientId,
        prop: 'email_address',
        value: e.target.value,
      })
    },
    [updateContext]
  );

  const onFullNameChange = useCallback(
    (e, recipientId) => {
      updateContext({
        type: ACTION.UPDATE_RECIPIENT,
        id: recipientId,
        prop: 'full_name',
        value: e.target.value,
      })
    },
    [updateContext]
  );

  const onRecipientDelete = useCallback(
    (recipientId) => () => {
      updateContext({
        type: ACTION.DETELE_RECIPIENT,
        id: recipientId,
      })
    },
    [updateContext]
  );

  const renderRecipients = (_recipients) => {
    if (!_recipients.length) return null;

    return (
      <div className={styles.recipients}>
        {_recipients.map(m => (
          <Row key={m.dealer_email_recipient_id} >
            <Col md={10}>
              <Row lg={1}>
                <Form.Control
                  label='Email:'
                  value={m.email_address || ''}
                  onChange={e => onEmailChange(e, m.dealer_email_recipient_id)}
                  useFormik={false}
                />
              </Row>
            </Col>

            <Col md={10}>
              <Row lg={1}>
                <Form.Control
                  label='Name:'
                  value={m.full_name || ''}
                  onChange={e => onFullNameChange(e, m.dealer_email_recipient_id)}
                  useFormik={false}
                />
              </Row>
            </Col>

            <Col md={4}>
              <Button
                className={styles.delete}
                label='Delete'
                icon='delete'
                onClick={onRecipientDelete(m.dealer_email_recipient_id)}
              />
            </Col>
          </Row>
        ))}
      </div>
    )
  }

  const renderAcitivities = () => (
    <div className={styles.activityList}>
      {activities.map((m, index) => (
        <div
          key={`activity-${index}`}
          className={styles.activity}
        >
          <div className={styles.activitySummary}>
            <span>
              <span className={styles.userName}>
                {m.activity_log_user_full_name}
              </span>
              <span className={styles.activityType}>
                {m.activity_type}
              </span>
            </span>

            <span className={styles.updatedDate}>
              {m.date_updated}
            </span>
          </div>

          {m.field_label && m.new_valuetext ? (
            <div className={styles.activityTable}>
              <Row>
                <Col>Field</Col>
                <Col>Original Value</Col>
                <Col>New Value</Col>
              </Row>
              <Row>
                <Col>{m.field_label}</Col>
                <Col>{m.orig_valuetext}</Col>
                <Col>{m.new_valuetext}</Col>
              </Row>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );

  // RENDER
  return (
    <Form.Body
      className={styles.formBody}
    >
      <Container fluid='sm'>
        <Form.Control
          className={styles.row}
          label='Template Name:'
          value={templateName || ''}
          plainTExt
        />
        <Form.Control
          className={styles.row}
          label='Description:'
          value={description || ''}
          plaintext
        />

        <Form.YesNo
          name='is_active'
          label='Active:'
          required
        />

        <Form.Control
          name='email_recipients'
          hidden
        />

        <Form.Control
          name='delete_email_recipients'
          hidden
        />

        <Row className='justify-content-center'>
          <h3>Email Recipients</h3>
        </Row>

        { renderRecipients(recipients) }
        { renderRecipients(newRecipients) }

        <Row className='justify-content-center'>
          <Col sm={10}>
            <Button.Add
              className={styles.addRecipientButton}
              label='Add Email Recipient'
              onClick={onRecipientAdd}
            />
          </Col>
        </Row>

        { activities.length ? (
          <Accordion className={styles.activities}>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                Recent Acitivities
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                { renderAcitivities() }
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ) : null}
      </Container>
    </Form.Body>
  )
}

// EXPORT
export default EmailSettingUpdate;
