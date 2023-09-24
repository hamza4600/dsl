import React, { useCallback, useContext, useEffect, useMemo } from 'react';

// DEPENDENCIES
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// GLOBAL FUNCTIONS
import { doCallback, makePath, modalFunctions } from 'functions.js';

// GLOBAL HELPERS
import { getRecordData, RecordContext } from 'helpers/getRecordData';
import usePrevious from 'helpers/usePrevious';
import useRecordView from 'helpers/getRecordView';

// GLOBAL COMPONENTS
import Page from 'parts/page/Page';
import Preloader from 'parts/preloader/Preloader';

// LOCAL COMPONENTS
import FormButtons from './FormButtons';

// MAIN COMPONENT
const RecordUpdateForm = compose(
  withRouter
)(({
  children,
  title,
  label = 'Record',
  endpoints = {},
  post = endpoints.post || endpoints.update || endpoints.single,
  put = endpoints.put || endpoints.update || endpoints.single,
  remove = endpoints.delete || endpoints.update || endpoints.single,
  enableDelete,
  buttons,
  buttonsBefore,
  buttonsAfter = true,
  backButton,
  backPathname,
  headerTools,
  headerRight,
  successPathname,
  initialValues = {},
  formatRecord,
  onLoadRecord,
  usePreloader = false,
  // REACT ROUTER
  history,
  location: {
    pathname,
    state,
    search
  },
  match: {
    params: {
      recordID
    }
  },
  // REST
  ...props
}) => {

  // CONTEXT
  const { record: data, loading } = useContext(RecordContext) || {};
  const { isAdd, isView, isEdit } = useRecordView();
  const prevData = usePrevious(data);
  const params = new URLSearchParams(search);
  const newUsedParam = params.get('new_used');

  useEffect(() => {
    if (!prevData && data) doCallback(onLoadRecord, data);
  }, [prevData, data, onLoadRecord]);

  // MEMOS
  backPathname = useMemo(
    () => {
      let path = backPathname;
      ['add', 'edit', 'view'].forEach(el => {
        if (pathname.includes(el)) {
          path = pathname.split(el)[0]
          if(state?.prevPath){
            el === 'view' ?
            path = state.prevPath
            :
            path = null
          }
        }
      });
      return path;
    },
    [backPathname, pathname]
  );

  successPathname = useMemo(
    () => successPathname || backPathname,
    [successPathname, backPathname]
  );

  // CALLBACKS
  const handleSuccess = useCallback(
    (results) => {
      isAdd && modalFunctions.success(`Stock# ${results.stock_num} has been added to your ${newUsedParam ? 'new':'pre owned'} inventory.`);
      successPathname ? history.push(successPathname) : history.goBack();
    },
    [successPathname, history]
  );

  const toolbar = useMemo(
    () => buttons || (
      <FormButtons
        label={label}
        recordID={recordID}
        enableDelete={enableDelete}
        backPathname={backPathname}
        remove={remove}
      />
    ),
    [backPathname, enableDelete, label, recordID, remove, buttons]
  );

  const record = useMemo(
    () => doCallback(formatRecord, data) || data,
    [formatRecord, data]
  );

  // RENDER
  return (
    <Preloader loading={usePreloader && loading} useIcon>
      <Page.Update
        title={title}
        label={label}
        backButton={backButton}
        backPathname={backPathname}
        headerTools={headerTools}
        headerRight={headerRight}
        method={recordID ? 'PUT' : 'POST'}
        endpoint={recordID ? makePath(put, recordID) : post}
        buttons={toolbar}
        buttonsBefore={buttonsBefore}
        buttonsAfter={buttonsAfter}
        initialValues={{
          ...Object.assign({}, initialValues, record)
        }}
        {...Object.assign({
          onSuccess: handleSuccess
        }, props)}
      >
        {children}
      </Page.Update>
    </Preloader>
  );
})

// EXPORT
export default getRecordData(RecordUpdateForm)
