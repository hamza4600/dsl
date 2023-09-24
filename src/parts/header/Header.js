import React, { useState } from 'react';

// DEPENDENCIES
import clsx from 'clsx';
import { compose } from 'redux';
import { connect } from 'react-redux';

// LOCAL COMPONENTS
import Branding from './parts/Branding';
import DealershipSelect from './parts/DealershipSelect';
import MenuToggle from './parts/MenuToggle';
import SearchForm from './parts/SearchForm';
import UserButton from './parts/UserButton';
import UserMenu from './parts/UserMenu';
import HeaderSearchButton from './layout/HeaderSearchButton';
import HeaderMenu from './layout/HeaderMenu';

// STYLES
import styles from './header.module.scss';

// CHILD COMPONENTS
const Divider = () => <div className={clsx(
  'divider',
  styles.divider
)} />;

// MAIN COMPONENT
const Header = compose(
  connect(
    ({ mobile }) => ({ mobile })
  )
)(({
  children,
  className,
  // REDUX STATE
  mobile
}) => {
  const [show, setShow] = useState(false)
  return(
  <header className={clsx(
    (!show || !mobile.mobile) &&styles.searchHeader,
    'header',
    'theme-dark',
    styles.header,
    styles.dark,
    className
  )}>
    {!show && <Branding />}
   
    {!mobile.mobile &&
    <div className={styles.dealerShip}>
      <DealershipSelect />
    </div>
    }
    <div className={styles.tools}>
      {!mobile.mobile ? (<>
      
       <SearchForm /> 
        <Divider />
        {
        !mobile.isTab && <>
        <UserButton />
        <Divider />
        </>
        }
       <div className={styles.menuToogle}><UserMenu /></div>
      </>) : (<>
       {!show? <HeaderMenu
        onShow={(e) => setShow(e)}
    toggle={{
      icon: 'search'
    }}
  />   :<HeaderSearchButton setShow={setShow}  show={show}/> }  
   {!show && <> <Divider />
       <MenuToggle /></>}
      </>)}  
    </div>
  </header>
)})

export default Header
