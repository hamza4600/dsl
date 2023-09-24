import React, { useEffect, useState } from 'react';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Card from 'parts/card/Card';
import Button from 'core/tools/Button';

// MAIN COMPONENT
const IMVInfoBody = props => {
  const { data } = props;

  const [trimValue, setTrimValue] = useState('');
  const [engineValue, setEngineValue] = useState('');
  const [transmissionValue, setTransmissionValue] = useState('');
  const [options, setOptions] = useState([]);
  const [trimOptions, setTrimOptions] = useState([]);
  const [engineOptions, setEngineOptions] = useState([]);
  const [transmissionOptions, setTransmissionOptions] = useState([]);
  const [optionsList, setOptionsList] = useState([]);

  useEffect(()=>{
    const {trimId = '', engineId = '', transmissionId = '', options_id_list = '', trims = [], engines = [], transmissions = [], options = []} = data;

    setTrimValue(trimId)
    setEngineValue(engineId);
    setTransmissionValue(transmissionId)
    setOptions(options_id_list ? options_id_list.split(',') : [])

    setTrimOptions(trims
      ? trims.map(({ id: value, name: label }) => ({ value, label }))
      : []
    );
    setEngineOptions(engines
      ? engines.map(({ id: value, name: label }) => ({ value, label }))
      : []
    );
    setTransmissionOptions(transmissions
      ? transmissions.map(({ id: value, name: label }) => ({ value, label }))
      : [])
    setOptionsList(options
      ? options.map(({ id: value, name: label }) => ({ value, label }))
      : []
    );

    return cleanup;
  },[data]);

  const cleanup = () => {
    setTrimValue('0')
    setEngineValue('0');
    setTransmissionValue('0');
    setOptions([]);
    setTrimOptions([]);
    setEngineOptions([]);
    setTransmissionOptions([]);
    setOptionsList([]);
  }

  const handleTrimSelect = value => setTrimValue(value);
  const handleEngineSelect = value => setEngineValue(value);
  const handleTransmissionSelect = value => setTransmissionValue(value);
  const handleOptionsSelect = event => setOptions(prevState=>[...prevState, event.target.value]);

  // RENDER
  return <Form.Body>
      <Form.Select
        label="Trim Result Selected"
        placeholder="Select Trim"
        value={trimValue}
        options={trimOptions}
        onSelect={handleTrimSelect}
      />
      <Form.Select
        label="IMV Engine Result"
        placeholder="Select Engine"
        value={engineValue}
        options={engineOptions}
        onSelect={handleEngineSelect}
      />
      <Form.Select
        label="IMV Transmission Result"
        placeholder="Select Transmission"
        value={transmissionValue}
        options={transmissionOptions}
        onSelect={handleTransmissionSelect}
        />
      <Form.Checklist
        label="Options Selection Completed"
        name='vehicleMakes'
        value={options}
        options={optionsList}
        onChange={handleOptionsSelect}
        useFormik={false}
      />

    <Button.Submit fullWidth={false} />
  </Form.Body>
};

// EXPORT
export default function IMVInfo(props) {
  return <Card title="IMV Info" body={<IMVInfoBody {...props} />}/>;
}
