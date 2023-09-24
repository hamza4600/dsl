import React, { useCallback, useEffect, useState } from 'react';

// DEPENDENCIES
import { useHistory, useParams } from 'react-router-dom';
import {useFormikContext} from 'formik';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';
import { INVENTORY_STATUS } from 'codes';
import { INTERFACE } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { apiFetch, makePath } from 'functions.js';

// LOCAL COMPONENTS
import ActionTab from './parts/ActionTab';
import IMVInfo from './parts/IMVInfo';
import IMVResults from './parts/IMVResults';
import InventoryStatus from './parts/InventoryStatus';
import InventoryToolbar from './parts/InventoryToolbar';
import VehicleManagement from './parts/VehicleManagement';
import PurchaseInfo from './parts/PurchaseInfo';
import InventoryDetail from '../parts/Detail';
import InventoryInternal from '../../../sections/InventoryInternal';
import InventoryAttachments from '../../../sections/InventoryAttachments';
import VehicleInfo from '../../../sections/VehicleInfo';
import PricingInfo from '../../../sections/PricingInfo';
import Slider from '../../../../../parts/slider/Slider';

// MAIN COMPONENT
const InventoryBody = (({ vehicleId, onDataLoad, toggleSlider}) => {
  const { values } = useFormikContext();
  const [imvInfo, setImvInfo] = useState({});
  const [imvResult, setImvResult] = useState({});

  useEffect(() => {
    onDataLoad(values);
  },[values])

  const getImvInfoData = useCallback(
    () =>
      apiFetch({
        method: 'GET',
        endpoint: makePath(ENDPOINTS.inventory.imvInfo, vehicleId),
        onSuccess: ({ IMV_Info, IMV_Result }) => {
          setImvInfo(IMV_Info);
          setImvResult(IMV_Result);
        }
      }),
    [vehicleId]
  );

  useEffect(() => {
    const init = async () => {
      await getImvInfoData();
    };

    init().catch(console.error);

    return cleanup;
  }, [getImvInfoData]);

  const cleanup = () => {
      setImvInfo({});
      setImvResult({});
  }

  return (
      <>
        <InventoryStatus />
        <VehicleInfo inventoryId={vehicleId} toggleSlider={toggleSlider}  />
        <IMVInfo data={imvInfo} />
        <IMVResults data={imvResult} />
        <PricingInfo />
        <PurchaseInfo/>
        <InventoryInternal />
        <InventoryAttachments />
        <VehicleManagement inventoryId={vehicleId} />
      </>
  );
});

const InventoryView = () => {
  const history = useHistory();
  const { recordID } = useParams();
  const [inventoryDetails, setInventoryDetails] = useState({})
  const [inventoryCode, setInventoryCode] = useState('S');
  const [sliderData, setSliderData] = useState({
    title: '',
    key: '',
    isOpen: false,
    form: <></>
  });

  useEffect(() => {
      if (Object.hasOwn(inventoryDetails, 'inventory_status_name')) {
        const inventory = Object.keys(INVENTORY_STATUS)
          .map(e => INVENTORY_STATUS[e])
          .find(({ label }) => label === inventoryDetails.inventory_status_name);

        setInventoryCode(inventory ? inventory.code : 'S');
      }
    },[inventoryDetails]);

  const goToEdit = () => history.push(makePath(INTERFACE.inventory, 'edit', recordID))

  const toggleSlider = (title = '', key = '', form = <></>) => {
  setSliderData(prevState => ({
    title,
    key,
    isOpen: !prevState.isOpen,
    form
  }))};

  return(
    <>
      <Slider title={sliderData.title} isOpen={sliderData.isOpen} onToggle={toggleSlider}>
        {sliderData.form}
      </Slider>
      <InventoryDetail
        title="Vehicle Information"
        onEditClick={goToEdit}
        buttons={<InventoryToolbar toggleSlider={toggleSlider} /> }
        headerRight={<ActionTab inventoryId={recordID} inventoryCode={inventoryCode} />}
      >
        <InventoryBody onDataLoad={data => setInventoryDetails(data)} vehicleId={recordID} toggleSlider={toggleSlider}/>
      </InventoryDetail>
    </>
)}

// EXPORT
export default InventoryView;
