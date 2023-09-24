import React from 'react';
import { useHistory } from 'react-router-dom';

// LOCAL VARIABLES
import { INVENTORY_DATA_LABELS, INVENTORY_DATA_FOOTER } from '../variables';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';

import { Col, Row } from "react-bootstrap";

// GLOBAL METHODS
import { makePath } from 'functions';

// GLOBAL VARIABLES
import { INTERFACE } from 'pathnames';


// STYLES
import styles from './vehicleInfo.module.scss'

// MAIN COMPONENT
const VehicleInfo = ({ vehicleDetails }) => {
  const history = useHistory();
  const {daily_sales_inventory_id} = vehicleDetails

  const handleClick = () => {
    history.push(makePath(INTERFACE.sales, 'add', daily_sales_inventory_id ))
  }

  const renderedBody = Object
    .keys(INVENTORY_DATA_LABELS)
    .map((element, index) => <div
      className={styles['container--row']}
      key={`${element}-${index}`}
    >
      <h5 className={styles['text--label']}>
        {INVENTORY_DATA_LABELS[element]}
      </h5>
      <h5>
        {
          index === 0
            ? <Button.Link label={vehicleDetails[element]} to={makePath(INTERFACE.inventory, 'view', daily_sales_inventory_id)} />
            : vehicleDetails[element]
        }
      </h5>
    </div>
    )

  const renderedFoot = Object
    .keys(INVENTORY_DATA_FOOTER)
    .map((element, index) => <div
      className={styles['container--row']}
      key={`${element}-${index}`}
    >
      <h5 className={styles['text--label']}>
        {INVENTORY_DATA_FOOTER[element]}
      </h5>
      <h5>
        {vehicleDetails[element]}
      </h5>
    </div>
    )

  return <div className={styles.container}>
    <div className={styles['container--body']}>
      {renderedBody}
    </div>
    <div className={styles['container--footer']}>
      {renderedFoot}
    </div>
    <Row>
      <Col xs={6}>
      <Button.Add size="xs" disabled={false} onClick={handleClick} />
      </Col>
    </Row>
  </div>
}

// EXPORT
export default VehicleInfo;
