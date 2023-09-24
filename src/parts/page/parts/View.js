import React from 'react';

// GLOBAL COMPONENTS
import Main from 'parts/main/Main';

// LOCAL COMPONENTS
import Header from './Header';

// MAIN COMPONENT
const View = ({
  children,
  title,
  backButton,
  backPathname,
  buttons,
  buttonsBefore = false,
  buttonsAfter = true,
  headerTools,
  headerRight
}) => {
  return (
    <Main>
      <Header
        title={title}
        backButton={backButton}
        backPathname={backPathname}
        headerTools={headerTools}
        rightItems={headerRight}
      />
      <div>
        {buttonsBefore ? buttons : null}
        {children}
        {buttonsAfter ? buttons : null}
      </div>
    </Main>
  );
};

// EXPORT
export default View;
