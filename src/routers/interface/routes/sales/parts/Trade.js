// DEPENDENCIES
import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useFormikContext } from 'formik';

// GLOBAL FUNCTIONS
import { apiFetch } from 'functions';
import { sidebarActions } from 'actions.js';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints';

// GLOBAL COMPONENTS
import Form from 'core/form/Form';
import Card from 'parts/card/Card';
import Sidebar from 'parts/sidebar/Sidebar';
import VinNumber from 'routers/interface/tools/VinNumber';
import SidebarFooter from 'parts/sidebar/parts/SidebarFooter';
import Button from 'core/tools/Button';

// LOCAL COMPONENTS
import SubTrade from '../view/parts/TradeView';

// LOCAL VARIABLES
import { TRUE_FALSE } from '../variables';

//STYLES
import styles from './trade.module.scss';

const TradeSliderForm = compose(
  withRouter,
  connect(null, { ...sidebarActions })
)(
  ({
    // REDUX DISPATCH
    toggle
  }) => {
    const { values , setValues } = useFormikContext() || {};
    const { has_trade, aryTrade, vin_num } = values || {};
    
    const [num , setNum] =useState(0);
    const hasTrade = has_trade === 'true';
    const [isUpdate , setIsUpdate] = useState(false);
    const [newArry , setNewArry] =useState(aryTrade);

    const handleClick = (data=aryTrade , i) => {
      toggle('sidebarName')
      setNum(data.indexOf(i))
    };
    
    let itemx = {
      acv: "",
      bank_to_pay_off: "",
      body_style: "",
      contact: "",
      daily_sales_inventory_id: "",
      date_created: "",
      drivetrain_name: "",
      engine: "",
      engine_type: "",
      ext_color: "",
      good_until: "",
      int_color: "",
      invoice_cost: "",
      loan_account_key: "",
      loan_account_number: "",
      make: "",
      mileage: "",
      model: "",
      need_to_payoff: "",
      pay_off_amount: "",
      per_diem: "",
      phone_number: "",
      stock_num: "",
      title_in_possession: "",
      title_state_code: "",
      trade_available_on: "",
      trade_id: "",
      trade_in_allowance: "",
      transmission_name: "",
      vehicle: "",
      vehicle_registration: "",
      vehicle_trim: "",
      vehicle_year: "",
      vin_num: "",
    }

    const handel =(e, index)=>{

      const { value } = e.target;
      const { name } = e.currentTarget;
        aryTrade[index][name] = value;

        setIsUpdate(!isUpdate);
        console.log("object" , aryTrade.map((v)=>v))
    }
     
    //  Update array
     const handleUpdat = (d) => {
 
      setValues({
        ...aryTrade,
        vehicle_year: d.vehicle_year,
        make_id: d.make_id,
        model: d.model,
        model_code: d.model_code,
        vehicle_trim: d.vehicle_trim,
        body_style: d.body_style,
        engine: d.engine,
        engine_type: d.engine_type,
        drivetrain_name: d.drivetrain,
        transmission_name: d.transmission_name,
        ext_color: d.ext_color,
        int_color: d.int_color,      
      });
      setNewArry(newArry[num]=d)
      // aryTrade[num] = d
      console.log('==After===', newArry)
      console.log(aryTrade[num]);
      // debugger
    }
 
    const handleDecodeVin = () => {
      apiFetch({
        endpoint: ENDPOINTS.inventory.decodeVin,
        params: {
          vin_num
        },
        loadingMessage: 'Decoding VIN',
        errorMessage: 'Unable to decode VIN.',
        onSuccess: d => {
          handleUpdat(d);
        }
      });
    };
   
    // Add Button
    const addTrade = () => {
      aryTrade.push(itemx);   
      const vv = aryTrade.length - 1;
      setNum(vv);
      console.log("Added Array===",aryTrade)
      
      setIsUpdate(!isUpdate);
    };

    const nextClick =()=>{
      addTrade(); 
    }
   
    // SHow in UI
    const showUi =()=> {
      // if completed then show in UI next arryTrade Item
      toggle('sidebarName')
    }
    return (
      <Form>
        <Form.Checklist
          label="Add To Trade"
          name="has_trade"
          options={TRUE_FALSE}
          type="radio"
          onChange={e => console.log(e.target.value)}
        />
        {hasTrade ? (
          <>
            <Sidebar.Button className="m-3" name="sidebarName" icon="add-circle" label="Add Trade" onClick={nextClick} fullWidth={false} />
            {Array.isArray(aryTrade)
              && [aryTrade[num]].map((item , i) => (
                  <>
                    <Sidebar name="sidebarName" title="New Trade" className={styles.sidebar}>
                      <Sidebar.Form showButton={false}>
                        <Form.Body.Vertical id={item.trade_id}>
                          {/* <Form.Control value={item.vin_num} label="vim" /> */}
                          <VinNumber required /> 
                          {/* <Form.Control
                              name="vin_num"
                              label="VIN"
                              schema="vin"
                              inputGroup={{
                                className: 'mr-2'
                              }}
                              input={{
                                maxLength: 17,
                                append: (
                                  <Button
                                    label="Decode VIN"
                                    icon="refresh"
                                    size="sm"
                                    className="w-auto"
                                    onClick={handleDecodeVin}
                                  />
                                )
                              }}
                            /> */}
                          <Form.Control 
                              id="stock_num"
                              name={`stock_num`}
                              value={item.stock_num} 
                              label="stock" 
                              required
                              onChange={e => {
                                handel(e, num);
                              }}
                          />
                          <Form.Control
                              label="vehicle year"
                              name="vehicle_year"
                              id="vehicle_year"
                              value={item.vehicle_year}
                              onChange={e => {
                                handel(e, num);
                              }}
                            />
                          <Form.Select
                            name="vehicle_make_id"
                            label="make"
                            lookup="vehicleMakes"
                            optionKeys={{
                              label: 'vehicle_make_name',
                              value: 'vehicle_make_id'
                            }}
                            useBlank
                            dropdown={{
                              maxHeight: '30rem'
                            }}
                            id="vehicle_make_id"
                            onChange={e => {
                              handel(e, num);
                            }}

                          />
                          <Form.Control 
                              id="model" 
                              name={`model`}
                              value={item.model} 
                              label="model"  
                              onChange={e => {
                                handel(e, num);
                              }}
                            />
                          <Form.Control 
                              id="vehicle_trim:" 
                              name={`vehicle_trim`}
                              value={item.vehicle_trim} 
                              label="trim"  
                              onChange={e => {
                                handel(e, num);
                              }}
                          />
                          <Form.Control 
                              id="body_style" 
                              name={`body_style`}
                              value={item.body_style}
                              label="* body style"
                              onChange={e => {
                                handel(e, num);
                              }}
                          />
                          <Form.Control 
                              id="mileage" 
                              name={`mileage`}
                              value={item.mileage}
                              label="* mileage"  
                              onChange={e => {
                                handel(e, num);
                              }}
                          />
                          <Form.Control 
                              id="ext_color" 
                              name={`ext_color`}
                              value={item.ext_color} 
                              label=" exterior"  
                              onChange={e => {
                                handel(e, num);
                              }}
                          />
                          <Form.Control 
                              id="int_color" 
                              name={`int_color`}
                              value={item.int_color}
                              label="interior"
                              onChange={e => {
                                handel(e, num);
                              }}
                          />
                          <Form.Control 
                              id="engine" 
                              name={`engine`}
                              value={item.engine}
                              label="engine"
                              onChange={e => {
                                handel(e, num);
                              }} 
                          />
                          <Form.Control 
                              id="transmission_name" 
                              name={`transmission_name`}
                              value={item.transmission_name} 
                              label="* transmission"
                              onChange={e => {
                                handel(e, num);
                              }}
                          />
                          <Form.Control 
                              id="drivetrain_name" 
                              name={`drivetrain_name`}
                              value={item.drivetrain_name} 
                              label="* drivetrain"
                              onChange={e => {
                                handel(e, num);
                              }}
                          />
                          <Form.Select
                            name="warranty_type_id"
                            label="warrnty type"
                            lookup="warrantyTypes"
                            optionKeys={{
                              label: 'warranty_type_name',
                              value: 'warranty_type_id'
                            }}
                            useBlank
                            dropdown={{
                              maxHeight: '30rem'
                            }}
                            id="warranty_type_id"
                            onSelect={e => {
                              handel(e, num);
                            }}
                            plaintext={0}
                          />
                          <Form.Control 
                            value={item.acv}
                            label="* acv" 
                            id="acv"
                            name={`acv`}
                            onChange={e => {
                              handel(e, num);
                            }}
                          />
                          {/*  drop down */}
                          <Form.Select
                            name="appraised_by_user_id"
                            label="appraised by"
                            lookup="salesManagers"
                            optionKeys={{
                              label: 'name',
                              value: 'site_user_id'
                            }}
                            useBlank
                            dropdown={{
                              maxHeight: '30rem'
                            }}
                            id="appraised_by_user_id"
                            onChange={e => {
                              handel(e, num);
                          }}
                          />
                          <Form.YesNo 
                            value={item.pay_off_amount}
                            label="need to payoff?"
                            name={`pay_off_amount`}
                            id="pay_off_amount"
                            onChange={e => {
                                handel(e, i);
                            }}
                            
                          />
                          <Form.Select
                            name="site_user_id"
                            label="trade title state"
                            lookup="states"
                            optionKeys={{
                              label: 'state_name',
                              value: 'state_code'
                            }}
                            useBlank
                            dropdown={{
                              maxHeight: '30rem'
                            }}
                            id="site_user_id"
                            onChange={e => {
                              handel(e, num);
                          }}
                          />

                          <Form.YesNo  
                            id="possession"
                            name={`possession`}
                            value={item.possession} 
                            label="TITLE IN POSSESSION ?"
                            onChange={e => {
                              handel(e, i);
                            }} 
                          />
                          <Form.YesNo  
                            id="sif"
                            name={`sif`}
                            value={item.sif} 
                            label="do you have sif ?" 
                            onChange={e => {
                              handel(e, i);
                            }}
                          />
                          <Form.YesNo  
                            id="vehicle_registration"
                            name={`vehicle_registration`}
                            value={item.vehicle_registration} 
                            label="vehicle regstration ?"
                            onChange={e => {
                              handel(e, num);
                            }}
                          />
                        </Form.Body.Vertical>
                        <SidebarFooter>
                          <Form.Row>
                            <Form.Col>
                              <Button.Add variant="success"  label="Review In Deal"  onClick={ showUi }/>
                            </Form.Col>
                            <Form.Col>
                              <Button.Cancel variant="primary" label="Cancel"  onClick={()=>toggle("sidebarName")}/>
                            </Form.Col>
                          </Form.Row>
                        </SidebarFooter>
                      </Sidebar.Form>
                    </Sidebar>
                    <br />
                  </>
                ))
              }

            <SubTrade data={aryTrade} Open={handleClick} isEdit={true} />
          </>
        ) : null}
      </Form>
    );
  }
);

export default function TradeSliderInfo(props) {
  return <Card title="Trade Info" body={<TradeSliderForm {...props} />} />;
}
