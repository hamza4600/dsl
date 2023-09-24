import React from 'react';

// DEPENDENCIES
import { compose } from 'redux';
import { connect } from 'react-redux';

// GLOBAL VARIABLES
import { USER } from 'pathnames.js';

// GLOBAL FUNCTIONS
import { makePath } from 'functions.js';

// LOCAL COMPONENTS
import HeaderButton from '../layout/HeaderButton';

// MAIN COMPONENT
const UserButton = compose(
  connect(
    ({ user }) => ({ user })
  )
)(({
  // REDUX STATE
  user
}) => (
  <HeaderButton
    label={`${user.first_name} ${user.last_name}`}
    icon="user"
    to={makePath(USER.profile)}
  />
))

// EXPORT
export default UserButton
