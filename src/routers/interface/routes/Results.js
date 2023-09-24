import React from 'react';

// GLOBAL COMPONENTS
import Main from 'parts/main/Main';
import { compose } from 'redux';
import { connect } from 'react-redux';

import InventorySearch from './globalSearch/InventorySearch';
import DealSearch from './globalSearch/DealSearch';


// MAIN COMPONENT
const Results = compose(connect(({ mobile }) => ({ mobile })))(
  ({
    // REDUX STATE
    mobile
  }) =>(
      <Main>
        <InventorySearch/>
        <DealSearch/>
      </Main>
  )
);

// EXPORT
export default Results