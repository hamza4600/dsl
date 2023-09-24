import React from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL FUNCTIONS
import { loggedIn } from 'functions.js';

// GLOBAL HELPERS
import { checkScreenSize } from 'helpers/checkScreenSize';
import { getConfiguration } from 'helpers/getConfiguration';

// GLOBAL COMPONENTS
import Interface from 'routers/interface/Interface';
import Authentication from 'routers/authentication/Authentication';

// MAIN COMPONENT
export default compose(
  checkScreenSize,
  getConfiguration,
  connect(
    ({
      configuration,
      user,
      dealership,
      token,
      tokenExp
    }) => ({
      configuration,
      user,
      dealership,
      token,
      tokenExp
    })
  )
)(({
  // REDUX STATE
  configuration,
  user,
  dealership,
  token,
  tokenExp
}) => (
  configuration &&
  (!configuration.two_step_verification || user.verified) &&
  dealership && loggedIn(token, tokenExp)
) ? <Interface /> : <Authentication />)
