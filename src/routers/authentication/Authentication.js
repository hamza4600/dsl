import React from 'react';

// DEPENDENCIES
import { connect } from 'react-redux';
import { compose } from 'redux';

// GLOBAL VARIABLES
import { AUTHENTICATION } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// LOCAL HELPERS
import { checkRouting } from './helpers/checkRouting';

// ROUTER COMPONENTS
import { Redirect, Route, Switch } from 'react-router-dom';

// GLOBAL COMPONENTS
import Modal from 'core/tools/modal/Modal';

// SCREENS
import ChooseStore from './routes/ChooseStore';
import EnterCode from './routes/EnterCode';
import ForgotPassword from './routes/ForgotPassword';
import ForgotPasswordSent from './routes/ForgotPasswordSent';
import ResetPassword from './routes/ResetPassword';
import ResetPasswordExpired from './routes/ResetPasswordExpired';
import ResetPasswordSuccess from './routes/ResetPasswordSuccess';
import Login from './routes/Login';
import LoginVerify from './routes/LoginVerify';
import RequestCode from './routes/RequestCode';
import PrivacyPolicy from './routes/PrivacyPolicy';

// MAIN COMPONENT
const Authentication = compose(
  checkRouting,
  connect(({ alerts }) => ({ alerts }))
)(
  ({
    // REDUX STATE
    alerts,
  }) => (
    <>
      <Switch>
        <Route path={makePath(AUTHENTICATION.login)} component={Login} />
        <Route
          path={makePath(AUTHENTICATION.loginVerify)}
          component={LoginVerify}
        />
        <Route
          path={makePath(AUTHENTICATION.privacy)}
          component={PrivacyPolicy}
        />
        <Route
          path={makePath(AUTHENTICATION.forgotPassword)}
          component={ForgotPassword}
        />
        <Route
          path={makePath(AUTHENTICATION.forgotPasswordSent)}
          component={ForgotPasswordSent}
        />
        <Route
          path={makePath(AUTHENTICATION.resetPassword)}
          component={ResetPassword}
        />
        <Route
          path={makePath(AUTHENTICATION.resetPasswordExpired)}
          component={ResetPasswordExpired}
        />
        <Route
          path={makePath(AUTHENTICATION.resetPasswordSuccess)}
          component={ResetPasswordSuccess}
        />
        <Route
          path={makePath(AUTHENTICATION.requestCode)}
          component={RequestCode}
        />
        <Route
          path={makePath(AUTHENTICATION.enterCode)}
          component={EnterCode}
        />
        <Route
          path={makePath(AUTHENTICATION.chooseStore)}
          component={ChooseStore}
        />
        <Redirect to={{
          pathname: makePath(makePath(AUTHENTICATION.login)),
        }} />
      </Switch>
      <Modal.Router />
    </>
  )
);

// EXPORT
export default Authentication;
