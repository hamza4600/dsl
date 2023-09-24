import React, { useContext, useEffect, useMemo } from 'react';

// DEPENDENCIES
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// GLOBAL FUNCTIONS
import { doCallback } from 'functions.js';

// GLOBAL HELPERS
import { getRecordData, RecordContext } from 'helpers/getRecordData';
import usePrevious from 'helpers/usePrevious';

// GLOBAL COMPONENTS
import Page from 'parts/page/Page';
import Preloader from 'parts/preloader/Preloader';

// STYLES
import styles from './view.module.scss';

// MAIN COMPONENT
const RecordView = compose(withRouter)(
  ({
    children,
    title,
    buttons,
    buttonsBefore,
    buttonsAfter = true,
    backButton,
    backPathname,
    headerTools,
    headerRight,
    formatRecord,
    onLoadRecord,
    usePreloader = false,
    // REACT ROUTER
    history,
    location: { pathname },
    // REST
    ...props
  }) => {
    // CONTEXT
    const { record: data, loading } = useContext(RecordContext) || {};

    const prevData = usePrevious(data);

    useEffect(() => {
      if (!prevData && data) doCallback(onLoadRecord, data);
    }, [prevData, data, onLoadRecord]);

    // MEMOS
    backPathname = useMemo(() => {
      let path = backPathname;
      ['add', 'edit'].forEach(el => {
        if (pathname.includes(el)) {
          path = pathname.split(el)[0];
        }
      });
      return path;
    }, [backPathname, pathname]);

    const toolbar = useMemo(
      () => <div className={styles.buttons}>{buttons}</div>,
      [buttons]
    );

    // RENDER
    return (
      <Preloader loading={usePreloader && loading} useIcon>
        <Page.View
          title={title}
          backButton={backButton}
          backPathname={backPathname}
          headerTools={headerTools}
          headerRight={headerRight}
          buttons={toolbar}
          buttonsBefore={buttonsBefore}
          buttonsAfter={buttonsAfter}
          {...props}
        >
          {children}
        </Page.View>
      </Preloader>
    );
  }
);

// EXPORT
export default getRecordData(RecordView);
