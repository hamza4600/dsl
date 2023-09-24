import React, { useEffect, useMemo, useState } from 'react';

// DEPENDENCIES
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useFormikContext } from 'formik';

// GLOBAL VARIABLES
import { NEW_USED_TYPES } from 'globals.js';

// LOCAL VARIABLES
import { INVENTORY_SOURCE_IDS, LOCATION_TYPE_IDS, PURCHASE_METHOD, WARRANTIES } from './variables';
import { LOCATION_TYPE } from '../routes/inventory/variables';

// HELPERS
import useRecordView from 'helpers/getRecordView';

// GLOBAL COMPONENTS
import Card from 'parts/card/Card';
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import VinNumber from '../tools/VinNumber';

// STYLES
import styles from './vehicleInfo.module.scss';
import LocationUpdate from '../routes/inventory/view/parts/forms/LocationUpdate';
import { ENDPOINTS } from 'endpoints.js';
import { apiFetch, makePath } from 'functions.js';

// MAIN COMPONENT
const VehicleInfoForm = compose(
  withRouter,
  connect(({ dealership, user, lookups }) => ({ dealership, user, lookups }))
)(({ location: { search }, dealership, user: {stores}, lookups: {vehicleMakes}, inventoryId, toggleSlider }) => {
  const { isAdd, isEdit, isView } = useRecordView();
  const { initialValues, values, setFieldValue } = useFormikContext() || {};
  const {
    created_by,
    date_created,
    inventory_source_id,
    inventory_source_method_name,
    is_order,
    located_at_dealership,
    location_type_id,
    new_used,
    stock_num,
    vehicle_year,
    make,
    model,
    warranty_type
  } = values || {};

  const [isAtDealership, setIsAtDealership] = useState(located_at_dealership);

  const params = new URLSearchParams(search);
  const newUsedParam = params.get('new_used');
  const newUsed = newUsedParam ? +newUsedParam : new_used;
  const newUsedLabel = NEW_USED_TYPES[new_used];
  const stockNumParam = params.get('stock_num');
  const isPurchaseFromCustomer = +inventory_source_id === INVENTORY_SOURCE_IDS.PURCHASE_FROM_CUSTOMER_FOR_INVENTORY;
  const isManufacturer = +inventory_source_id === INVENTORY_SOURCE_IDS.MANUFACTURER;
  const isTrade = +inventory_source_id === INVENTORY_SOURCE_IDS.TRADE;
  const isCAD = +location_type_id === LOCATION_TYPE_IDS.CAD;
  const isOrder = +is_order === 1;
  const isLocatedAtDealership = +located_at_dealership === 1;

  const sourceMethod = useMemo(() => {
    return inventory_source_method_name
      ? `${inventory_source_method_name} ${date_created} ${created_by ? 'by ' + created_by : ''}`
      : undefined;
  }, [inventory_source_method_name, date_created, created_by]);

  const {MakeID} = useMemo( () => (stores || []).find(store => store.make_dealer_id === dealership) || '', [stores] );
  const {vehicle_make_name} = useMemo( () => (vehicleMakes || []).find(vehicle => vehicle.vehicle_make_id === MakeID) || '', [vehicleMakes,MakeID] );
  const handleLocationChange = () => isView && toggleSlider('Location Update','location',
    <LocationUpdate
      isNew={!!new_used}
      isArrived={!!located_at_dealership}
      vehicle={`Stock# ${stock_num}, ${vehicle_year}, ${make}, ${model},`}
      onCancel={toggleSlider}
      onSuccess={() => {
        setIsAtDealership(prevState => !prevState)
        toggleSlider()
      }}
      dailySalesInventoryId={inventoryId}
      values={values}
    />
  );

  const handleSelect = (warrantyId) => {
    apiFetch({
      method: 'PUT',
      params: {
        warrantyType: warrantyId
      },
      endpoint: makePath(ENDPOINTS.inventory.updateWarrantyType, inventoryId),
      loadingMessage: 'Updating warranty.',
      successMessage: 'Warranty updated.',
      errorMessage: 'Error updating your warranty.',
      onError: () => {
        setFieldValue('warranty_type',warranty_type)
      }
    })
  }

  useEffect(() => {
    setIsAtDealership(located_at_dealership)
  },[located_at_dealership])

  return (
    <>
      <Form.Body plaintext={isView}>
        <Form.Control label="Stock #" name="stock_num" hidden={!isView} />
        <Form.Control label="Vin #" name="vin_num" hidden={!isView} />
        <Form.Control name="new_used" value={newUsed} required={!isView} hidden />
        <Form.Control className={styles.paragraph} label="Type" value={newUsedLabel} plaintext />
        <Form.Control className={styles.paragraph} name="date_created" label="Date Added" plaintext hidden={isView} />
        <Form.Date name="purchase_date"
                   label="Purchase Date"
                   text="* Must be the date on the Seller's Bill of Sale"
                   required={!isView}
        />
        <Form.Select name="inventory_source_id"
                     label="Source"
                     lookup="inventorySource"
                     lookupParams={{ new_used: newUsed || '0' }}
                     optionKeys={{ label: 'inventory_source', value: 'inventory_source_id' }}
                     required={!isView}
                     hidden={isView}
                     useBlank
        />
        <Form.Control name="source_name" label="Source Name" hidden={isView || (newUsed && +inventory_source_id !== 6 && +inventory_source_id !== 8)} />
        <Form.Select name="buyer_user_id"
                     label="Acquired By - Sales Manager"
                     lookup="salesManagers"
                     lookupParams={{ char_key: 'SLSMGR' }}
                     optionKeys={{ label: 'name', value: 'site_user_id' }}
                     required={!isManufacturer && !isView}
                     hidden={isView}
                     useBlank
        />
        <Form.Select name="acquired_salesperson_user_id"
                     label="Acquired By - Salesperson"
                     lookup="salesStaff"
                     lookupParams={{ char_key: 'SLSSTF' }}
                     optionKeys={{ label: 'name', value: 'site_user_id' }}
                     dropdown={{ maxHeight: '30rem' }}
                     hidden={!isPurchaseFromCustomer || isView}
                     useBlank
        />
        <Form.Select name="appraised_by_user_id" label="Appraised By - Sales Manager" lookup="salesManagers"
                     lookupParams={{ char_key: 'SLSMGR' }}
                     optionKeys={{ label: 'name', value: 'site_user_id' }}
                     dropdown={{ maxHeight: '30rem' }}
                     hidden={!isTrade || isView}
                     useBlank
        />
        {isView
          ? <Form.YesNo onChange={handleLocationChange}
                        label='Is the Vehicle Physically At the Dealership?'
                        value={isAtDealership}
                        numberic />
          : <Form.YesNo name='located_at_dealership'
                        label='Is the Vehicle Physically At the Dealership?'
                        numberic
                        required={!isView} />
        }
        {!isLocatedAtDealership && !isView ? (
          <Form.Checklist
            lookup="inventoryLocations"
            type="radio"
            name="location_type_id"
            label="Location"
            optionKeys={{ label: 'inventorylocation_type_name', value: 'inventorylocation_type_id' }}
            lookupParams={{ newUsed, vehicleAtDealership: located_at_dealership }}
            lookupDeps={located_at_dealership}
            useBlank
            required={!isView}
          />
        ) : null}

        {isView ? 
          <Form.Control 
            label="Location"
            value={location_type_id ? `${LOCATION_TYPE[location_type_id - 1].name} (${LOCATION_TYPE[location_type_id - 1].key})` : '-'}
          /> 
        : null}
        {isView ? <Form.Control label='Location Comments' name='location_comments' /> : null}
        {!isLocatedAtDealership ? (
          <Form.Date name="location_arrival_date"
                     label="Estimated Date of Arrival for Physical Check-in"
                     required={!isView}
          />
        ) : null}
        {!isLocatedAtDealership || +location_type_id === 4 ? (
          <Form.Textarea
            name="location_comments"
            label="Location Comments"
            required={!isCAD && !isView}
            hidden={isView}
          />
        ) : null}
        {isAdd && !isLocatedAtDealership ? <Form.YesNo
          name="is_order"
          label="Is This an Order without a VIN?"
          numeric
          required={!isView}
        /> : null}
        <Form.Control
          name="purchase_method_id"
          required={!isView}
          hidden
        />
        {(!isAdd || !isOrder) && !isView ? (
          <>
            <VinNumber required />
            <Form.Control name="stock_num" label="Stock #" value={stockNumParam} required />
          </>
        ) : null}
        <Form.Control type="number" name="vehicle_year" label="Year" required={!isView} />
        {newUsed ? (
        <>
          <Form.Control name="make_id" value={MakeID} hidden />
          <Form.Control className={styles.paragraph} label="Make" value={vehicle_make_name} plaintext />
        </>
        ) : (
          <Form.Select
            className={styles.paragraph}
            name="make_id"
            label="Make"
            lookup="vehicleMakes"
            optionKeys={{
              label: 'vehicle_make_name',
              value: 'vehicle_make_id'
            }}
            useBlank
          />
        )}
        <Form.Control name="model" label="Model" required={!isView} />
        <Form.Control name="model_code" label="Model Code" required={!isView} />
        <Form.Control name="vehicle_trim" label="Trim" required={!isView} />
        <Form.Control name="body_style" label="Body Style" required={!isView} />
        <Form.Control name="ext_color" label="Exterior" required={!isView} />
        <Form.Control name="int_color" label="Interior" required={!isView} />
        <Form.Control name="engine" label="Engine" required={!isView} />
        <Form.Control name="engine_type" label="Engine Type" />
        <Form.Control name="transmission_name" label="Transmission" required={!isView} />
        <Form.Control name="drivetrain_name" label="Drivetrain" required={!isView} />
        <Form.Control name="mileage" label="Mileage" schema="miles" required={!isView} />
        <Form.Select
          name="warranty_type"
          plaintext={0}
          onSelect={isView ? handleSelect : null}
          optionKeys={{ label: 'warranty_type_name', value: 'warranty_type_id' }}
          label="Warranty Type"
          lookup="warrantyTypes"
          useBlank={isAdd}
          required={!newUsed}
        />
      </Form.Body>
    </>
  );
});

// EXPORT
export default function VehicleInfo(props) {
  return <Card title="Vehicle Info" body={<VehicleInfoForm {...props} />} />;
}
