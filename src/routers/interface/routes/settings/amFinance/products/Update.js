import React, { useContext } from 'react';

// DEPENDENCIES
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { useFormikContext } from 'formik';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints';
import { INTERFACE, SETTINGS, AM_FINANCE } from 'pathnames';
import { PRODUCT_TYPES, NEW_USED_TYPES } from 'globals.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions';

// GLOBAL HELPERS
import { RecordContext } from 'helpers/getRecordData';

// GLOBAL COMPONENTS
import Card from 'parts/card/Card';
import Form from 'core/form/Form';
import Record from 'parts/record/Record';

// STYLES
import styles from './update.module.scss';

// MAIN COMPONENT
const ProductUpdate = () => (
  <Record.Update
    title="AM/Finance Product"
    label="AM/Finance Product"
    endpoints={{
      single: ENDPOINTS.admin.amFinance.products
    }}
    backPathname={makePath(INTERFACE.settings, SETTINGS.amFinance, AM_FINANCE.products)}
    enableDelete
    initialValues={{
      is_active: 1,
      add_product_cost: 0,
      lock_cost: 0,
      sale_type_category_id: ''
    }}
  >
    <Card
      body={<FormBody/>}
    />
  </Record.Update>
)

const FormBody = compose(
  withRouter
)(({
  location: {
    search
  }
}) => {

  // CONTEXT
  const { values } = useFormikContext();
  const { record } = useContext(RecordContext) || {};

  const params = new URLSearchParams(search);
  const newUsed = params.get('new_used');
  const productType = params.get('product_type');

  const newUsedLabel = record
    ? NEW_USED_TYPES[record.new_used]
    : NEW_USED_TYPES[newUsed];

  const productTypeLabel = record
    ? PRODUCT_TYPES[record.productType]
    : PRODUCT_TYPES[productType];

  const addProductCost = Number(values.add_product_cost);

  return (
    <Form.Body>
      <Form.Control
        name='dealer_amfinance_id'
        required
        hidden
      />
      <Form.Control
        className={styles.paragraph}
        label='Type'
        value={newUsedLabel}
        plaintext
      />
      <Form.Control
        name='new_used'
        required
        hidden
      />
      <Form.YesNo
        name='is_active'
        label='Active'
        required
      />
      <Form.Control
        name='product_code'
        label='Product Code'
        required
      />
      <Form.Control
        name='product_title'
        label='Product Title'
        required
      />
      <Form.Checklist
        className={styles.checklist}
        label='Sale Type'
        name='sale_type_category_id'
        lookup="salesTypeCategory"
        optionKeys={{
          label: 'sale_type_category_name',
          value: 'sale_type_category_id'
        }}
        useBlank
      />
      <Form.Control
        className={styles.paragraph}
        label='Product Type'
        value={productTypeLabel}
        plaintext
      />
      <Form.Control
        name='product_type'
        required
        hidden
      />
      <Form.YesNo
        name='add_product_cost'
        label='Add Product Cost?'
        required
      />
      {!!addProductCost ? (
        <Form.Control
          name='product_cost'
          label='Product Cost?'
        />
      ) : null}
      {!!addProductCost ? (
        <Form.Checklist
          name='lock_cost'
          label=' '
          options={[
            { label: 'Lock Cost', value: 1 }
          ]}
        />
      ) : null}
      <Form.Control
        name='product_min_gross'
        label='Minimum Gross'
      />
      <Form.Control
        name='product_max_gross'
        label='Maximum Gross'
      />
      <Form.Textarea
        name='product_description'
        label='Description'
      />
      {record && ([
        <Form.Control
          label='Created On'
          value={`${record.date_created} by ${record.updated_by}`}
        />,
        <Form.Control
          label='Updated On'
          value={`${record.date_updated} by ${record.updated_by}`}
        />
      ])}
    </Form.Body>
  )
});

// EXPORT
export default ProductUpdate;
