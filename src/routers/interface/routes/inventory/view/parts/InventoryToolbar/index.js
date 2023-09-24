import React, {useEffect, useState, useContext} from 'react';

// DEPENDENCIES
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { RecordContext } from 'helpers/getRecordData';

// GLOBAL COMPONENTS
import Button from 'core/tools/Button';
import SwitchToggle from 'core/tools/SwitchToggle';
import ConfirmationModal from 'core/tools/modal/types/ConfirmationModal';

// GLOBAL METHODS
import { apiFetch, makePath } from 'functions';

// GLOBAL VARIABLES
import { INTERFACE } from 'pathnames';
import { ENDPOINTS } from 'endpoints';
import { INVENTORY_STATUS } from 'codes';

// LOCAL COMPONENTS
import PrintButton from '../Print';
import Return from '../forms/Return';
import Convert from '../forms/Convert';

// STYLE
import styles from './styles.module.scss';

// MAIN COMPONENT
const InventoryToolbar = ({toggleSlider}) => {
  const history = useHistory();
  const location = useLocation();
  const {recordID: vehicleId} = useParams();
  const { record: values, refetchRecord } = useContext(RecordContext) || {};

  const [inventoryCode, setInventoryCode] = useState('S');
  const [ePostIsVisible, setEPostIsVisible] = useState(false);
  const [pagination, setPagination] = useState({total: 10, currentIndex: 1, prevId: 0, nextId: 0});

  const {
    source_sales_id: salesId,
    is_for_wholesale: isWholeSale,
    new_used: isNew,
    stock_num,
    inventory_status_name
  } = values || {};

  useEffect(() => {
    const inventory = Object.keys(INVENTORY_STATUS)
      .map(e => INVENTORY_STATUS[e])
      .find(({ label }) => label === inventory_status_name);

    setInventoryCode(inventory ? inventory.code : 'S');
  }, [values])

  useEffect(()=>{
    if (
      location.state
      && Object.hasOwn(location.state, 'daily_sales_inventory_id_list')
    ) {
      const inventoryKeys = location.state.daily_sales_inventory_id_list.split(',');
      const currentInv = inventoryKeys.findIndex(id => id === vehicleId.toString());
      const total = inventoryKeys.length;

      setPagination({
        total,
        currentIndex: currentInv + 1,
        prevId: currentInv > 0 ? inventoryKeys[currentInv - 1] : null,
        nextId: currentInv + 1 < total ? inventoryKeys[currentInv + 1] : null
      });
    } else {
      setPagination(null)
    }

  },[location.state, vehicleId])

  const goPrev = () => history.push({
    pathname: makePath(INTERFACE.inventory, 'view', pagination.prevId),
    state: location.state
  });

  const goNext = () => history.push({
    pathname: makePath(INTERFACE.inventory, 'view', pagination.nextId),
    state: location.state
  });

  const updateRecord = () => {
    refetchRecord()
    toggleSlider()
  }

  const toggleEPostModal = () => setEPostIsVisible(prevState => !prevState);

  const onReturn = () => toggleSlider('Return', 'return', renderSliderForm('return'));
  const onConvert = () => toggleSlider('Convert to Pre-Owned', 'convert', renderSliderForm('convert'));
  const onEPost = () => toggleEPostModal();

  const sendEPostRequest = () => apiFetch({
    method: 'PUT',
    endpoint: makePath(ENDPOINTS.inventory.ePost, vehicleId),
    params: {
      resend: true
    },
    loadingMessage: 'Sending Email',
    successMessage: 'Email sent successfully.',
    errorMessage: 'Error sending the email.',
  })

  const handleAddSale = () => history.push(makePath(INTERFACE.sales, 'add' ));
  const handleReturn = () => onReturn();
  const handleConvert = () => onConvert();
  const handleEPost = () => onEPost();
  const handleWholeSale = () => apiFetch({
    method: 'POST',
    endpoint: makePath(ENDPOINTS.inventory.updateWholeSale, vehicleId),
    params: {
      isForWholeSale: !!isWholeSale ? 0 : 1
    },
    loadingMessage: 'Updating Wholesale value',
    successMessage: 'Wholesale value updated successfully'
  });

  const renderSliderForm = (key) => {
    switch (key) {
      case 'return':
        return <Return
          inventoryId={vehicleId}
          stockNo={stock_num}
          onCancel={toggleSlider}
          handleSuccess={updateRecord}
        />;
      case 'convert':
        return <Convert
          inventoryId={vehicleId}
          stockNo={stock_num}
          onCancel={toggleSlider}
          handleSuccess={updateRecord}
        />;
      default:
        return <></>;
    }
  };

  // RENDER
  return <div className={styles.container}>
     <div className={styles['container--left']}>
       <Button
         label="Add Sale"
         icon='add-circle'
         size="sm"
         variant="success"
         solid
         onClick={handleAddSale}
         fullWidth={false}
       />
       <PrintButton
         vehicleId={vehicleId}
         salesId={salesId}
         isSold={inventoryCode === 'S'}
       />
       {['PS', 'I', 'F', 'B'].includes(inventoryCode)
         && <Button
           onClick={handleReturn}
           outline
           fullWidth={false}
           label="Return"
           icon="cancel"
           size="sm"
         />
       }
       {!!isNew && <Button
           onClick={handleConvert}
           outline
           fullWidth={false}
           label="Convert"
           icon="compare-arrows"
           size="sm"
       />}
       <Button
         onClick={handleEPost}
         outline
         fullWidth={false}
         label="E-Post"
         icon="email"
         size="sm"
       />
       {
         !['S', 'PS', 'O'].includes(inventoryCode)
         && <SwitchToggle
           label="Wholesale"
           onToggle={handleWholeSale}
           active={!!isWholeSale}
         />
       }
     </div>
     <div></div>
    {pagination && <div className={styles['container--right']}>
       {pagination.currentIndex > 1 &&
         <Button onClick={goPrev}
                 outline
                 label='Previous Vehicle'
                 icon='arrow-left'
                 size='sm'
                 justify='flex-reverse' />}
       <h5 className={styles.text}>{`${pagination.currentIndex} of ${pagination.total}`}</h5>
      {pagination.currentIndex < pagination.total && <Button onClick={goNext}
                                                             outline
                                                             label='Next Vehicle'
                                                             icon='arrow-right'
                                                             size='sm' />}
      {ePostIsVisible && <ConfirmationModal
        title='E-Post Inventory Package to Accounting'
        body='Are you sure you want to resend the inventory package to accounting to be E-Posted?'
        onClose={toggleEPostModal}
        cancelButton={{
          label: 'Cancel'
        }}
        continueButton={{
          label: 'E-Post',
          icon: {
            use: 'email'
          },
          onClick: sendEPostRequest
        }}
      />}
     </div>}
  </div>
};

// EXPORT
export default InventoryToolbar;
