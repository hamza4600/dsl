import React, { useState } from 'react';

// GLOBAL FUNCTIONS
import clsx from 'clsx';
import format from 'date-fns/format';

// DEPENDENCIES
import { Accordion, Card, Row, Col } from 'react-bootstrap';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

// GLOBAL VARIABLES
import { DATE_FORMATS } from 'globals.js';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import Form from 'core/form/Form.js';

// LOCAL COMPONENTS
import AddComment from './AddComment';
import CompleteTask from './CompleteTask';
import DeleteComment from './DeleteComment';

// STYLES
import styles from './tasks.module.scss';

// MAIN COMPONENT
const Tasks = ({ eventKey, tasks, reloadTasks, rowIndex, updateList, mobile}) => {
  const [completed, setCompleted] = useState({});

  const onClose = useAccordionToggle(eventKey);

  return tasks?.length ? (
    <Accordion.Collapse eventKey={eventKey}>
      <Card.Body className={styles.tasks}>
         {mobile && <Button className={clsx(styles.closeButtonMobile)} icon="cancel" onClick={onClose} />}
        {tasks.map((t, i) => {
          const { by: completedBy, on: completedOn } = completed[t.task_id] || {};
          return (
            <div key={i} className={styles.task}>
              <Row className={styles.row}>
                <Col sm={4} md={8} lg={1} className={clsx(styles.Bold,"d-flex align-items-start mb-3 mb-lg-0 col-5")}>
                  <CompleteTask
                    completed={completed}
                    setCompleted={setCompleted}
                    rowIndex={rowIndex}
                    taskId={t.task_id}
                    updateList={updateList}
                  />
                  {i + 1}
                </Col>
                <Col sm={20} md={15} lg={7} className={clsx(styles.Bold,"mb-3 mb-lg-0 col-19", mobile && 'pl-0')}>
                  {t.task_description}
                </Col>
                <Col lg={7} className={clsx('mb-3 mb-lg-0', styles.commentCol)}>
                  <Form className={styles.comment}>
                    <AddComment taskId={t.task_id} onAdded={reloadTasks} />
                  </Form>
                </Col>
                <Col md={8} lg={6} className={clsx(styles.created,"mb-3 mb-md-0 col-11 mr-0 pr-0")}>
                  <div>
                    <span >Created On: </span>
                    <span className="d-inline-block">
                      {format(new Date(t.task_created_date), DATE_FORMATS.date)}{' '}
                      {!mobile && ` by  ${t.task_created_by}`}
                    </span>
                  </div>
                  {completedBy ? (
                    <div className="mt-2">
                      Completed By: <span className="d-inline-block">{completedBy}</span>
                    </div>
                  ) : null}
                  {completedOn ? (
                    <div className="mt-2">
                      Completed On:&nbsp;
                      <span className="d-inline-block">{format(new Date(completedOn), DATE_FORMATS.dateTime)}</span>
                    </div>
                  ) : null}
                </Col>
                <Col className={clsx(styles.Bold,"col-6",mobile && 'pl-2')} md={16} lg={3}>{`Age: ${t.task_age}`}</Col>
              </Row>
              {t.arryComments?.length ? (
                <div>
                  {t.arryComments.map((c, i) => (
                    <Row key={c.comment_id} className={styles.comments}>
                      <Col lg={{ offset: 1, span: 15 }}>
                        <div className="p-3 border rounded-lg">
                          <div className="d-flex">
                            <div className="small">
                              <span className={clsx(c.comment_author && 'mr-2', styles.name)}>{c.comment_author}</span>
                              <span className="text-gray-600">
                                {format(new Date(c.comment_date), DATE_FORMATS.dateTime)}
                              </span>
                            </div>
                            <DeleteComment commentId={c.comment_id} reloadTasks={reloadTasks} />
                          </div>
                          <div>{c.comment_body}</div>
                        </div>
                      </Col>
                    </Row>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
       {!mobile && <Button className={styles.closeButton} icon="cancel" onClick={onClose} />}
      </Card.Body>
    </Accordion.Collapse>
  ) : null;
};

// EXPORT
export default Tasks;
