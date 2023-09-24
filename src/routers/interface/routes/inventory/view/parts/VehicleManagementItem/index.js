import React, { useState, useEffect } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import moment from 'moment';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Sprite from 'core/tools/Sprite';

// GLOBAL FUNCTIONS
import { FORMAT_TIME } from 'helpers/format';
import { apiFetch, makePath } from 'functions';

// LOCAL VARIABLES
import {TRACKING_TYPES} from '../../../variables';

// LOCAL COMPONENTS
import InfoCard from '../InfoCard';
import InfoField from '../InfoField';

// STYLE
import styles from './styles.module.scss';

const TableRow = ({ isHead, id, status, createdAt, user }) => (
  <div className={clsx(styles['table--row'], isHead && styles['table--row__head'])}>
    <span className={clsx(styles['table--cell'], styles['table--cell__small'])}>
      {isHead ? '#' : id}
    </span>
    <span className={clsx(styles['table--cell'], styles['table--cell__big'])}>
      {isHead ? 'Status' : status}
    </span>
    <span className={clsx(styles['table--cell'], styles['table--cell__medium'])}>
      {isHead ? 'Date' : moment(createdAt).format('MM/DD/YYYY h:mm A')}
    </span>
    <span className={clsx(styles['table--cell'], styles['table--cell__medium'])}>
      {isHead ? 'User' : user || '-'}
    </span>
  </div>)

// MAIN COMPONENT
/**
 *
 * @param props
 * @param {number} props.inventoryId
 * @param {number} props.trackingTypeId
 * @param {number} props.trackingCodeId
 * @param {string} props.title
 * @param {string} props.trackingCodeName
 * @param {string} props.trackingType
 * @param {string} props.color
 * @param {string} props.createdAt
 * @param {Array} props.history
 * @returns {JSX.Element}
 * @constructor
 */
const VehicleManagementItem = props => {
  const {
    inventoryId,
    trackingTypeId,
    trackingCodeId,
    history = [],
    trackingCodeName,
    trackingType,
    title,
    color,
    createdAt
  } = props;
  const [comments, setComments] = useState([]);
  const [statusId, setStatusId] = useState(trackingCodeId);
  const [trackingHistory, setTrackingHistory] = useState(history);
  const trackingTypeData = TRACKING_TYPES.find(({ id }) => id === trackingTypeId);

  const getComments = () => apiFetch({
    method: 'GET',
    endpoint: ENDPOINTS.inventory.comments.list,
    params: { inventoryId, typeId: trackingTypeId },
    onSuccess: ({ results }) => setComments(results),
  })

  useEffect(()=>{
    getComments();
  },[]);

  const updateTrackingCodeStatus = ({ target }) => apiFetch({
    endpoint: makePath(ENDPOINTS.inventory.updateTracking, inventoryId),
    method: 'PUT',
    params: {
      trackName: trackingType,
      statusId: parseInt(target.value, 10)
    },
    loadingMessage: `Changing ${title}'s status`,
    successMessage: 'Status changed successfully',
    onSuccess: () => updateTrackingData(target.value)
  });

  const updateTrackingData = codeId => {
    const newTrackingCode = trackingTypeData.options
      .find(({value}) => value === parseInt(codeId,10));
    setStatusId(codeId);
    return setTrackingHistory(prevState => [{
      tracking_code_date: moment(),
      tracking_code_name: newTrackingCode.label,
      tracking_code_user: ''
    }, ...prevState]);
  }

  const deleteComment = (inventoryCommentId) => apiFetch({
    method: 'DELETE',
    endpoint: ENDPOINTS.inventory.comments.delete,
    params: {inventoryId, inventoryCommentId},
    onSuccess: getComments,
  })

  const renderBadges = (codeColor, codeName, timestamp) => <>
      <span className={clsx(`badge-${codeColor}`, styles['text--badge'])}>{codeName}</span>
      <span className={clsx('badge-secondary', styles['text--badge'])}>
      Age: {FORMAT_TIME(timestamp)}
    </span>
    </>;

  const statusValue = !!trackingHistory.length
    ? `${trackingHistory[0].tracking_code_name} ${trackingHistory[0].tracking_code_date
      ? `@ ${moment(trackingHistory[0].tracking_code_date).format('MM/DD/YYYY hh:mm A')}`
      : ''
    } ${trackingHistory[0].tracking_code_user
      ? `By ${trackingHistory[0].tracking_code_user}`
      : ''
    }`
    : trackingCodeName;

  const renderTable = () => !!trackingHistory.length && <div className={styles['table--container']}>
    <TableRow isHead={true} />
    {trackingHistory.map((
      { tracking_type, tracking_code_date, tracking_code_name, tracking_code_user },
      index) => (
        <TableRow
          key={`${tracking_type}-${index}`}
          user={tracking_code_user}
          createdAt={tracking_code_date}
          status={tracking_code_name}
          id={index+1}
        />
      ))}
  </div>

  const renderedComments = comments.map(({name, nameFull, dateCreated, inventoryCommentId }, index) => (
    <InfoField
      key={`${title}-${index}`}
      bodyClassName={clsx(styles['field--body'],styles['field--body__col'])}>
      <div className={styles['comment--container']}>
        <div className={styles['comment--head']}>
          <div className={styles['comment--head__left']}>
            <span className={styles['text--name']}>{nameFull}</span>
            <span
              className={styles['text--message']}>{moment(dateCreated).format('MM/DD/YY hh:mm A')}
                  </span>
          </div>
          <div className={styles['comment--head__right']} onClick={()=>deleteComment(inventoryCommentId)}>
            <Sprite use='delete' className={styles['icon--delete']} />
          </div>
        </div>
        <span className={styles['text--message']}>{name}</span>
      </div>
    </InfoField>
  ))

  // RENDER
  return <InfoCard
    title={title}
    isCard={false}
    rightChildrenRender={() => renderBadges(color, trackingCodeName, createdAt)}
  >
    {trackingTypeData.hasOwnProperty('options') &&
      <InfoField label={title}  bodyClassName={styles['field--body']}>
          <Form.Checklist
            type="radio"
            value={statusId}
            options={trackingTypeData.options}
            onChange={updateTrackingCodeStatus}
            required
            fullWidth
          />
      </InfoField>
    }
    <InfoField label='Status' bodyClassName={styles['field--body']}>
      <h5 className={styles['text--status']}>
        {statusValue}
      </h5>
    </InfoField>

    {renderTable()}

    <InfoField
      bodyClassName={clsx(styles['field--body'],styles['field--body__col'])}
      labelComponent={
        <>
          <Sprite className={styles['item--footer--icon']} use='comments' />
          <span className={styles['text--label']}>Comments</span>
        </>
      }>
        <Form
          method="POST"
          initialValues={{typeId: trackingTypeId, inventoryId}}
          endpoint={ENDPOINTS.inventory.comments.add}
          onSuccess={getComments}
          loadingMessage="Posting comment"
          resetOnSubmit
        >
          <Form.Body className={styles.form__wrapper}>
            <Form.Control
              name="name"
              placeholder='Type your comment here'
              required
              fullWidth
              append={{use:'send', as: (props) => <button type='submit' {...props} />}}
            />
          </Form.Body>
        </Form>
    </InfoField>
    {renderedComments}
  </InfoCard>
};

// EXPORT
export default VehicleManagementItem;