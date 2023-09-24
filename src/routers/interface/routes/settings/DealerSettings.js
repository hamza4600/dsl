import React, { useCallback, useMemo, useEffect, useState } from 'react';

// DEPENDENCIES
import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useFormikContext } from 'formik';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints';

// GLOBAL FUNCTIONS
import { apiFetch, makePath, doCallback } from 'functions';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Page from 'parts/page/Page';
import Card from 'parts/card/Card';

// STYLES
import styles from './dealerSettings/dealerSetting.module.scss';

// MAIN COMPONENT
const DealerSettings = () => {
  const [settings, setSettings] = useState({});

  const fetchSettings = useCallback(
    () => {
      apiFetch({
        endpoint: makePath(ENDPOINTS.admin.dealerSettings),
        loadingMessage: 'Loading Dealer Settings',
        errorMessage: 'Unable to load Dealer Settings.',
        onSuccess: data => setSettings(data.results)
      })
    },
    []
  )

  useEffect(
    () => {
      fetchSettings()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  if (_.isEmpty(settings)) return null;

  return (
    <Page.Update
      title='Dealer Settings'
      label='Dealer Settings'
      method='POST'
      endpoint={makePath(ENDPOINTS.admin.dealerSettings, `?dealer_setting_id=${settings.dealer_setting_id}`)}
      initialValues={settings}
    >
      <Card
        body={<FormBody/>}
      />
    </Page.Update>
  )
}

const FormBody = compose(
  connect(
    ({ lookups }) => ({ lookups })
  )
)(({
  // REDUX STATE
  lookups,
}) => {

  // FORMIK CONTEXT
  const { values, setFieldValue } = useFormikContext() || {};
  const { makes, make_dealer_id, make_ids } = values || {};

  const selectedMakeIds = useMemo(
    () => !!make_ids ? make_ids.split(',')  :[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [(make_ids || []).length]
  );

  const homenetRooftopUsed = useMemo(
    () => !!values ? values['homenet_setting_used']: '',
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [!!values]
  )

  const homenetRooftopNew = useMemo(
    () => !!values ? values['homenet_setting_new'] : '',
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [!!values]
  )

  // REDUX
  const totalMakes = useMemo(
    () => lookups['vehicleMakes'] || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lookups.length]
  );

  // CALLBACKS
  const onMakeChange = useCallback(
    (e) => {
      const { value, checked } = e.target;
      const _make = totalMakes.find(m => String(m.vehicle_make_id) === String(value))
      if (!_make) return;
      
      if (checked) {
       selectedMakeIds[selectedMakeIds.length-1]!==value && selectedMakeIds.push(value);
       
      } else {

        const index = selectedMakeIds.findIndex(m => String(m) === String(value));
        
        if (index === -1) return;
        selectedMakeIds.splice(index, 1);
      }

      doCallback(setFieldValue, 'make_ids', String(selectedMakeIds.toString()));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setFieldValue, (make_ids || []).length],
  );

  const onNameChange = useCallback(
    (e, makeId) => {
      const _makes = [...(makes || [])];
      const index = _makes.findIndex(m => String(m.make_id) === String(makeId));
      if (index === -1) return;

      _makes[index].rooftop_name = e.target.value

      doCallback(setFieldValue, 'makes', _makes);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setFieldValue, (makes || []).length]
  );

  return (
    <Form.Body className={styles.dealerSetting}>
      <Form.Control
        name='dealer_setting_id'
        hidden
      />
      <Form.Control
        name='make_dealer_id'
        hidden
      />    
      <Form.Control
        name='created_by_user_id'
        hidden
      />
      <Form.Control
        name='updated_by_user_id'
        hidden
      />
      <Form.YesNo
        name='seperate_after_market_dept'
        label='Seperate AM Dept'
        required
      />
      <Form.YesNo
        name='push_inventory_to_ttms'
        label='Push Inventory to TTMS'
        required
      />
      <Form.Control
        name='makes'
        hidden
      />
      <Form.Checklist
        className={styles.makes}
        name='vehicleMakes'
        label='Makes'
        labelProps={{
          className: styles.checklistLabel
        }}
        lookup='vehicleMakes'
        optionKeys={{
          label: 'vehicle_make_name',
          value: 'vehicle_make_id'
        }}
        value={selectedMakeIds}
        onChange={onMakeChange}
        useFormik={false}
        useBlank
      />
      <Form.Control
        name='certificate_number'
        label='Dealer DMV Certificate'
      />
      <Form.Control
        name='dealer_number'
        label='Dealer'
      />
      <Form.YesNo
        name='kissflow_integration'
        label='Kissflow Integration'
        required
      />
      <Form.Control
        name='kissflow_config_api_key'
        label='Kissflow configuration API Key'
      />
      <Form.Control
        name='kissflow_account_id'
        label='Kissflow Account ID'
      />
      <Form.Control
        name='kissflow_process_id'
        label='Kissflow Process ID'
      />
      <Form.YesNo
        name='homenet_ntn_integration'
        label='Homenet NTN Integration'
        required
      />
      <Form.Control
        name='homenet_ntn_integration_token'
        label='Homenet NTN Integration Token'
      />
      {/* <Form.Control
        name='homenet-setting-used[rooftop_name]'
        label='Homenet IMV Dealer Name for Used'
      /> */}
      <Form.Control
        name='homenet_rooftop_used'
        label={`Homenet IMV Dealer Name for Used ${homenetRooftopUsed?.makename||''}`}
        value={homenetRooftopUsed?.rooftop_name}
        // hidden
      />
      <Form.Control
        name='homenet_rooftop_new'
        label={`Homenet IMV Dealer Name for New ${homenetRooftopNew?.makename||''}`}
        value={homenetRooftopNew?.rooftop_name}
        // hidden
      />

      {(makes || []).map(m => (
        <Form.Control
          key={m.make_id}
          label={`Homenet IMV Dealer Name for New ${m.makename}`}
          value={m.rooftop_name}
          onChange={(e) => onNameChange(e, m.make_id)}
          useFormik={false}
        />
      ))}
    </Form.Body>
  )
});

// EXPORT
export default DealerSettings;
