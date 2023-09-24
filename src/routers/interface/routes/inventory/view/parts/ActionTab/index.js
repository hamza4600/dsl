import React, { useCallback, useEffect, useState } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';

// GLOBAL FUNCTIONS
import { apiFetch, makePath } from 'functions';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Button from 'core/tools/Button';
import Sprite from 'core/tools/Sprite';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints';

// LOCAL VARIABLES
import { ACTIVITY_LABELS, INVENTORY_TABS } from '../../../variables';

// STYLES
import styles from './styles.module.scss';
import { INTERFACE } from '../../../../../../../pathnames';


// MAIN COMPONENT
const ActionTab = ({ inventoryCode }) => {
  const {recordID: inventoryId} = useParams();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState('');
  const [comments, setComments] = useState([]);
  const [activity, setActivity] = useState([]);
  const [counter, setCounter] = useState({});
  const [salesActivity, setSalesActivity]= useState([]);

  const getSalesActivity = useCallback(
    () =>
      apiFetch({
        method: 'GET',
        endpoint: makePath(ENDPOINTS.inventory.salesActivity, inventoryId),
        onSuccess: ({ result }) =>
          setSalesActivity(prevProps => [...result.arySalesActivityLog])
      }),
    [inventoryId]
  );

  const getComments = useCallback(() => apiFetch({
    method: 'GET',
    endpoint: ENDPOINTS.inventory.comments.list,
    params: {
      inventoryId
    },
    onSuccess: res => setComments(res.results.reverse())
  }), [inventoryId])

  const getInventoryActivity = useCallback(() => apiFetch({
    method: 'GET',
    endpoint: makePath(ENDPOINTS.inventory.activityLog, inventoryId),
    onSuccess: ({ result }) => {
      const activityData = [];

      result.aryActivityLog.forEach(({ date_created, ...element }) => {
        const itemDate = {
          date: moment(date_created).format('MMMM Do'),
          year: moment(date_created).format('YYYY')
        };

        const targetIndex = activityData.findIndex(item => item.date === itemDate.date && item.year === itemDate.year);

        if (targetIndex > -1) {
          activityData[targetIndex].data.push({ ...element, date_created })
        } else {
          activityData.push({
            date: itemDate.date,
            year: itemDate.year,
            data: [{ ...element, date_created }]
          })
        }
      });

      return setActivity(activityData);
    },
  }), [inventoryId])


  useEffect(() => {
      getSalesActivity();
      getComments();
      getInventoryActivity();

      return cleanup;
  }, []);

  const cleanup = () => {
    setSalesActivity([]);
    setComments([]);
    setActivity([]);
  }

  useEffect(()=>{
    setCounter({
      salesCount: salesActivity.length,
      commentsCount: comments.length,
    })
  },[salesActivity, comments])

  const getData = useCallback(() => {
    switch (tab) {
      case 'C': return getComments();
      case 'A': return getInventoryActivity();
      case 'S': return getSalesActivity();
      default: return true;
    }
  }, [tab, getComments, getInventoryActivity, getSalesActivity]);

  useEffect(() => {
    setIsOpen(tab !== '')
    if (tab !== '') getData();
  }, [tab, getData])

  const deleteComment = (inventoryCommentId) => apiFetch({
    method: 'DELETE',
    endpoint: ENDPOINTS.inventory.comments.delete,
    params: {
      inventoryId,
      inventoryCommentId
    },
    loadingMessage:'Deleting comment',
    successMessage: 'Comment deleted successfully!',
    onSuccess: getComments
  })

  const handleTabClick = (tabKey = '') => setTab(tab === tabKey ? '' : tabKey);
  const checkIsOpen = currentTab => currentTab === tab && isOpen;

  const renderedTabs = INVENTORY_TABS.map(
    ({ label, sprite, counterKey, key }, index) => {
      const iOpen = checkIsOpen(key);

      return (<div
        key={`${key}-${index}`}
        onClick={() => handleTabClick(key)}
        className={
          clsx(
            styles['container--button-group--item'],
            iOpen && styles['container--button-group--item__focused']
          )}
      >
        <Sprite
          use={sprite}
          className={iOpen ? styles['sprite__focused'] : styles.sprite}
        />
        <h5>{label}</h5>
        {counterKey && <span
          className={
            clsx(
              styles.badge,
              iOpen && styles['badge__focused']
            )}
        >
          {counter[counterKey] || 0}
        </span>}
      </div>);
    }
  )

  const renderContent = () => {
    switch (tab) {
      case 'S': return renderSale();
      case 'C': return renderComments();
      case 'A': return renderActivity();
      default: return <></>;
    }
  }

  const renderTitle = () => {
    switch (tab) {
      case 'S': return 'Sales';
      case 'C': return 'Comments';
      case 'A': return 'Recent Activity';
      default: return '';
    }
  }

  const renderSale = () => <div className={styles['popup-element']}>
    {salesActivity.length
      ? salesActivity.map(({ status_css_class_name, salesperson_full_name, customer_full_name, time, status_name }, index) =>
        <div className={styles['sales--container']} key={`${status_name}-${time}-${index}`}>
          <div className={styles['sales--container--top']}>
            <h5>{customer_full_name}</h5>
            <p>{time}</p>
          </div>
          <div className={styles['sales--container--bottom']}>
            <div>
              <p className={styles.label}>Status</p>
              <p className={clsx(styles.value, status_css_class_name)}>{status_name}</p>
            </div>
            <div>
              <p className={styles.label}>Sales Person</p>
              <p className={styles.value}>{salesperson_full_name || '-'}</p>
            </div>
          </div>
        </div>
      )
      : <div className={clsx(styles['sales--container'], styles['sales--container__empty'])}>
        <span>{"No sales have been entered for Inventory. Click "}<Button.Link label="here" onClick={() => history.push(makePath(INTERFACE.sales, 'add' ))} />{" to add sale."}</span>
      </div>
    }
  </div >

  const renderComments = () => <>
    <div className={styles['popup-element']}>

      <Form
        resetOnSubmit
        endpoint={ENDPOINTS.inventory.comments.add}
        initialValues={{ inventoryId, typeId: 1 }}
        onSuccess={getComments}
        loadingMessage="Posting comment"
        errorMessage="Error occurred"
        method="POST"
      >
        <Form.Textarea name="name"  placeholder="Type Here Your Comment" schema='comment' />
        <div style={{ display: 'flex', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button.Cancel label="Cancel" link disabled={false} />
          <Button.Submit variant="success" label="Submit" icon={{ use: 'confirm' }} fullWidth={false} />
        </div>
      </Form>

      <hr />
    </div>

    {comments.map(({ dateCreated, name, nameFull, inventoryCommentId }, index) => <div key={`${nameFull}-${index}`} className={styles['comments--item--wrapper']}>
      <div className={styles['comments--item']} key={inventoryCommentId}>
        <h5 className={styles['comments--description']}>
          {name}
        </h5>
        <div className={styles['comments--foot']}>
          <span>{nameFull}</span>

          <div className={styles['comments--foot--right']}>
            <span>{moment(dateCreated).format('MM/DD/YYYY hh:mm A')}</span>
            <div onClick={() => deleteComment(inventoryCommentId)}>
              <Sprite
                use="delete"
                className={styles['comments--foot--icon']}
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
    )}
  </ >

  const processDate = (date) => date === moment().format('MMMM Do YYYY')
    ? 'today'
    : date === moment().subtract(1, 'days').format('MMMM Do YYYY')
      ? 'yesterday'
      : date.split(' ').slice(0, 2).join(' ')

  const renderActivity = () => <div className={styles['popup-element']}>
    {activity.map(({ data, date, year }) =>
      <div key={`${date}-${year}`}>
        <p className={styles['activity--date']}>{processDate(date, year)}</p>
        {data.map(
          ({ activity_log_user_full_name, activity_type, date_created, aryFields }, index) =>
            <div className={styles['sales--container']} key={`${date_created}-${activity_type}-${index}`}>
              <div className={styles['sales--container--top']}>
                <h5 className={styles['activity--title']}><b>{activity_log_user_full_name}</b> {activity_type}</h5>
                <p>{moment(date_created).format('MM/DD/YYYY hh:mm A')}</p>
              </div>


              <div className={styles['sales--container--bottom']}>
                <div className={styles['sales--container--row']}>
                  <p className={styles.label}>Field</p>
                  <p className={styles.label}>Original Value</p>
                  <p className={styles.label}>New Value</p>
                </div>

                {aryFields.map(({field_name, new_value, original_value}, index) => <div
                  key={`${date_created}-${field_name}-${index}`}
                  className={styles['sales--container--row']}
                >
                  <p className={styles.value}>
                    {ACTIVITY_LABELS[field_name]
                      || `${field_name
                        .split('_')
                        .map(str => str.slice(0, 1).toUpperCase() + str.substring(1)).join(' ')}`}
                  </p>
                  <p className={styles.value}>{original_value || '-'}</p>
                  <p className={styles.value}>{new_value || '-'}</p>
                </div>)}
              </div>
            </div>
        )}
      </div>
    )}
  </div>

  // RENDER
  return !['O', 'F', 'B'].includes(inventoryCode)
    ? (
      <div className={styles.wrapper}>
        { isOpen && <div className={styles['close-button']} onClick={() => handleTabClick()}>
          <Sprite className={styles['close-button--icon']} use="cancel" />
        </div> }
        <div className={clsx(styles['container--button-group'], isOpen && styles['container--button-group__opened'])}>
          {renderedTabs}
        </div>
        {isOpen && <div className={styles['popup--container']}>
          <div className={styles['popup--head']}>
            <div>
              <h3>
                {renderTitle()}
            </h3>
          </div>
          <hr />
          </div>
          {renderContent()}
        </div>}
      </div>
    )
    :null
};

// EXPORT
export default ActionTab
