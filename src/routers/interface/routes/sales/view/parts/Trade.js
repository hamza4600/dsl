// DEPENDENCIES
import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { useFormikContext } from 'formik';

// GLOBAL COMPONENTS
import Card from 'parts/card/Card';
import Form from 'core/form/Form';

// LOCAL COMPONENTS
import SubTrade from './TradeView';

export const ViewTrade = compose(withRouter)(() => {
  const { values } = useFormikContext() || {};
  const { aryTrade } = values || {};
  
  return (
    <Form>
      <SubTrade data={aryTrade} isEdit={false} />
    </Form>
  );
});

export default function TradeViewTable(props) {
  return <Card title={'Trade Info'} body={<ViewTrade {...props} />} />;
}
