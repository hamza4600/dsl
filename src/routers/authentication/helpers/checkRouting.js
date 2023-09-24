import React from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { AUTHENTICATION } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { loggedIn, makePath } from 'functions.js';

// ROUTER COMPONENTS
import { Redirect } from 'react-router-dom';

// MAIN COMPONENT
export const checkRouting = (Component) => {
  return compose(
    withRouter,
    connect(({ configuration, user, dealership, token, tokenExp }) => ({
      configuration,
      user,
      dealership,
      token,
      tokenExp,
    }))
  )(({ location, configuration, user, dealership, token, tokenExp }) => {
    let redirect;

    if (!configuration || !loggedIn(token, tokenExp))
      redirect = [
        AUTHENTICATION.login,
        AUTHENTICATION.privacy,
        AUTHENTICATION.forgotPassword,
        AUTHENTICATION.forgotPasswordSent,
        AUTHENTICATION.resetPassword,
        AUTHENTICATION.resetPasswordExpired,
        AUTHENTICATION.resetPasswordSuccess,
      ];
    else if (configuration.two_step_verification && !user.verified)
      redirect = [AUTHENTICATION.requestCode, AUTHENTICATION.enterCode];
    else if (!dealership) redirect = [AUTHENTICATION.chooseStore];

    if (
      location.pathname.split('/').filter(e => !!e).length <= 1 &&
      location.pathname !== `/${AUTHENTICATION.loginVerify}` &&
      redirect &&
      redirect.findIndex((el) => location.pathname === makePath(el)) < 0
    )
      return <Redirect to={makePath(redirect[0])} />;

    return <Component />;
  });
};
