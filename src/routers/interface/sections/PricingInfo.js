import React from 'react';

// DEPENDENCIES
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { useFormikContext } from 'formik';
import moment from 'moment';

// GLOBAL VARIABLES
import { NEW_USED } from 'codes';

// LOCAL VARIABLES
import { FILE_TYPE_IDS } from './variables';

// HELPERS
import useRecordView from 'helpers/getRecordView';
import { FORMAT_PRICE } from 'helpers/format';

// GLOBAL COMPONENTS
import Card from 'parts/card/Card';
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import FileUpload from '../tools/FileUpload';

// MAIN COMPONENT
const PricingInfoForm = compose(withRouter)(({ location: { search } }) => {
  const { isView } = useRecordView();

  const { values } = useFormikContext() || {};
  const { new_used, is_order, dmsinvoice, internet_price, date_internet_price_sync } = values || {};
  const updateOnValue = dmsinvoice ? dmsinvoice.split(' : ')[1] : '';
  const internetPriceDate = date_internet_price_sync ? `as of ${moment(date_internet_price_sync).format('MM/DD/YYYY')} at ${moment(date_internet_price_sync).format('h:mm A')}` : `: ${updateOnValue}`;
  const params = new URLSearchParams(search);
  const newUsed = parseInt(params.get('new_used') || new_used);
  const isNew = newUsed === NEW_USED.new.numeric;
  const isOrder = +is_order === 1;

  return (
    <Form.Body plaintext={isView}>
      <Form.Control name="retail_price" label={isNew ? 'MSRP' : 'Retail Price'} schema="dollars" required={isNew} />
      {isNew ? (
        <FileUpload
          label="MSRP Sticker"
          name="documentAttachment.msrp"
          documentType={FILE_TYPE_IDS.MSRP_STICKER_NEW}
        />
      ) : null}
      {isView
        ? <Form.Control label="Internet Price"
                        value={`${FORMAT_PRICE(internet_price || 0)} ${internetPriceDate}`}
                        text={date_internet_price_sync ? updateOnValue : ''} />
        : <Form.Control name='internet_price'
                        label='Internet Price'
                        schema='dollars' />
      }
      <Form.Control
        name="invoice_cost"
        label={isNew ? 'Factory Invoice Cost' : 'ACV'}
        schema="dollars"
        required
      />
      <FileUpload
        label={isNew ? 'Factory Invoice' : 'Purchase Invoice'}
        name="documentAttachment.invoice"
        documentType={isNew ? FILE_TYPE_IDS.FACTORY_INVOICE_NEW : FILE_TYPE_IDS.PURCHASE_INVOICE_USED}
        required={!isOrder}
      />
      {isView && <hr />}
      {isView && <Form.Control
        label="DMS Cost"
        fullWidth
        value={dmsinvoice}
      /> }
    </Form.Body>
  );
});

// EXPORT
export default function PricingInfo(props) {
  return <Card title="Pricing Info" body={<PricingInfoForm {...props} />} />;
}
