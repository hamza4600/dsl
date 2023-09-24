import React, { useCallback, useEffect, useState } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import moment from 'moment';
import { useParams } from 'react-router-dom';

// GLOBAL FUNCTIONS
import { apiFetch, makePath, doCallback } from 'functions';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Button from 'core/tools/Button';

// GLOBAL COMPONENTS
import Sprite from 'core/tools/Sprite';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints';

// LOCAL VARIABLES
import { ACTIVITY_LABELS, SALES_TABS } from '../../variables';

// STYLES
import styles from './actionstyles.module.scss';

const ActionTab = () => {
  const { recordID } = useParams();
  const salesId = Number(recordID) || 0;
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState('');
  const [comments, setComments] = useState([]);
  const [counter, setCounter] = useState({});
  const [activity, setActivity] = useState([]);

  const checkIsOpen = currentTab => currentTab === tab && isOpen;
  const handleTabClick = (tabKey = '') => setTab(tab === tabKey ? '' : tabKey);

  //Counters
  useEffect(() => {
    setCounter({
      commentsCount: comments.length
    });
  }, [comments]);

  //COMMENTS
  const getComments = useCallback(
    () =>
      apiFetch({
        method: 'GET',
        endpoint: ENDPOINTS.sales.comments.list,
        params: { salesId },
        onSuccess: results => setComments(results.result)
      }),
    [salesId]
  );

  const deleteComment = dailySalesCommentId =>
    apiFetch({
      method: 'DELETE',
      endpoint: makePath(ENDPOINTS.sales.comments.delete, salesId, dailySalesCommentId),
      loadingMessage: 'Deleting comment',
      successMessage: 'Comment deleted successfully!',
      onSuccess: () => doCallback(getComments)
    });

  const renderComments = () => (
    <div className={styles['popup-element']}>
      <Form
        method="POST"
        resetOnSubmit
        endpoint={ENDPOINTS.sales.comments.add}
        initialValues={{ salesId, activity_type_id: 7 }}
        onSuccess={getComments}
        successMessage="Comment Added Sucessfully"
        loadingMessage="Posting Comment"
        errorMessage="Error Occurred"
      >
        <Form.Textarea required name="comment" placeholder="Type Here Your Comment" schema="comment" />
        <div
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Button.Cancel label="Cancel" link disabled={false} />
          <Button.Submit variant="success" label="Submit" icon={{ use: 'confirm' }} fullWidth={false} />
        </div>
      </Form>
      <hr />

      {comments.map(({ date_created, comments, posted_by, daily_sales_comment_id }, index) => (
        <div key={`${posted_by}-${index}`} className={styles['comments--item--wrapper']}>
          <div className={styles['comments--item']}>
            <h5 className={styles['comments--description']}>{comments}</h5>
            <div className={styles['comments--foot']}>
              <span>{posted_by}</span>
              <div className={styles['comments--foot--right']}>
                <span>{moment(date_created).format('MM/DD/YYYY hh:mm A')}</span>
                <div onClick={() => deleteComment(daily_sales_comment_id)}>
                  <Sprite use="delete" className={styles['comments--foot--icon']} />
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );

  //ACTIVITYLOG
  const getActivityLog = useCallback(
    () =>
      apiFetch({
        method: 'GET',
        endpoint: makePath(ENDPOINTS.sales.activityLog, salesId),
        onSuccess: res => {
          const activityData = [];

          res.result.forEach(({ date_created, ...element }) => {
            const itemDate = {
              date: moment(date_created).format('MMMM Do'),
              year: moment(date_created).format('YYYY')
            };

            const targetIndex = activityData.findIndex(
              item => item.date === itemDate.date && item.year === itemDate.year
            );

            if (targetIndex > -1) {
              activityData[targetIndex].data.push({ ...element, date_created });
            } else {
              activityData.push({
                date: itemDate.date,
                year: itemDate.year,
                data: [{ ...element, date_created }]
              });
            }
          });

          return setActivity(activityData);
        }
      }),
    [salesId]
  );

  const renderActivity = () => (
    <div className={styles['popup-element']}>
      {activity.map(({ data, date, year }) => (
        <div key={`${date}-${year}`}>
          <p className={styles['activity--date']}>{processDate(date, year)}</p>
          {data.map(({ activity_log_user_full_name, activity_type, date_created, details }) => (
            <div className={styles['sales--container']}>
              <div className={styles['sales--container--top']}>
                <h5 className={styles['activity--title']}>
                  <b>{activity_log_user_full_name}</b> {activity_type}
                </h5>
                <p>{moment(date_created).format('MM/DD/YYYY hh:mm A')}</p>
              </div>
              <div className={styles['sales--container--bottom']}>
                <div className={styles['sales--container--row']}>
                  <p className={styles.label}>Field</p>
                  <p className={styles.label}>Original Value</p>
                  <p className={styles.label}>New Value</p>
                </div>

                {details.map(({ field, new_value, original_value }, index) => (
                  <div key={`${date_created}-${field}-${index}`} className={styles['sales--container--row']}>
                    <p className={styles.value}>
                      {ACTIVITY_LABELS[field] ||
                        `${field
                          .split('_')
                          .map(str => str.slice(0, 1).toUpperCase() + str.substring(1))
                          .join(' ')}`}
                    </p>
                    <p className={styles.value}>{original_value || '-'}</p>
                    <p className={styles.value}>{new_value || '-'}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderedTabs = SALES_TABS.map(({ label, sprite, counterKey, key }, index) => {
    const iOpen = checkIsOpen(key);
    return (
      <div
        key={`${key}-${index}`}
        onClick={() => handleTabClick(key)}
        className={clsx(
          styles['container--button-group--item'],
          iOpen && styles['container--button-group--item__focused']
        )}
      >
        <Sprite use={sprite} className={iOpen ? styles['sprite__focused'] : styles.sprite} />
        <h5>{label}</h5>
        {counterKey && (
          <span className={clsx(styles.badge, iOpen && styles['badge__focused'])}>{counter[counterKey] || 0}</span>
        )}
      </div>
    );
  });

  const renderContent = () => {
    switch (tab) {
      case 'C':
        return renderComments();
      case 'A':
        return renderActivity();
      default:
        return null;
    }
  };

  const renderTitle = () => {
    switch (tab) {
      case 'C':
        return 'Comments';
      case 'A':
        return 'Recent Activity';
      default:
        return null;
    }
  };

  const getData = useCallback(() => {
    switch (tab) {
      case 'C':
        return getComments();
      case 'A':
        return getActivityLog();
      default:
        return true;
    }
  }, [tab, getComments, getActivityLog]);

  useEffect(() => {
    setIsOpen(tab !== '');
    if (tab !== '') getData();
  }, [tab, getData]);

  useEffect(() => {
    getComments();
    getActivityLog();
  }, []);

  const processDate = date =>
    date === moment().format('MMMM Do YYYY')
      ? 'today'
      : date === moment().subtract(1, 'days').format('MMMM Do YYYY')
      ? 'yesterday'
      : date.split(' ').slice(0, 2).join(' ');

  // RENDER
  return (
    <div className={styles.wrapper}>
      {isOpen && (
        <div className={styles['close-button']} onClick={() => handleTabClick()}>
          <Sprite className={styles['close-button--icon']} use="cancel" />
        </div>
      )}
      <div className={clsx(styles['container--button-group'], isOpen && styles['container--button-group__opened'])}>
        {renderedTabs}
      </div>
      {isOpen && (
        <div className={styles['popup--container']}>
          <div className={styles['popup--head']}>
            <div>
              <h3>{renderTitle()}</h3>
            </div>
            <hr />
          </div>
          {renderContent()}
        </div>
      )}
    </div>
  );
};

// EXPORT
export default ActionTab;
